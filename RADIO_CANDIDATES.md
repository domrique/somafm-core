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

## Ideas To Revisit

| Station | Why |
| --- | --- |
| RADCAP / Radio Caprice | Excellent Russian genre archive, but discovered stream endpoints are HTTP/IP-based, which is risky on GitHub Pages because of mixed-content blocking. Find a clean HTTPS endpoint before adding. |
| KCRW Eclectic24 | Strong meloman fit, but checked direct URL had TLS/certificate trouble. Need a better endpoint. |
| KUTX | Good selector-rock candidate, but checked direct URL had TLS/certificate trouble. Need a better endpoint. |
| Classic rap / J Dilla-style beats | Still under-covered. Keep searching for stable HTTPS non-aggregator streams. |
