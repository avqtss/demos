# AV-QTSS subjective evaluation site

Static ethics-review prototype for the MOS-C and MOS-S listening test described in the paper.

## Protocol implemented

- Eight method conditions: No-Separator, USS, No-Binding, No-Class, Ambi-Encode, Direction-Only, Ours (No-Joint), and Ours.
- Planned recruitment of 12-20 adults, with an absolute maximum of 20 participants.
- Expected duration of 15-30 minutes per participant.
- Five binaurally decoded clips per method.
- 40 formal trials plus one practice trial.
- Separate 1–5 ratings for content correctness (MOS-C) and perceived spatial accuracy (MOS-S).
- Method-blind, block-randomised presentation with deterministic session records.
- Headphone volume and left/right channel checks.
- Mandatory complete playback before ratings unlock.
- Mid-study break, browser-local progress, and coded CSV/JSON export.

## Ethics-review status

`study-config.js` currently has `demoMode: true`. The included media are interface-demonstration placeholders copied from an existing AV-QTSS audition pack. They must not be used to collect paper results.

Before ethics submission or participant recruitment:

1. Replace the researcher email, supervisor contact, and ethics reference in `study-config.js`.
2. Add five approved study stimuli. Each stimulus must provide one binaurally decoded output for every method in `audioByMethod`.
3. Select and configure an institution-approved submission and storage service.
4. Confirm the participant information, withdrawal deadline, data controller, retention period, secure transfer procedure, recruitment text, compensation, and inclusion/exclusion criteria against the approved protocol.
5. Set `demoMode: false`. Startup validation will reject any missing method audio.

## Run locally

From this directory:

```bash
python3 -m http.server 8770 --bind 127.0.0.1
```

Open `http://localhost:8770/`.

The site is buildless and has no external runtime dependencies.
