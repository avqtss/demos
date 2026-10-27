# AV-QTSS Listening Study: Webpage and Data-Flow Description

## Study status and proposed participant link

This document describes the proposed future participant journey. No participants have been recruited and no formal ratings have been collected.

- Planned participant webpage: <https://avqtss.github.io/demos/listening-study/>
- Current local review copy: <http://localhost:8770/>
- Planned recruitment: 12-20 adults, with an absolute maximum of 20 participants.
- Expected duration: approximately 15-30 minutes per participant.
- Current status: pre-recruitment ethics-review prototype. The public page is a static interface demonstration and does not currently transmit research ratings to a server.

## 1. Proposed participant journey

1. The participant will open the study webpage and read the participant information. This covers the purpose and procedure, voluntary participation, possible listening risks, data to be collected, withdrawal, and researcher contacts.
2. The participant will provide consent by selecting six statements confirming that they have read the information, had an opportunity to ask questions, understand that participation is voluntary, understand the proposed data handling and withdrawal process, are at least 18 years old, and freely agree to take part. The Continue button will remain disabled until every statement is selected.
3. The participant will enter an assigned study code rather than their name or email address. They will confirm that they are wearing headphones and are in a quiet environment.
4. The participant will play a short volume sample and set a comfortable listening level. They will then run a left/right channel check.
5. The participant will complete one unrecorded practice trial. The practice uses the same playback and rating interface as the formal trials.
6. The participant will begin the formal study. Each trial will display the 360-degree visual scene, the class query, and one binaural stimulus. Processing-system names will be hidden from participants, and the presentation order will be randomised.
7. Ratings will remain locked until the complete five-second stimulus has played. After playback, the participant will answer both rating questions and select Save ratings and continue.
8. A scheduled break will be shown after 20 of the 40 formal trials.
9. After the last trial, the prototype will show a completion code and offer local CSV and JSON downloads. The formal study will require an institution-approved submission mechanism before recruitment begins.

## 2. Rating questions, response options, and listening burden

### MOS-C: content correctness

Exact question:

> How correctly does this clip reproduce only the queried source?

Response options: the integers **1, 2, 3, 4, and 5**.

- 1: **Completely incorrect**
- 2: no additional verbal anchor
- 3: no additional verbal anchor
- 4: no additional verbal anchor
- 5: **Completely correct**

### MOS-S: perceived spatial accuracy

Exact question:

> How accurately does the perceived direction match the queried source shown in the scene?

Response options: the integers **1, 2, 3, 4, and 5**.

- 1: **Completely inaccurate**
- 2: no additional verbal anchor
- 3: no additional verbal anchor
- 4: no additional verbal anchor
- 5: **Completely accurate**

### Number of clips and answer controls

- Formal material: five binaurally decoded clips for each of eight anonymised methods, giving **40 formal trials per participant**.
- Additional listening: one volume-setting sample, one left/right channel check, and one unrecorded practice trial.
- Each formal stimulus is approximately five seconds long.
- Participants may pause, resume, and replay the current stimulus as often as needed.
- Participants cannot skip a formal trial because both ratings are required before Continue is enabled.
- Participants may change either rating while the current trial remains open.
- After selecting Save ratings and continue, the current implementation does not provide a Back control and the submitted trial cannot be edited through the participant interface.
- Participants may stop at any time. Browser-local progress is retained for resumption unless they restart the study or clear browser storage.

## 3. Proposed research fields and hosting logs

### Data actively stored by the webpage

While the study is in progress, the prototype stores the following in the participant's browser local storage:

- schema and application version;
- current study phase and current trial number;
- randomly generated session identifier;
- assigned participant code;
- consent timestamp;
- equipment-check completion flags;
- randomisation seed, blinded condition map, and randomised trial plan;
- current incomplete response, completed responses, and completed-break markers;
- study start and completion timestamps.

For each completed formal trial, the browser stores:

- trial number and block number;
- internal method identifier and blinded condition label;
- stimulus, scene, and class-query identifiers;
- media paths used for that trial;
- MOS-C and MOS-S ratings;
- playback count;
- trial-opened, first-played, playback-completed, and submitted timestamps;
- response duration in seconds.

The JSON export additionally contains the configured method list, planned recruitment range, browser user-agent string, browser language, export timestamp, and whether the site was in demonstration mode. The CSV export contains one row per formal trial and the fields shown in `examples/blank-ratings.csv`.

The webpage does **not** request or actively record a participant's name, email address, camera, microphone, voice, precise location, or IP address as research data.

### Technical logs generated by the hosting service

The planned webpage is hosted as a static GitHub Pages site. GitHub states that a visitor's IP address is logged for security purposes when a GitHub Pages site is visited. GitHub's general privacy statement also describes service-usage and website-usage information that may include IP address, device and session information, operating system, application or browser information, request date and time, referring site, pages viewed, and links clicked.

These hosting records are separate from the AV-QTSS research record. They are not written to browser local storage by the study code, do not appear in the study CSV or JSON export, and are not joined to the participant code by this website. Their processing and retention are controlled by GitHub under its privacy terms, rather than by the study interface.

Official hosting references:

- GitHub Pages data collection: <https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection>
- GitHub General Privacy Statement: <https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement>

## 4. Submission, access, retention, and deletion

### Current pre-recruitment prototype

- Research-data submission service: **none**. The page is static and has no server endpoint for receiving ratings.
- Storage during use: the participant's browser local storage.
- Export: the participant or researcher operating that browser may download coded CSV and JSON files at completion.
- Access: someone with access to the same browser profile may see or resume local progress. A researcher can view a downloaded record only after it has been deliberately transferred to them.
- GitHub Pages repository administrators can view the static website code and media, but the static site does not give them access to browser-local ratings.
- Local deletion: selecting Restart deletes the browser-local record for that study. Clearing the site's browser storage also removes it.
- Downloaded-file deletion: downloaded files must be deleted manually from the device and any location to which they were transferred.

### Required before formal recruitment

An institution-approved submission and storage service has not yet been selected. Before recruitment, the protocol and website must identify:

- the approved receiving service and storage location;
- the University data controller and authorised research-team members;
- the secure transfer method;
- the retention period and scheduled deletion date;
- the withdrawal deadline;
- backup handling and deletion procedures.

The assigned participant code is included in both export formats and filenames. A future approved storage process can therefore locate a participant's record by that code and delete the matching primary and backup records, provided the request is made before the approved anonymisation or withdrawal deadline. The participant-code linkage, if any, must be stored separately from the ratings with access restricted to the authorised research team.

## 5. Implemented and planned functionality

### Implemented in the review prototype

- participant-information and six-item consent page;
- assigned-code entry;
- headphone and quiet-room confirmations;
- volume sample and left/right channel check;
- one unrecorded practice trial;
- eight method conditions and five clips per method in configuration;
- method-blind, block-randomised 40-trial plan;
- full-playback requirement before rating;
- MOS-C and MOS-S scales;
- replay, pause, and resume for the current stimulus;
- required responses and prevention of skipped trials;
- break after trial 20;
- browser-local progress and resume;
- coded CSV and JSON export;
- restart and local-progress deletion;
- visible pre-recruitment warning.

### Not yet implemented or finalised

- final approved stimuli for every method and clip;
- final researcher email, supervisor contact, and ethics reference;
- institution-approved research-data submission endpoint;
- central access control, secure storage, backup, retention, and deletion workflow;
- automated participant-code lookup and deletion from central storage;
- final participant information sheet wording, compensation, recruitment text, and inclusion/exclusion criteria;
- formal production testing and activation after ethics approval.

## Screenshots and blank field examples

The accompanying non-participant materials contain no real personal data:

- `ethics/screenshots/01-participant-information.png`
- `ethics/screenshots/02-equipment-check.png`
- `ethics/screenshots/03-rating-interface.png`
- `examples/blank-study-record.json`
- `examples/blank-ratings.csv`
