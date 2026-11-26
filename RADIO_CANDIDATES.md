# Radio Candidates And Field Notes

This file tracks external radio ideas, field-test results and stations to try
later. Browser / phone playback is the source of truth; local curl checks are
only hints because some live streams behave badly outside a browser.

## Active In App For Field Testing

These came from the old candidate list and are currently kept in
`EXTRA_STATIONS`.

| Station | URL | Status |
| --- | --- | --- |
| UK Bass Radio | `https://s2.ssl-stream.com/listen/uk_bass_radio/stream` | active candidate |
| DNBRadio FW | `https://fw.dnbradio.com/dnbradio_main.mp3` | active candidate; kept after removing duplicate Azura |
| Liquid DnB | `https://antares.dribbcast.com/proxy/dave1/stream/` | active candidate |
| Atmospheric dnb s0urce | `https://brokenbeats.net/stream/aac` | active candidate |
| Futuredrumz | `https://futuredr.radioca.st/;?` | active candidate |
| Bassdrive Radioca.st | `https://bassdrive.radioca.st/stream` | active alternate endpoint |
| Roots Legacy | `https://l.rootslegacy.fr/;` | active candidate |
| Roots Legacy Alt | `https://l.rootslegacy.fr/stream/1/` | active alternate endpoint |
| Metal Only | `https://metalonly.sp.radio.fm/stream` | active candidate |
| Punkrockers Radio | `https://stream.punkrockers-radio.de:8443/mp3` | active candidate |
| DKFM | `https://kathy.torontocast.com:2005/stream` | active candidate |
| Sub FM | `https://subfm.radioca.st/Sub.FM` | active candidate |
| LYL Radio | `https://icecast.lyl.live/live` | active candidate |
| FIP Radio | `https://icecast.radiofrance.fr/fip-midfi.mp3` | active candidate |
| Refuge Worldwide | `https://streaming.radio.co/s3699c5e49/listen` | active candidate |

## Removed After Field Testing

These were added for debugging and removed after user testing.

| Station | URL | Reason |
| --- | --- | --- |
| DNBRadio Azura | `https://azura.drmnbss.org:8000/radio.mp3` | duplicate of DNBRadio FW; user asked to remove station 76 |
| Jungletrain | `https://chat.jungletrain.net/streamtest/;stream/1` | removed by user field list |
| Kool FM | `https://admin.stream.rinse.fm/proxy/kool/stream` | removed by user field list |
| Liquid DnB Alt | `https://antares.dribbcast.com/proxy/dave1?mp=/stream` | duplicate of Liquid DnB |
| Joint Radio Reggae | `https://jointil.com/stream-reggae` | removed by user field list |
| Joint Radio Dub | `https://betelgeuse.nucast.co.uk/stream/jrn-dub` | removed by user field list |
| MOROW | `https://stream.fr.morow.com:8080/morow_med.mp3` | removed by user field list |
| NTS Radio 1 | `https://stream-relay-geo.ntslive.net/stream?client=direct` | removed by user field list |
| NTS Radio 2 | `https://stream-relay-geo.ntslive.net/stream2?client=direct` | removed by user field list |
| Sleepbot Broadcast | `https://sleepbot.streamguys1.com/botb.mp3` | removed by user field list |
| Skyrock Klassiks | `https://icecast.skyrock.net/s/klassiks_aac_64k` | French rap oldies; does not fit the collection, removed on request (2026-11-27) |

## Russian / RU-Origin Candidates

HTTPS streams that fit a more meloman-friendly direction. These are not in the
app yet.

| Station | Genre | URL | Status |
| --- | --- | --- | --- |
| Radio Jazz | jazz | `https://jfm1.hostingradio.ru:14536/ijstream.mp3` | tested: audio + CORS OK |
| Radio Orpheus | classical | `https://orfeyfm.hostingradio.ru:8034/orfeyfm192.mp3` | tested: audio + CORS OK |
| Radio Hermitage | jazz / lounge / classics | `https://hermitage.hostingradio.ru/hermitage128.mp3` | tested: audio + CORS OK |
| Ultra | alternative rock | `https://nashe1.hostingradio.ru/ultra-128.mp3` | tested: audio + CORS OK |
| Nashe Radio | Russian rock | `https://nashe1.hostingradio.ru/nashe-256` | tested: audio + CORS OK |
| Rock Arsenal | rock / classic rock | `https://online.rockarsenal.ru/rockarsenal` | tested: audio + CORS OK |
| Record Neurofunk | neurofunk / dnb | `https://radiorecord.hostingradio.ru/neurofunk96.aacp` | tested: audio + CORS OK |
| Record Dubstep | dubstep | `https://radiorecord.hostingradio.ru/dub96.aacp` | tested: audio + CORS OK |
| Record Chillout | chillout | `https://radiorecord.hostingradio.ru/chil96.aacp` | tested: audio + CORS OK |
| Record Trancemission | trance | `https://radiorecord.hostingradio.ru/tm96.aacp` | tested: audio + CORS OK |

## Meloman Candidates

Potential additions for a deeper selector-radio feel.

| Station | Genre | URL | Status |
| --- | --- | --- | --- |
| WWOZ New Orleans | jazz / funk / roots | `https://wwoz-sc.streamguys1.com/wwoz-hi.mp3` | tested: audio + CORS OK |
| KALX Berkeley | college / punk / freeform | `https://stream.kalx.berkeley.edu:8443/kalx-128.mp3` | tested: audio, CORS not explicit |
| WFMU Freeform | freeform / underground | `https://stream0.wfmu.org/freeform-128k.mp3` | tested: audio, CORS restricted; browser field test needed |

## 2026-11-26 Stream Audit

Full pass over all 101 entries in `EXTENDED_STATIONS` + `EXTRA_STATIONS`.
Checks: HTTP status, first audio bytes, `Content-Type`, and the
`Access-Control-Allow-Origin` header for `Origin: https://domrique.github.io`.
The CORS part matters: `<audio crossorigin="anonymous">` in the app makes
the browser fetch in CORS mode, so a stream without ACAO fails to load
(confirmed in a real browser, not just with curl).

### Upgraded from HTTP to HTTPS (mixed content)

| Station | New URL |
| --- | --- |
| Generations Reggae | `https://generations-caraibes.ice.infomaniak.ch/generations-caraibes-high.mp3` |
| 181 FM Reggae Roots | `https://listen.181fm.com/181-reggae_128k.mp3` (old `relay5.181.fm:8096` has no HTTPS) |
| Retro FM | `https://retroserver.streamr.ru:8043/retro256.mp3` |
| ROCK FM | `https://nashe1.hostingradio.ru/rock-128.mp3` |
| Chanson | `https://chanson.hostingradio.ru:8041/chanson128.mp3` |
| Nashe Radio | `https://nashe1.hostingradio.ru/nashe-128.mp3` |
| Dorognoe Radio | `https://dorognoe.hostingradio.ru:8000/dorognoe` |
| Silver Rain | `https://silverrain.hostingradio.ru/silver128.mp3` |

### Replaced (dead, HTTP-only or no CORS)

| Was | Issue | Now |
| --- | --- | --- |
| Rinse FM (`admin.stream.rinse.fm`) | Live audio but no ACAO; with `crossorigin` the element errors. No working alternate endpoint found (AzuraCast HLS/public paths all 404). | AAJA Radio `https://aaja.radiocult.fm/stream` |
| FUNKY RADIO (`funkyradio.streamingmedia.it`) | No ACAO on any mount. | Same network, classic funk channel: `https://my.streamingmedia.it/listen/discofunk/play` |
| BOX Lofi (`play.streamafrica.net/lofiradio`) | No ACAO (HTTPS answers with a StreamRouter page). | LITT Live Lofi `https://das-sa39.cdnstream1.com/5582_128` |
| King Dub Radio (`london-dedicated.myautodj.com:8862`) | HTTP only, no TLS on the mount. | Only Dub Radio `https://puma.streemlion.com:5505/stream` |
| The Lot Radio (`livepeercdn.studio/hls/85c28sa2o8wppm58`) | HLS id expired, 504 from the gateway. | `https://live-test.thelotradio.com/live/index.m3u8` (the URL their site advertises in `og:video`; may change) |

### Added 2026-11-26 (jazz / soul and hip-hop / lo-fi / beats)

Fresh stations for the two thinner sections, all HTTPS + CORS checked in a
browser with `crossorigin=anonymous` on the Pages origin.

| Station | Genre | URL | Why |
| --- | --- | --- | --- |
| FIP Jazz | jazz | `https://icecast.radiofrance.fr/fipjazz-midfi.mp3` | Radio France curation, no ads, deep catalogue. |
| WWOZ New Orleans | jazz-funk | `https://wwoz-sc.streamguys1.com/wwoz-hi.mp3` | Community station: brass, funk, roots, live sessions. |
| JFSR Jazz Funk Soul | soul | `https://s2.radio.co/s22ae5a8a6/listen` | 320k UK jazz-funk/soul crate, fits the crate-digging lane. |
| FIP Hip-Hop | hip-hop | `https://icecast.radiofrance.fr/fiphiphop-midfi.mp3` | Golden era plus new scenes, ad-free public radio. |
| Pueblo Vista Radio | chillhop | `https://pueblovista.net/listen/pueblo_vista_fm/standard.mp3` | Lofi label radio, real catalogue rather than an aggregator. |
| Epic Lounge Jazzhop | jazz-hop | `https://stream.epic-lounge.com/jazzhop-lounge` | Fills the jazz-hop / boom-bap gap in the beats section. |

Rejected on the way: Solar Radio (`svr1.msmn.co:8136`) answers curl with
CORS but fails in the browser; Jazz Radio sub-channels (soul/groove/black
music) do not resolve; Jazz24 endpoints are dead or time out; the
radio-browser "jazz"/"soul"/"beats" tags are full of mismatched stations
(Christmas FM, TikTok Hits) and were not trusted.

### Added 2026-11-26 (classic rap, soul, dub techno, community)

| Station | Section | URL | Why |
| --- | --- | --- | --- |
| Sensi Hip Hop | hip-hop | `https://sensihiphop.radioca.st/stream` | UK boom-bap: KRS-One, El Da Sensei, backpack lane. |
| WEFUNK Radio | hip-hop | `https://s-14.wefunkradio.com:8443/wefunk64.mp3` | Montreal crate institution: funk 45s + golden-era rap in DJ sets. 64 kbps. |
| Starpoint Radio | soul | `https://stream2.hippynet.co.uk/stream/starpointradiohigh` | London soul, disco and boogie, 192 kbps. |
| Deep Dub Tech Radio | dub-techno | `https://listen5.myradio24.com/ddtradio` | Dub techno / deep techno pressure, 320 kbps. |
| Radio Alhara | community | `https://stream.radioalhara.net/ra` | Ramallah community radio, leftfield sound and field recordings. |

Rejected: Hotmix Classic Rap has the right curation but no CORS;
Record Rap Classics is 2Pac/50 Cent mainstream; Tower Town and laut.fm
hiphop are German rap; WHHC plays current hits; Badrock "Golden Era"
actually played Italo-disco.

### Added 2026-11-27 (classical, latin, africa, house, dubstep, turntablism, doom)

One new section (`classical`); everything else extends the existing groups so
the list does not fragment: house goes to `psy / techno / club`, dubstep to
`dnb / jungle / bass`, dancehall and ska to `reggae / dub / roots` (same
Jamaican lineage as reggae), turntablism to `hip-hop / lo-fi / beats`,
doom/stoner and extreme metal to `metal / punk`, and smooth jazz, bossa, cumbia,
highlife, afrobeat-jazz and amapiano to `jazz / funk / soul / roots` (renamed).

| Station | Genre | URL | Note |
| --- | --- | --- | --- |
| Radio Swiss Classic | classical | `https://stream.srg-ssr.ch/srgssr/rsc_de/aac/192` | SRG, no ads |
| Radio Classique | classical | `https://radioclassique.ice.infomaniak.ch/radioclassique-high.mp3` | Paris concert staples |
| WQXR Q2 | contemporary-classical | `https://q2stream.wqxr.org/q2.aac` | NYPR avant-garde stream |
| Radio Orpheus | classical | `https://orfeyfm.hostingradio.ru:8034/orfeyfm128.mp3` | Moscow opera/symphonic |
| Suite Jazz Radio | smooth-jazz | `https://jenny.torontocast.com:2000/stream/suitejazzradio` | Art Farmer-class warmth |
| Radio Monte Carlo Bossa | bossa | `https://mc-mcbossa.hostingradio.ru/mcbossa96.aacp` | Brazilian lounge |
| Cumbia Total | cumbia | `https://playerservices.streamtheworld.com/api/livestream-redirect/ACIR40_S01AAC.aac` | Colombian cumbia |
| Ahenfie FM | highlife | `https://radio.localstreamgh.com/listen/ahenfie_radio_/radio.mp3` | Accra, Twi-language |
| Afrobeats Jazz Radio | afrobeat-jazz | `https://radio.nitro-server.uk/listen/frobeatsazzadio/radio.mp3` | fallback mount `frobeatsisingadio` |
| Soweto Underground | amapiano | `https://radio.d3kani.com/listen/soweto_underground/radio.mp3` | log drums, Soweto |
| Classic House Music | house | `https://classichousemusic.ca/listen/classic_house_music/radio.mp3` | 1987 club mixes |
| CHICAGO HOUSE | chicago-house | `https://stream.radio.co/sae989fe39/listen` | Tyree Cooper / Trax lineage |
| 313live | detroit-techno | `https://a9.asurahosting.com/listen/3_1_3_live.org/radio.mp3` | Detroit 313 |
| 24Dubstep DropZone | dubstep | `https://stream.24dubstep.pl/radio/8000/mp3_normal` | Polish 140 pressure |
| Sensimedia Dancehall | dancehall | `https://sensidancehall.radioca.st/;` | Sensi family |
| Générations Dancehall | dancehall | `https://generations-dancehall.ice.infomaniak.ch/generations-dancehall.aac` | French channel |
| Tonic Ska Radio | ska | `https://eu10.fastcast4u.com/tonicska` | Madness / 2 Tone |
| ScratchVision Radio | turntablism | `https://stream.radio.co/saacde1bcb/low` | Gang Starr, cuts |
| Gritty Rock Radio | stoner | `https://listen.radioking.com/radio/10713/stream/224413` | stoner/doom riffs |
| Bandung Death Metal Syndicate | black-metal | `https://stream.zeno.fm/t9wdzppre5zuv` | extreme metal |

Rejected after listening: Dead Moon (plays liquid DnB), Ruffneck Smille (roots
reggae + laut.fm ads), Doom Stew (metadata stuck on one joke track), Scratch
Radio (same), MyDoom-666 (euro-trance), Radio BOB Ska/Stoner (no metadata to
verify). Asia was intentionally skipped.

### Neoclassical added 2026-11-27

Max Richter / Library Tapes territory, verified by ICY metadata before adding:
Radio Art's Ambient Piano played Christina Vantzou, Contemporary played Tavener,
Einaudi played Einaudi, Whisperings played a Bach arrangement for solo piano.

| Station | Genre | URL |
| --- | --- | --- |
| Radio Art Contemporary | contemporary-classical | `https://live.radioart.com/fContemporary.mp3` |
| Radio Art Ambient Piano | neoclassical | `https://live.radioart.com/fAmbient_piano.mp3` |
| Radio Art Einaudi | neoclassical | `https://live.radioart.com/fLudovico_einaudi.mp3` |
| Whisperings Solo Piano | neoclassical | `https://pianosolo.streamguys1.com/live` |

Music only, but the free Radio Art tier injects an occasional "Upgrade to
Premium" line into the metadata/ads. No Max Richter or Nils Frahm channel
exists on Radio Art (`fMax_richter`, `fNils_frahm` are 404); the closest
"Positively Sleep Max Richter" stream is a sleep channel, not a radio station.

### Classic rock and psybreaks added 2026-11-27

| Station | Genre | URL | Note |
| --- | --- | --- | --- |
| Planet Rock | classic-rock | `https://stream.rcs.revma.com/w66qp4pp81uvv` | UK classic rock; the hellorayo URL is geo/moved, the RCS relay works. Verified: Allman Brothers "Jessica". |
| Exclusively Led Zeppelin | classic-rock | `https://streaming.exclusive.radio/er-app/ledzeppelin/icecast.audio` | Zeppelin only, verified. Same network has Pink Floyd / Deep Purple / Queen mounts if wanted later. |
| Radio Boga | psybreaks | `https://radio.radiodjboga.online/stream` | Removed after the 2026-11-27 content audit: it is a different project (Radio DJ Boga), not the VK `radio_boga` psybreaks/psybass community. |

`metal / punk` was renamed `rock / metal / punk` since classic rock now lives
there. A dedicated 24/7 psybass stream does not exist in the public
directories we checked (radio-browser, internet-radio); PsyRadio/DMT FM are
psytrance, so Boga is the only psybreaks/psybass entry for now.

### Content audit 2026-11-27 (genre vs actual programming)

Sampled ICY metadata for all 118 external stations (three titles each) and
re-checked every suspicious one a second time. Five real mismatches:

| Station | Label said | Actually played | Fix |
| --- | --- | --- | --- |
| 181 FM Reggae Roots | roots-reggae | Ariana Grande, Tate McRae — pop, format flipped | replaced with Reggae.fr (`listen.radioking.com/radio/50473/stream/87415`, mix shows, verified) |
| 313live | detroit-techno | Tube & Berger, Rampa — tech house | relabelled `house`, description honest |
| Radio Boga | psybreaks | wrong project, no ICY, user reported off-style | removed |
| Gritty Rock Radio | stoner | Joe Bonamassa — blues rock | relabelled `blues-rock` |
| Afrobeats Jazz Radio | afrobeat-jazz | Kabza De Small — amapiano | relabelled `afrobeats` |
| Radio ACID | chillhop | J.Cole, Lupe Fiasco — chill rap | relabelled `hip-hop` |

Borderline, left as is: FM 80 plays modern nu-disco (description now says
"classic and modern"), ROCK FM plays the western canon (description fixed),
Sensimedia Dancehall plays reggae-dancehall crossovers, MC Bossa plays
electro-swing bossa. AAJA Radio was "Off Air" during the audit — station
alive, programming paused.

Stations without ICY metadata (FIP family, The Lot, Operator, Cashmere, some
SomaFM) could not be judged this way; they were verified by their own
now-playing APIs or left as-is.

Answer to "how many more": 5 of 118 (~4%), plus 3 borderline. The rest of
the mismatches people hear are usually station promos/IDs, not wrong genres.

### Psybreaks / psybass search (2026-11-27)

Checked TuneIn OPML, radio.garden, Xiph/Icecast, Shoutcast, myTuner,
radio-browser and internet-radio: **no 24/7 psybreaks or psybass station
exists in public directories**. Radio Boga itself is a podcast community
(VK `radio_boga`, SoundCloud), not a live stream.

What exists:
- BadBeatRadio `https://misato.ru-hoster.com:8061/badbeatradio` — nu skool
  breakbeat, the closest live rhythm family; added as genre `breaks`.
- DMT FM `https://dc1.serverse.com/proxy/ywycfrxn/stream` — psytrance with
  psybreaks shows, but 24/7 it is psytrance; not added (Hirschmilch already
  covers the section).
- Nubreaks (stream1.nubreaks.com) — dead certificate; Groovin
  (groovin.sbs, tagged psybreaks) — connection refused; laut.fm breakbeat
  channels — German ad blocks in the stream.

### Psychill / psybient layer added 2026-11-27

The artists asked about (Slackbaba, Desert Dwellers, Astronaut Ape, Maiia,
Chronos) live in psychill / psybient / psydub, not psytrance. Verified by
metadata before adding: RadiOzora played Hataken, Psybient Sunset played
Tripswitch (Eat Static remix), Paradisehunter played Total Eclipse,
Pyramid Radio played Detune.

| Station | Genre | URL |
| --- | --- | --- |
| DMT FM | psytrance | `https://dc1.serverse.com/proxy/ywycfrxn/stream` |
| RadiOzora Chill | psychill | `https://chill.out.airtime.pro/chill_a` |
| Psybient Sunset | psybient | `https://listen.openstream.co/6517/audio` |
| Paradisehunter Chill | psychill | `https://radio.paradisehunter.de/listen/chillout/radio.mp3` |
| Pyramid Radio | psybient | `https://a5.asurahosting.com:7540/radio.mp3` |

All five stay inside `psy / techno / club` — no new sections.

### Stream health automation

`scripts/check-streams.js` (`npm run check:streams`) probes every URL in
`index.html` for HTTPS, audio bytes and CORS, retries flaky hosts three
times and exits non-zero when something is broken. The
`Stream Check` workflow runs it every Monday and opens or updates a
`Stream check failed` issue.

External stations can now carry `fallbackUrls: []` in `ext(...)`; the
player rotates through them on decode errors and reconnect attempts the
same way it already did for the SomaFM URL ladder.

### Flaky but alive

WMBR, Radio Jazz and KCHUNG occasionally time out on the first connect
through the VPN path, then answer normally. No change needed.

Ad-hoc probing scripts (not in the repo):
`%TEMP%\opencode\soma-tests\probe.js` (all stations from `index.html`)
and `check.js` + `targets.json` (arbitrary candidate URLs).

## Ideas To Revisit

| Station | Why |
| --- | --- |
| RADCAP / Radio Caprice | Excellent Russian genre archive, but discovered stream endpoints are HTTP/IP-based, which is risky on GitHub Pages because of mixed-content blocking. Find a clean HTTPS endpoint before adding. |
| KCRW Eclectic24 | Strong meloman fit, but checked direct URL had TLS/certificate trouble. Need a better endpoint. |
| KUTX | Good selector-rock candidate, but checked direct URL had TLS/certificate trouble. Need a better endpoint. |
| Classic rap / J Dilla-style beats | Still under-covered. Keep searching for stable HTTPS non-aggregator streams. |
