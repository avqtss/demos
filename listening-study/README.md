# AV-QTSS subjective evaluation site

Static pre-recruitment ethics-review prototype for the proposed AV-QTSS MOS-C and MOS-S listening task. No formal participant data are accepted.

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
- Mid-study break, browser-local progress, fictional coded CSV/JSON export, and browser-local deletion.
- Seven mandatory University-template consent statements, with version, time, and participant code recorded together.

## Ethics-review status

`study-config.js` currently has `demoMode: true` and `submission.enabled: false`. The included media are interface-demonstration placeholders copied from an existing AV-QTSS audition pack. They must not be used to collect research results.

Before ethics submission or participant recruitment:

1. Obtain Ethics RM approval and replace `Pending approval` with the reference.
2. Add five approved study stimuli. Each stimulus must provide one binaurally decoded output for every method in `audioByMethod`.
3. Create and validate the proposed University Qualtrics project and restricted University storage workflow.
4. Confirm the server region, access, retention, backup deletion, participant-code lookup, and withdrawal deadline.
5. Compare the consent text with the researcher's private Section 8.1 draft.
6. Set `demoMode: false` and enable submission only after end-to-end fictional testing. Startup validation will reject missing method audio.

See [`ETHICS_WEBPAGE_AND_DATA_FLOW.md`](ETHICS_WEBPAGE_AND_DATA_FLOW.md) for the review pack index.

## Run locally

From this directory:

```bash
python3 -m http.server 8770 --bind 127.0.0.1
```

Open `http://localhost:8770/`.

The site is buildless and has no external runtime dependencies.
