# Implementation Status

## Implemented and tested with fictional data

- [x] Persistent pre-recruitment warning and no claim of ethical approval.
- [x] Wider project title separated from this AV-QTSS task.
- [x] Researcher and supervisor University email addresses.
- [x] Planned 12-20 adults, maximum 20, age 18 or over, 15-30 minutes, and no dedicated funding.
- [x] Seven numbered consent statements plus separate required age confirmation.
- [x] Continue disabled until code, age confirmation, and all seven statements are supplied.
- [x] Consent version, information-sheet version, selected statement IDs, code, and timestamp stored together.
- [x] Headphone, quiet-room, volume, and left/right channel checks.
- [x] One unscored practice trial.
- [x] Eight internal methods, five configured stimuli, and a 40-trial block-randomised plan.
- [x] Participant trial page hides internal method names.
- [x] MOS-C and MOS-S questions and 1-5 endpoints unchanged.
- [x] Complete-playback gate before ratings unlock.
- [x] Both ratings mandatory; no skipped formal trial.
- [x] Replay/pause/resume and answer changes while the current trial is open.
- [x] No Back control after saving a trial.
- [x] Scheduled break after formal trial 20.
- [x] Browser-local resume and deletion.
- [x] Fictional CSV/JSON download and blank field examples.
- [x] Disabled, origin-restricted webpage-side Qualtrics bridge boundary with no credentials.
- [x] Nine screenshots and automated fictional lifecycle report.
- [x] Six placeholder media files return HTTP 200 and decode with five-second duration.

## Requires University account, administrator confirmation, or approval

- [ ] Create the University Qualtrics project and assign the approved owner/collaborators.
- [ ] Confirm custom JavaScript, iframe, payload-size, and content-security-policy support.
- [ ] Confirm University Qualtrics server/data-centre region and subprocessors.
- [ ] Configure and verify Anonymize Responses before any real response.
- [ ] Confirm Qualtrics operational logs, retention policy, deletion recovery interval, and backup handling for the Surrey tenancy.
- [ ] Create the restricted University SharePoint/OneDrive destination and permissions.
- [ ] Approve export frequency, retention period, and deletion schedule in the data management plan.
- [ ] Agree and publish an executable post-submission withdrawal deadline.
- [ ] Confirm SharePoint/OneDrive recycle-bin, version-history, and managed-backup treatment on withdrawal.
- [ ] Receive Ethics RM approval and insert the reference.
- [ ] Compare the displayed seven statements line by line with the researcher's private Section 8.1 draft, which was not present in the reviewed workspace.

## Not complete

- [ ] Final 40 method-specific binaural stimuli. Current five audio files and one scene are placeholders, and each method falls back to the same demo audio for a stimulus.
- [ ] Live University Qualtrics receiving project and parent bridge.
- [ ] Server-persisted submission-success page.
- [ ] Central response export test.
- [ ] Participant-code lookup and deletion test in Qualtrics.
- [ ] Matching deletion test in SharePoint/OneDrive, recycle bins, version history, and backups.
- [ ] Final retention period and withdrawal cutoff.
- [ ] Production activation. `demoMode` remains `true`; `submission.enabled` remains `false`.

## Test evidence

- Lifecycle result: [`test-evidence/fictional-lifecycle-test-result.json`](test-evidence/fictional-lifecycle-test-result.json)
- Placeholder-media audit: [`test-evidence/placeholder-media-audit.json`](test-evidence/placeholder-media-audit.json)
- Fictional outputs: [`test-evidence/fictional-downloads/`](test-evidence/fictional-downloads/)
- Screenshots: [`screenshots/`](screenshots/)

The lifecycle report marks formal submission as `NOT RUN`. It does not convert the successful local workflow test into a claim that Qualtrics or central deletion has been implemented.
