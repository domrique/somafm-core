# Radio Candidates To Recheck

These stations fit the project vibe, but did not pass the current stability check yet.
Recheck later before adding to `EXTRA_STATIONS`.

## DnB / Jungle / Liquid Funk

| Station | URL | Status |
| --- | --- | --- |
| Jungletrain | `https://chat.jungletrain.net/streamtest/;stream/1` | 502 / timeout / 0 bytes in current checks |
| Kool FM | `https://admin.stream.rinse.fm/proxy/kool/stream` | HTTP/0.9 / `audio/aacp` / 0 bytes in current checks |
| UK Bass Radio | `https://s2.ssl-stream.com/listen/uk_bass_radio/stream` | good headers and CORS, but only ~3 KB in 20 seconds |
| DNBRadio Azura | `https://azura.drmnbss.org:8000/radio.mp3` | good headers and CORS, but only ~3 KB in 10-12 seconds |
| DNBRadio FW | `https://fw.dnbradio.com/dnbradio_main.mp3` | good headers and CORS, but only ~2-3 KB in 10 seconds |
| Liquid DnB | `https://antares.dribbcast.com/proxy/dave1/stream/` | 0 bytes / HTTP weirdness in current checks |
| Liquid DnB alt | `https://antares.dribbcast.com/proxy/dave1?mp=/stream` | 0 bytes / HTTP weirdness in current checks |
| Atmospheric dnb s0urce | `https://brokenbeats.net/stream/aac` | 404 on HEAD / only ~3.5 KB on GET |
| Futuredrumz | `https://futuredr.radioca.st/;?` | good headers, but 0 bytes on GET |
| Bassdrive | `https://bassdrive.radioca.st/stream` | good headers, but 0 bytes on GET |

## Reggae / Dub / Roots

| Station | URL | Status |
| --- | --- | --- |
| Roots Legacy | `https://l.rootslegacy.fr/;` | excellent headers, but 0 bytes on GET |
| Roots Legacy alt | `https://l.rootslegacy.fr/stream/1/` | excellent headers, but 0 bytes on GET |
| Joint Radio Reggae | `https://jointil.com/stream-reggae` | redirects to HTTPS stream, good headers, but 0 bytes on GET |
| Joint Radio Dub | `https://betelgeuse.nucast.co.uk/stream/jrn-dub` | 502 in current checks |

## Metal / Punk / Post-Punk / Post-Rock

| Station | URL | Status |
| --- | --- | --- |
| Metal Only | `https://metalonly.sp.radio.fm/stream` | good headers, but 0 bytes on GET |
| Punkrockers Radio | `https://stream.punkrockers-radio.de:8443/mp3` | very low data rate in current checks |
| MOROW | `https://stream.fr.morow.com:8080/morow_med.mp3` | official playlist is HTTP; HTTPS timed out |
| DKFM | `https://kathy.torontocast.com:2005/stream` | good headers, but very low data rate in current checks |

## Experimental / Other

| Station | URL | Status |
| --- | --- | --- |
| NTS Radio 1 | `https://stream-relay-geo.ntslive.net/stream?client=direct` | official URL, good headers, but 0 bytes on GET |
| NTS Radio 2 | `https://stream-relay-geo.ntslive.net/stream2?client=direct` | official URL, good headers, but 0 bytes on GET |
| Sub FM | `https://subfm.radioca.st/Sub.FM` | good headers, but 0 bytes on GET |
| Refuge Worldwide | `https://streaming.radio.co/s3699c5e49/listen` | removed after user reported it does not work |
| LYL Radio | `https://icecast.lyl.live/live` | DNS / availability issues in current checks |
| Sleepbot Broadcast | `https://sleepbot.streamguys1.com/botb.mp3` | TLS certificate mismatch |
| FIP Radio | `https://icecast.radiofrance.fr/fip-midfi.mp3` | timeout in current checks |
