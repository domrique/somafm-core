#!/usr/bin/env node
// Exports EXTRA_STATIONS from index.html into stations.json so the Android
// wrapper can refresh the list without a rebuild.
//
// Usage:
//   node scripts/export-stations.js          write stations.json
//   node scripts/export-stations.js --check  fail if stations.json is stale

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const HTML_PATH = path.join(ROOT, "index.html");
const JSON_PATH = path.join(ROOT, "stations.json");
const SCHEMA = 1;

function readStationsFromHtml() {
  const html = fs.readFileSync(HTML_PATH, "utf8");
  const start = html.indexOf("const EXTRA_STATIONS = [");
  if (start < 0) throw new Error("EXTRA_STATIONS not found in index.html");

  const open = html.indexOf("[", start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < html.length; i += 1) {
    const ch = html[i];
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) throw new Error("Unterminated EXTRA_STATIONS array");

  const arrayText = html.slice(open, end + 1);
  const factory = "const ext=(id,name,genre,description,streamUrl,fallbackUrls=[])=>({id,name,genre,description,source:\"external\",streamUrl,fallbackUrls});\nreturn " + arrayText + ";";
  const stations = new Function(factory)();

  return stations.map((st) => {
    if (!st.id || !st.name || !st.streamUrl) throw new Error("Bad station entry: " + JSON.stringify(st));
    if (!st.streamUrl.startsWith("https://")) throw new Error("Non-HTTPS stream in " + st.id);
    const clean = {
      id: st.id,
      name: st.name,
      genre: st.genre || "",
      description: st.description || "",
      streamUrl: st.streamUrl,
    };
    if (Array.isArray(st.fallbackUrls) && st.fallbackUrls.length) {
      clean.fallbackUrls = st.fallbackUrls.filter((u) => typeof u === "string" && u.startsWith("https://"));
    }
    return clean;
  });
}

function payloadFor(stations) {
  return {
    schema: SCHEMA,
    generatedAt: new Date().toISOString(),
    count: stations.length,
    stations,
  };
}

function serialize(stations) {
  const payload = payloadFor(stations);
  const hash = crypto.createHash("sha256").update(JSON.stringify(payload.stations)).digest("hex").slice(0, 12);
  payload.hash = hash;
  return JSON.stringify(payload, null, 2) + "\n";
}

function main() {
  const stations = readStationsFromHtml();
  const next = serialize(stations);
  const check = process.argv.includes("--check");

  if (check) {
    if (!fs.existsSync(JSON_PATH)) {
      console.error("stations.json is missing. Run: npm run stations:export");
      process.exit(1);
    }
    const current = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
    if (JSON.stringify(current.stations) !== JSON.stringify(stations)) {
      console.error(`stations.json is stale (${current.stations.length} in file, ${stations.length} in index.html). Run: npm run stations:export`);
      process.exit(1);
    }
    console.log(`stations.json is in sync (${stations.length} stations).`);
    return;
  }

  fs.writeFileSync(JSON_PATH, next);
  console.log(`Wrote ${stations.length} stations to stations.json`);
}

main();
