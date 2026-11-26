#!/usr/bin/env node
// Probes every station URL in index.html and reports the ones that no longer
// play in a browser: dead hosts, HTTP-only streams (mixed content on Pages),
// or streams without CORS headers (the app uses <audio crossorigin="anonymous">).
//
// Usage: node scripts/check-streams.js [--json]
// Exit code 1 when at least one station fails, so CI can open an issue.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://domrique.github.io";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const TIMEOUT_MS = 25000;
const SAMPLE_BYTES = 32768;
const ATTEMPTS = 3;
const RETRY_DELAY_MS = 2500;

function readStations() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const stations = [];
  const somaRe = /\{\s*id:"([^"]+)",\s*name:"([^"]+)",\s*streamUrl:"([^"]+)"\s*\}/g;
  const extRe = /ext\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)",\s*"([^"]+)"(?:,\s*\[([^\]]*)\])?\)/g;

  let match;
  while ((match = somaRe.exec(html))) {
    stations.push({ id: match[1], name: match[2], source: "somafm", urls: [match[3]] });
  }
  while ((match = extRe.exec(html))) {
    const fallbacks = (match[6] || "").match(/"([^"]+)"/g)?.map((u) => u.slice(1, -1)) || [];
    stations.push({ id: match[1], name: match[2], source: "external", urls: [match[5], ...fallbacks] });
  }
  return stations;
}

function corsAllows(header) {
  return header === "*" || /domrique\.github\.io/.test(header || "");
}

async function fetchWithDeadline(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "follow",
      ...init,
      headers: {
        "User-Agent": USER_AGENT,
        Origin: ORIGIN,
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "audio",
        Accept: "*/*",
        "Icy-MetaData": "1",
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function readSample(body, maxBytes) {
  const reader = body.getReader();
  let total = 0;
  let head = Buffer.alloc(0);
  try {
    while (total < maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!head.length) head = Buffer.from(value).subarray(0, 64);
      total += value.length;
    }
  } finally {
    try {
      await reader.cancel();
    } catch {}
  }
  return { total, head };
}

function looksLikeAudio(contentType, head) {
  if (/audio\/|ogg|mpeg|aac|mp3|flac|octet-stream/i.test(contentType)) return true;
  if (head.includes("ftyp") || head.includes("OggS")) return true;
  if (head[0] === 0xff) return true;
  return head.toString("latin1").startsWith("ID3");
}

function absolute(base, value) {
  try {
    return new URL(value, base).href;
  } catch {
    return value;
  }
}

async function probeHls(res) {
  const playlist = await res.text();
  if (!/^\s*#EXTM3U/i.test(playlist)) return { ok: false, reason: "not an m3u8 playlist", cors: corsAllows(res.headers.get("access-control-allow-origin")) };

  const lines = playlist.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  if (!lines.length) return { ok: false, reason: "empty playlist", cors: corsAllows(res.headers.get("access-control-allow-origin")) };

  let mediaUrl = absolute(res.url, lines[0]);
  if (/#EXT-X-STREAM-INF/i.test(playlist)) {
    const variant = await fetchWithDeadline(mediaUrl);
    if (!variant.ok) return { ok: false, reason: `variant HTTP ${variant.status}`, cors: corsAllows(res.headers.get("access-control-allow-origin")) };
    const variantText = await variant.text();
    const variantLines = variantText.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
    if (!variantLines.length) return { ok: false, reason: "empty variant playlist", cors: corsAllows(res.headers.get("access-control-allow-origin")) };
    mediaUrl = absolute(variant.url, variantLines[0]);
  }

  const segment = await fetchWithDeadline(mediaUrl, { headers: { Range: "bytes=0-4095" } });
  const segmentCors = corsAllows(segment.headers.get("access-control-allow-origin"));
  if (!(segment.ok || segment.status === 206)) return { ok: false, reason: `segment HTTP ${segment.status}`, cors: segmentCors };
  const sample = await readSample(segment.body, 4096);
  if (!sample.total) return { ok: false, reason: "empty segment", cors: segmentCors };
  return { ok: true, bytes: sample.total, cors: corsAllows(res.headers.get("access-control-allow-origin")) && segmentCors };
}

async function probeOnce(url) {
  let res;
  try {
    res = await fetchWithDeadline(url);
  } catch (error) {
    return { ok: false, reason: error.name === "AbortError" ? "timeout" : (error.cause?.code || error.message), https: url.startsWith("https://") };
  }

  const contentType = res.headers.get("content-type") || "";
  const cors = corsAllows(res.headers.get("access-control-allow-origin"));
  const https = url.startsWith("https://") && res.url.startsWith("https://");

  if (!res.ok) return { ok: false, reason: `HTTP ${res.status}`, status: res.status, cors, https };

  if (/mpegurl/i.test(contentType) || /\.m3u8(\?|$)/i.test(res.url)) {
    try {
      const hlsResult = await probeHls(res);
      return { ...hlsResult, status: res.status, https };
    } catch (error) {
      return { ok: false, reason: `playlist error: ${error.message}`, status: res.status, cors, https };
    }
  }

  if (/text\/html/i.test(contentType)) return { ok: false, reason: "HTML instead of audio", status: res.status, cors, https };

  let sample;
  try {
    sample = await readSample(res.body, SAMPLE_BYTES);
  } catch (error) {
    return { ok: false, reason: `read error: ${error.message}`, status: res.status, cors, https };
  }
  if (!sample.total) return { ok: false, reason: "no audio bytes", status: res.status, cors, https };
  if (!looksLikeAudio(contentType, sample.head)) return { ok: false, reason: `not audio (${contentType || "no content-type"})`, status: res.status, cors, https };

  return { ok: true, status: res.status, cors, https, bytes: sample.total };
}

function verdict(result) {
  if (!result.ok) return "fail";
  if (!result.https) return "warn";
  if (!result.cors) return "fail";
  return "ok";
}

async function probeStation(station) {
  let last = null;
  for (const url of station.urls) {
    for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
      last = { ...(await probeOnce(url)), url };
      if (last.ok) return { station, ...last };
      if (attempt < ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
  return { station, ...last, ok: false };
}

async function main() {
  const stations = readStations();
  const results = [];
  const queue = [...stations];
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      results.push(await probeStation(queue.shift()));
    }
  });
  await Promise.all(workers);

  const summary = { ok: 0, warn: 0, fail: 0 };
  const lines = [];
  for (const result of results) {
    const state = verdict(result);
    summary[state] += 1;
    if (state !== "ok") {
      const reason = !result.https && result.ok ? "HTTP only (mixed content on Pages)" : result.cors === false && result.ok ? "no CORS header" : result.reason;
      lines.push(`${state.toUpperCase().padEnd(5)} ${result.station.name.padEnd(28)} ${String(reason).padEnd(42)} ${result.url}`);
    }
  }

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ checkedAt: new Date().toISOString(), summary, failures: results.filter((r) => verdict(r) !== "ok") }, null, 2));
  } else {
    console.log(`Stream check — ${new Date().toISOString()}`);
    console.log(`Checked ${results.length} stations: ${summary.ok} ok, ${summary.warn} warn, ${summary.fail} fail`);
    if (lines.length) {
      console.log("");
      for (const line of lines.sort()) console.log(line);
      console.log("");
      console.log("Fix the URLs above or swap the stations in index.html.");
    }
  }

  process.exitCode = summary.fail > 0 ? 1 : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
