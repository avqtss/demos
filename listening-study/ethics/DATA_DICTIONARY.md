# Data Dictionary and Logging Boundaries

## 1. Data actively created by the current webpage

The current public prototype writes only to browser `localStorage` under `avqtss-subjective-study-v2`, unless the user deliberately downloads a fictional CSV or JSON file. It sends no study record to GitHub, Qualtrics, or the researchers.

| Field or group | Example type | Purpose | Location in current prototype |
|---|---|---|---|
| `schemaVersion`, `appVersion` | version strings | Interpret and audit the record format | Browser localStorage; JSON; app version also CSV |
| `phase`, `currentTrialIndex` | state and integer | Resume local progress | Browser localStorage only |
| `studyId` | `AVQTSS-MOS-01` | Identify this task | Configuration; JSON/CSV export |
| `participantCode` | assigned code | Locate a coded response and support withdrawal if an approved linkage exists | Browser localStorage; JSON/CSV; proposed Qualtrics embedded field |
| `sessionId` | random UUID | Distinguish browser sessions | Browser localStorage; JSON/CSV |
| Consent versions and dates | strings | Identify the text agreed to | Browser localStorage; JSON; selected values in CSV |
| `statementIds` | seven identifiers | Record which mandatory declarations were selected | Browser localStorage; JSON |
| `eligibilityConfirmed` | Boolean | Record the 18-or-over declaration | Browser localStorage; JSON |
| `consentedAt` | ISO timestamp | Time of consent action | Browser localStorage; JSON/CSV |
| Equipment flags | four Booleans | Require headphone, quiet-room, volume, and channel checks | Browser localStorage only |
| `randomisationSeed` | integer | Reproduce trial order | Browser localStorage; JSON |
| `blindMap` | method-to-label map | Reconstruct blinded analysis | Browser localStorage; JSON |
| `trialPlan` | 40 coded trial objects | Resume and audit randomised presentation | Browser localStorage; completed trial fields copied to JSON/CSV |
| `passedBreaks` | integer list | Prevent skipping the scheduled break | Browser localStorage only |
| `startedAt`, `completedAt` | ISO timestamps | Session timing | Browser localStorage; JSON |
| Current draft | playback and unsaved ratings | Resume the open trial | Browser localStorage only |
| Trial identifiers | trial, block, method, stimulus, scene, query | Analysis and audit | Browser localStorage; JSON/CSV |
| Media paths | relative video/audio paths | Audit which files were presented | Browser localStorage; JSON |
| `mosC`, `mosS` | integers 1-5 | Primary participant ratings | Browser localStorage; JSON/CSV |
| Playback fields | count and timestamps | Confirm playback and describe interaction | Browser localStorage; JSON; count in CSV |
| Response timing | timestamps and seconds | Quality control and burden assessment | Browser localStorage; JSON/CSV |
| `userAgent`, `language` | browser strings | Technical compatibility audit | Added to JSON only when generated |
| `submissionReceipt` | object or null | Future submission acknowledgement | Null in current prototype; JSON |
| Record-generation time | ISO timestamp | Audit export creation | JSON only |

The application does not actively request or save a name, email address, phone number, postal address, microphone recording, camera recording, voice, GPS location, or IP address in the study record.

## 2. Proposed University Qualtrics fields

The Qualtrics project does not yet exist. The following minimum fields are proposed, not currently stored by a server:

| Proposed field | Content | Status |
|---|---|---|
| Qualtrics response ID | platform-generated response identifier | Pending University project |
| `avqtss_participant_code` | assigned code | Bridge example implemented; not configured |
| `avqtss_consent_version` | consent version string | Bridge example implemented; not configured |
| `avqtss_payload_json` | versioned coded study record | Bridge example implemented; payload limit not confirmed |
| Qualtrics start/end/status fields | platform workflow metadata | Exact tenancy behaviour to confirm |

Qualtrics anonymous links collect IP and location by default. Before recruitment, the project must enable **Anonymize Responses before the first response** and verify that IP, location, contact-list, same-session, fraud-detection, and XM Directory fields are not retained in the research response. Qualtrics or its infrastructure providers may still create service-security and operational logs outside the exported research dataset; their exact content, region, access, and retention must be confirmed by the University administrator.

## 3. Proposed University storage

After verified export, the proposed analysis copy would be kept in a restricted University SharePoint or OneDrive folder. It would contain the coded JSON/CSV dataset and an audit log of exports, corrections, withdrawals, and deletion actions. Access is proposed for Qingyu Luo and Professor Philip Jackson only unless the approved Ethics RM application names another person.

The retention period, SharePoint/OneDrive recycle-bin and backup behaviour, export frequency, and deletion date have not been approved. They must be recorded in the final data management plan and participant information.

## 4. Service-provider technical logs

| Service | Researcher-controlled study data | Possible service-generated technical data | Relationship to participant code |
|---|---|---|---|
| GitHub Pages | Static HTML, JavaScript, CSS, media, and documents only; no ratings endpoint | GitHub states that visitor IP is logged for security and its privacy statement covers request time, browser/device, pages and similar usage information | The site does not send the code to GitHub as a research field. A code typed into the page remains local, but GitHub still serves the page and media requests. |
| Browser | Full current prototype state and optional downloads | Browser history, cache, crash/telemetry data depend on the participant's browser and organisation | Local state contains the code. Browser-vendor logs are outside this application's control. |
| University Qualtrics, proposed | Coded response payload and Qualtrics workflow fields | May create IP/location/default fields unless anonymisation is configured; may create operational/security logs | Formal response will include the assigned code to permit lookup. Distribution/contact linkage must not be appended to the response. |
| University SharePoint/OneDrive, proposed | Coded export and withdrawal audit | University authentication, access, version, recycle-bin, and security logs | Files will contain codes; authorised University user activity may be logged. |

## 5. Can the participant code identify an invitee?

The webpage itself cannot identify a person from the code. Whether the record is anonymous or pseudonymised depends on recruitment:

- If codes are generated without any retained mapping, the researcher cannot identify an invitee or contact them, and identity-based withdrawal is not possible. The participant could still request withdrawal by supplying the code.
- If the research team keeps a code-to-contact recruitment log, the ratings are pseudonymised, not anonymous. That linkage must be stored separately in a restricted University location, never in GitHub or the ratings export, and deleted on the approved schedule.

For an executable withdrawal process, the recommended approach is to retain a minimal separate recruitment log until the approved withdrawal deadline, then destroy it and document that later individual withdrawal is no longer possible. This choice and deadline require Ethics RM approval before the webpage is activated.

## 6. Blank examples

- [`../examples/blank-ratings.csv`](../examples/blank-ratings.csv)
- [`../examples/blank-study-record.json`](../examples/blank-study-record.json)

The fictional lifecycle outputs under `test-evidence/fictional-downloads/` use only `TEST-P0001` and are not participant data.
