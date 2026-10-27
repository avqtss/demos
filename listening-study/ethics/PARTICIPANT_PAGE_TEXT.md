# Participant-Facing Text

**Status:** exact English copy implemented in application version `2026.10.27-ethics-prototype-3`. Dynamic identifiers, counts, class queries, and completion codes are shown in brackets below.

## Persistent banner and footer

**Pre-recruitment ethics-review prototype**

> No participants have been recruited and no formal ratings have been collected. Do not collect research data until the final stimuli, submission service, data handling, and ethics reference are approved.

Footer:

> Study ID: AVQTSS-MOS-01 · Privacy and withdrawal
> This pre-approval prototype does not submit research data.

## Page 1: Participant information and consent

Eyebrow: **Participant information and consent**

Heading: **Listening Studies of Spatial Audio Generation for Audiovisual and Immersive Media**

> **Proposed task:** AV-QTSS Binaural Listening Study. Content correctness and perceived spatial accuracy.

Prototype notice:

> **Pre-recruitment ethics-review prototype:** this page is not open for participation. No participants have been recruited and no formal ratings have been collected. Any entries made here are fictional test records that remain in this browser unless downloaded.

### Why is the study being done?

> This proposed AV-QTSS task is part of the project *Listening Studies of Spatial Audio Generation for Audiovisual and Immersive Media*. It will evaluate content correctness and perceived spatial accuracy for spatial audio generated from audiovisual scenes. This webpage covers only the AV-QTSS task described here; it does not provide consent for other studies in the wider project.

### Why have I been invited?

> The planned study will recruit 12-20 volunteers aged 18 or over, with an absolute maximum of 20. Participants will need to use headphones and be able to hear the volume and left/right channel checks comfortably.

### What will I do?

> You will first complete a comfortable-volume check, a left/right channel check, and one unscored practice trial. You will then complete 40 formal trials: five five-second clips from each of eight anonymised methods, in random order. On every trial, you will rate content correctness and perceived spatial accuracy on separate 1-5 scales. A break appears after formal trial 20. The full session is expected to take 15-30 minutes.

> You may pause, resume, or replay the current clip. You cannot skip either rating. You may change an answer while the current trial is open, but after selecting **Save ratings and continue** you cannot return to edit that trial.

### Voluntary participation

> Taking part will be voluntary. You may pause or stop during the study at any time without giving a reason. In this prototype, closing the page stops the demonstration and **Restart** deletes its browser-local record.

> The procedure and deadline for withdrawing formally submitted data have not yet been approved. They will be inserted here only after the University submission service, participant-code lookup, primary-storage deletion, and backup handling have been configured and tested. Formal recruitment will not begin before that work is complete.

### Possible risks and benefits

> Listening and viewing for up to 15-30 minutes may cause temporary listening fatigue, eye strain, dizziness, or discomfort. You will control the volume and may pause, take an additional break, or stop. Stop immediately if you experience discomfort or hearing strain. There is no guaranteed personal benefit from taking part.

### Data, confidentiality, and submission

> The proposed study record contains an assigned participant code; consent version, selected statements, and time; two ratings per trial; playback counts; response timing; randomisation information; and limited browser information. This webpage does not request your name, email address, microphone, camera, voice, or precise location. The host may separately create technical access logs, as explained under Privacy and withdrawal.

> The proposed formal receiving service is University of Surrey Qualtrics, followed by transfer to restricted University SharePoint or OneDrive. This has not yet been configured or approved for this study. The server region, retention period, backup handling, and deletion procedure remain to be confirmed. This prototype sends no ratings to Qualtrics or to the research team.

### Funding and review status

> This proposed listening task has no dedicated funding. University of Surrey ethics reference: Pending approval. Recruitment will not open unless approval is granted and the remaining data-handling requirements are completed.

### Contacts

> Researcher: Qingyu Luo (qingyu.luo@surrey.ac.uk)
> Supervisor: Professor Philip Jackson (p.jackson@surrey.ac.uk)

> Questions can be sent to the researcher before deciding whether to participate.

### Consent preview

> **Review only:** selecting these boxes does not enrol you or submit data while this page remains a pre-approval prototype.

Field label: **Assigned participant code**

> Use only a fictional test code on this prototype. Do not enter a name or email address.

Separate required eligibility statement:

> I confirm that I am at least 18 years old.

Heading: **Seven mandatory consent statements**

1. I confirm that I have read and understood the participant information sheet dated 27 October 2026, version AVQTSS-PIS-v0.2-pre-approval, for the above study. I have had the opportunity to consider the information and ask questions, which have been answered satisfactorily.
2. I understand that my participation is voluntary and that I am free to withdraw at any time during the study without giving any reason. I understand that the deadline and procedure for withdrawing data after submission are pending ethics approval and will be stated here before recruitment.
3. I understand that information I provide may be subject to review by responsible individuals from the University of Surrey and/or regulators for monitoring and audit purposes.
4. I understand that information I provide may be used in anonymised research reports, publications, presentations, and research websites.
5. I understand that my participant code and consent record, which link me to the research data, will be kept securely in accordance with data protection guidelines, and only be accessible to the immediate research team or responsible persons at the University.
6. I understand that personal contact details used for recruitment will not be collected by this webpage and will not be shared beyond the study team.
7. I agree to take part in this study.

Button: **Continue to equipment check**

> The consent-form version, participant-information version, selected statement IDs, consent time, age confirmation, and participant code are stored together in the coded session record.

## Page 2: Equipment check

Eyebrow: **Step 1 of 3**
Heading: **Prepare your listening setup**

> Use the same headphones, listening level, and seated position throughout the study.

> Participant code: **[assigned code]**

Required confirmations:

- I am wearing headphones and can keep them on for the whole study.
- I am in a quiet environment and notifications are silenced.

### Comfortable volume

> Play the sample and set a clear, comfortable level. Do not increase the volume later.

Button: **Play volume sample** or **Replay volume sample**
Status: **Not yet played**, **Playing...**, **Volume sample played**, or playback error text.

### Left and right channels

> You should hear one short tone on the left, followed by one on the right.

Button: **Run channel check** or **Repeat channel check**
Status: **Not yet checked**, **Checking...**, **Channel check completed**, or browser error text.

Button: **Continue to practice**

## Page 3: Practice trial

Eyebrow: **Step 2 of 3**
Counter: **Not recorded**
Heading: **Practice trial**
Query: **Class query: [query]**

Panels: **Visual reference: 360° scene** and **Binaural stimulus**.

Before complete playback:

> Ratings unlock after one complete playback.

After complete playback:

> Complete playback registered. Rate both questions or replay the clip.

Playback buttons: **Play complete clip**, **Pause**, **Resume clip**, or **Replay complete clip**.
Counter: **Play count: [number]**

MOS-C:

> How correctly does this clip reproduce only the queried source?

`1` **Completely incorrect**; `2`; `3`; `4`; `5` **Completely correct**.

MOS-S:

> How accurately does the perceived direction match the queried source shown in the scene?

`1` **Completely inaccurate**; `2`; `3`; `4`; `5` **Completely accurate**.

Button: **Finish practice**

## Page 4: Ready page

Eyebrow: **Step 3 of 3**
Heading: **Ready for the formal study**

> You will now complete 40 trials. Method names are hidden, and presentation order is randomised.

> **For every trial:** play the complete clip, rate MOS-C and MOS-S independently, then continue. You may replay a clip. Keep your headphones and volume unchanged.

Button: **Start formal study**

## Page 5: Formal trial template

Eyebrow: **Formal study**
Counter: **[trial number] of 40**
Heading: **Listening trial [trial number]**
Query: **Class query: [query]**

The visual, playback, questions, options, anchors, and playback status text are identical to the practice page. Button: **Save ratings and continue**.

Both questions are required. The button remains disabled until the complete stimulus has played and one value has been selected for each question. There is no Back button after the response is saved.

## Page 6: Scheduled break

Eyebrow: **20 of 40 trials complete**
Heading: **Take a short break**

> Rest your ears and eyes for a moment. Keep the same headphones and do not change the volume.

Button: **Continue when ready**

## Page 7: Prototype completion

Eyebrow: **Fictional test run completed**
Heading: **Prototype complete - no data submitted**

> All 40 formal trials are complete.

### Completion code

> [generated completion code]

> **Submission status:** Pending University account configuration, technical validation, and ethics approval

> **No research data has been uploaded.** The proposed University Qualtrics connection is disabled. Downloads are provided only as fictional ethics-review examples and must not be treated as participant submissions.

Controls:

- **Formal submission unavailable** (disabled)
- **Download fictional test CSV**
- **Download fictional test JSON**
- **Delete local test record**

> The JSON file contains the condition mapping and full audit trail. The CSV contains one row per formal trial. Downloaded copies must be deleted separately.

## Privacy and withdrawal dialog

> **Research data in this prototype:** ratings and progress remain in this browser's local storage. The page can generate local CSV and JSON downloads, but it has no research-data submission endpoint.

> **Hosting logs:** when this page is hosted on GitHub Pages, GitHub receives ordinary web requests and may automatically record technical information such as IP address, request date and time, pages viewed, browser, operating system, device information, and referring page. These service logs are separate from the study record and are not included in the researcher's CSV or JSON export.

> **Proposed formal route:** coded responses would be received by University of Surrey Qualtrics (proposed) and transferred to restricted University of Surrey SharePoint or OneDrive (proposed). The University project, server region, approved retention period, backup handling, and access configuration are not yet confirmed. Formal submission therefore remains disabled.

> **Withdrawal status:** Pending an approved deadline and confirmation of primary-storage and backup deletion procedures. The intended request route is: Email qingyu.luo@surrey.ac.uk and provide the assigned participant code. This will not be presented as an available formal process until it has been approved and tested.

> **Local deletion:** selecting Restart or Delete local test record removes this browser's stored prototype record. It cannot remove files already downloaded, browser backups, or hosting-service logs.
