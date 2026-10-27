# Ethics RM Handover: Proposed AV-QTSS Listening Task

## 1. Scope and status

The overall project is **Listening Studies of Spatial Audio Generation for Audiovisual and Immersive Media**. The reviewed webpage describes only the proposed **AV-QTSS Binaural Listening Study** within that project. It does not purport to approve or obtain consent for every future study or paper.

- Planned sample: 12-20 volunteers aged 18 or over; absolute maximum 20.
- Expected duration: 15-30 minutes each.
- Funding for this task: no dedicated funding.
- Ethics reference: pending approval.
- Current status: pre-recruitment prototype; recruitment is closed.
- Formal participants recruited: none.
- Formal ratings collected: none.
- Formal submission service: proposed University of Surrey Qualtrics route, not configured.

Review URL: <https://avqtss.github.io/demos/listening-study/>
Repository: <https://github.com/avqtss/demos/tree/main/listening-study>
Application version: `2026.10.27-ethics-prototype-3`

## 2. Participant journey currently implemented

1. The participant-information page identifies the wider project and states that this page covers only the AV-QTSS task. It shows the pre-recruitment warning, study procedure, risks, data status, contacts, funding, and pending ethics status.
2. The user enters an assigned code, confirms they are at least 18, and selects all seven mandatory consent statements. Continue remains disabled until the code, age confirmation, and all seven statements are present. The page records the code, consent and information-sheet versions, selected statement IDs, and consent time together.
3. The user confirms headphones and a quiet environment, plays a comfortable-volume sample, and runs a generated left/right channel check. All four checks are required.
4. The user completes one unscored practice trial. Ratings remain locked until the complete stimulus has played.
5. A ready page explains that 40 formal trials follow, methods are hidden, and order is randomised.
6. Each formal trial shows a full equirectangular 360-degree scene, a class query, and one binaural stimulus. The clip may be paused, resumed, or replayed. Both MOS-C and MOS-S are required; neither can be skipped. Answers can be changed only while the current trial remains open.
7. A mandatory break page appears after formal trial 20.
8. After trial 40, the current prototype says that no data were submitted. It permits fictional CSV/JSON download and deletion of the browser-local test record. The formal submission control is disabled.

Exact displayed wording is in [`PARTICIPANT_PAGE_TEXT.md`](PARTICIPANT_PAGE_TEXT.md).

## 3. Rating questions and scales

### MOS-C

> How correctly does this clip reproduce only the queried source?

Options: `1`, `2`, `3`, `4`, `5`.

- 1: **Completely incorrect**
- 2-4: no additional verbal anchor
- 5: **Completely correct**

### MOS-S

> How accurately does the perceived direction match the queried source shown in the scene?

Options: `1`, `2`, `3`, `4`, `5`.

- 1: **Completely inaccurate**
- 2-4: no additional verbal anchor
- 5: **Completely accurate**

The protocol is eight anonymised methods times five clips, giving 40 formal trials, plus one unscored practice trial. No question, scale, or trial-count change has been introduced.

## 4. Seven displayed consent statements

The seven statements are numbered in the interface. The age declaration is a separate required eligibility confirmation.

1. I confirm that I have read and understood the participant information sheet dated 27 October 2026, version AVQTSS-PIS-v0.2-pre-approval, for the above study. I have had the opportunity to consider the information and ask questions, which have been answered satisfactorily.
2. I understand that my participation is voluntary and that I am free to withdraw at any time during the study without giving any reason. I understand that the deadline and procedure for withdrawing data after submission are pending ethics approval and will be stated here before recruitment.
3. I understand that information I provide may be subject to review by responsible individuals from the University of Surrey and/or regulators for monitoring and audit purposes.
4. I understand that information I provide may be used in anonymised research reports, publications, presentations, and research websites.
5. I understand that my participant code and consent record, which link me to the research data, will be kept securely in accordance with data protection guidelines, and only be accessible to the immediate research team or responsible persons at the University.
6. I understand that personal contact details used for recruitment will not be collected by this webpage and will not be shared beyond the study team.
7. I agree to take part in this study.

Statement 3 is the monitoring/audit statement missing from the previous six-item page. Statements 1-7 have been adapted from the University generic consent form. The user's private Section 8.1 draft was not found in the supplied workspace, so final line-by-line comparison with that specific draft remains required.

## 5. Submission decision

The intended formal receiver is **University of Surrey Qualtrics**, because University guidance lists UoS Qualtrics, UoS Microsoft Forms, and JISC as approved survey platforms, while this task needs custom audiovisual playback, randomisation, and validation. The archival analysis copy is proposed to be stored in a restricted University SharePoint or OneDrive location.

The selected architecture is:

1. The formal participant opens a University Qualtrics survey, not the bare GitHub Pages URL.
2. Qualtrics presents or embeds the AV-QTSS interface.
3. The child page sends a versioned coded payload only to an explicitly configured HTTPS parent origin using `postMessage`.
4. Qualtrics survey JavaScript validates the child origin and expected 40-response payload, then writes the participant code, consent version, and JSON payload to approved embedded-data fields.
5. The Qualtrics survey must finish its own response submission before success is shown to a participant.
6. Authorised researchers export coded data to restricted University storage on the approved schedule, verify the export, and remove the source copy according to the approved retention plan.

The child-side bridge is in `submission-bridge.js`; a non-deployed review example for the parent is in `integration/qualtrics-parent-bridge.example.js`. It contains no password, API token, project ID, or secret. Current configuration sets `submission.enabled` to `false`, has no parent origin, and makes no submission request.

## 6. Actions requiring University access or decisions

The researcher must complete all of the following before recruitment:

1. Obtain a University Qualtrics project under the Surrey tenancy and confirm that custom JavaScript, an embedded HTTPS iframe, and the expected JSON payload size are permitted.
2. Ask the University Qualtrics administrator to confirm the contracted data-centre region, subprocessors, organisational retention policy, disaster-recovery backup behaviour, and permanent-deletion timing for this tenancy.
3. Configure **Anonymize Responses before the first response**, so IP address, location, and default identifying fields are removed from survey results. Confirm that no contact-list or XM Directory fields are appended to responses.
4. Restrict response and export access to Qingyu Luo and Professor Philip Jackson unless the approved application names another person.
5. Create the restricted University SharePoint/OneDrive folder, define permissions, transfer frequency, verification, retention period, and deletion responsibilities.
6. Agree an executable withdrawal deadline with Ethics RM and, where required, Information Governance/Data Protection. Insert that exact deadline into the participant information and statement 2 only after the deletion test passes.
7. Populate all 40 method-specific stimuli, run accessibility/browser checks, replace `Pending approval` with the granted reference, set `demoMode` to `false`, and perform a new end-to-end test.

Do not send passwords, API tokens, or private keys to the webpage repository.

## 7. Evidence and test result

Nine screenshots cover participant information/consent, equipment check, practice before and after playback, ready page, formal trial before and after playback, scheduled break, and prototype completion. See [`screenshots/`](screenshots/).

The automated fictional lifecycle test passed:

- seven consent statements, age confirmation, versions, time, and code recorded;
- all six unique placeholder media files returned HTTP 200 and decoded metadata;
- 40-trial plan created, with eight methods appearing five times each;
- internal method names absent from the participant trial page;
- ratings locked before complete playback;
- both ratings required;
- break shown after trial 20;
- 40 fictional rows exported;
- browser-local record deleted.

Formal Qualtrics submission and central deletion were **not run** because the University project does not yet exist. This is recorded in [`test-evidence/fictional-lifecycle-test-result.json`](test-evidence/fictional-lifecycle-test-result.json).

## 8. Stimulus status

All currently included media are placeholders copied from one AV-QTSS demo scene:

- one five-second, 1280 x 640 equirectangular video;
- five five-second, 24 kHz, two-channel WAV files.

They load successfully, but every method currently falls back to the same demo audio for a given stimulus because all `audioByMethod` maps are empty. These files therefore demonstrate the interface only and are not the final 40 method-specific formal stimuli. Formal mode validates and rejects any missing method audio.

## 9. Authoritative references used

- University of Surrey ethics process: <https://my.surrey.ac.uk/research/ethics>
- University guidance on approved online-survey platforms: <https://my.surrey.ac.uk/sites/default/files/2025-05/online-surveys-questionnaires-and-the-ethics-review-process.pdf>
- University research-data storage guidance: <https://www.surrey.ac.uk/library/open-research/managing-and-storing-data>
- Qualtrics anonymisation settings: <https://www.qualtrics.com/support/survey-platform/survey-module/survey-options/survey-protection/>
- Qualtrics response deletion: <https://www.qualtrics.com/support/survey-platform/data-and-analysis-module/data/recorded-responses/>
- Qualtrics retention policies: <https://www.qualtrics.com/support/survey-platform/sp-administration/data-privacy-tab/data-retention/>
- GitHub Pages logging notice: <https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection>
