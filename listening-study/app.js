(function () {
  "use strict";

  const config = window.STUDY_CONFIG;
  const app = document.getElementById("app");
  const stepStatus = document.getElementById("stepStatus");
  const resetButton = document.getElementById("resetButton");
  const prototypeBanner = document.getElementById("prototypeBanner");
  const protocolDialog = document.getElementById("protocolDialog");
  const privacyDialog = document.getElementById("privacyDialog");

  let state = createInitialState();
  let savedState = loadSavedState();
  let activeAudio = null;
  let channelAudioContext = null;

  validateConfig();
  initialiseChrome();
  render();

  function createInitialState() {
    return {
      schemaVersion: config.schemaVersion,
      appVersion: config.appVersion,
      phase: "consent",
      sessionId: createSessionId(),
      participantCode: "",
      consent: {
        formVersion: config.consentForm.version,
        formDate: config.consentForm.date,
        participantInformationVersion: config.participantInformation.version,
        participantInformationDate: config.participantInformation.date,
        statementIds: [],
        eligibilityConfirmed: false,
        consentedAt: null,
      },
      setup: {
        quietConfirmed: false,
        headphonesConfirmed: false,
        calibrationPlayed: false,
        channelsChecked: false,
      },
      randomisationSeed: null,
      blindMap: null,
      trialPlan: [],
      currentTrialIndex: 0,
      responses: [],
      draft: null,
      practiceDraft: null,
      passedBreaks: [],
      startedAt: null,
      completedAt: null,
      submissionReceipt: null,
    };
  }

  function createSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function validateConfig() {
    const errors = [];
    if (config.methods.length !== 8) {
      errors.push("The paper protocol requires exactly eight methods.");
    }
    if (config.stimuli.length !== 5) {
      errors.push("The paper protocol requires exactly five clips per method.");
    }
    const methodIds = new Set(config.methods.map((method) => method.id));
    if (methodIds.size !== config.methods.length) {
      errors.push("Method IDs must be unique.");
    }
    if (!config.demoMode) {
      config.stimuli.forEach((stimulus) => {
        config.methods.forEach((method) => {
          if (!stimulus.audioByMethod || !stimulus.audioByMethod[method.id]) {
            errors.push(`Missing formal audio for ${stimulus.id} / ${method.id}.`);
          }
        });
      });
    }
    if (errors.length) {
      throw new Error(errors.join(" "));
    }
  }

  function initialiseChrome() {
    document.getElementById("institutionName").textContent = config.institution;
    document.getElementById("studyName").textContent = config.title;
    document.getElementById("footerStudyId").textContent = `Study ID: ${config.studyId}`;
    document.getElementById("plannedParticipants").textContent = `${config.plannedRecruitment.minimum}-${config.plannedRecruitment.maximum} adults, maximum ${config.plannedRecruitment.maximum}`;
    document.getElementById("plannedDuration").textContent = `${config.estimatedMinutes} minutes`;
    document.title = config.title;
    prototypeBanner.classList.toggle("hidden", !config.demoMode);

    document.getElementById("protocolButton").addEventListener("click", () => protocolDialog.showModal());
    document.getElementById("closeProtocolButton").addEventListener("click", () => protocolDialog.close());
    document.getElementById("privacyButton").addEventListener("click", showPrivacyDialog);
    document.getElementById("closePrivacyButton").addEventListener("click", () => privacyDialog.close());
    resetButton.addEventListener("click", restartStudy);

    [protocolDialog, privacyDialog].forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    });
  }

  function render() {
    stopMedia();
    resetButton.classList.toggle("hidden", state.phase === "consent" || state.phase === "complete");
    const renders = {
      consent: renderConsent,
      setup: renderSetup,
      practice: renderPractice,
      ready: renderReady,
      test: renderTest,
      break: renderBreak,
      complete: renderComplete,
    };
    const renderer = renders[state.phase] || renderConsent;
    renderer();
    app.focus({ preventScroll: true });
  }

  function setStep(label) {
    stepStatus.textContent = label;
  }

  function renderConsent() {
    setStep("Participant information");
    const resumeMarkup = savedState && savedState.phase !== "consent" && savedState.phase !== "complete"
      ? `
        <div class="resume-panel">
          <h2>Saved session available</h2>
          <p>Participant code <strong>${escapeHtml(savedState.participantCode || "not entered")}</strong> has completed ${savedState.responses?.length || 0} of 40 formal trials.</p>
          <div class="button-row">
            <button class="primary-button" id="resumeButton" type="button">Resume saved session</button>
            <button class="secondary-button" id="discardSavedButton" type="button">Discard saved session</button>
          </div>
        </div>`
      : "";

    app.innerHTML = `
      <div class="page-heading">
        <p class="eyebrow">Participant information and consent</p>
        <h1>${escapeHtml(config.projectTitle)}</h1>
        <p class="lead"><strong>Proposed task:</strong> ${escapeHtml(config.title)}. ${escapeHtml(config.subtitle)}.</p>
      </div>
      ${config.demoMode ? '<div class="notice-panel warning"><p><strong>Pre-recruitment ethics-review prototype:</strong> this page is not open for participation. No participants have been recruited and no formal ratings have been collected. Any entries made here are fictional test records that remain in this browser unless downloaded.</p></div>' : ''}
      ${resumeMarkup}
      <div class="two-column">
        <div class="information-sections">
          <section>
            <h2>Why is the study being done?</h2>
            <p>This proposed AV-QTSS task is part of the project <em>${escapeHtml(config.projectTitle)}</em>. It will evaluate content correctness and perceived spatial accuracy for spatial audio generated from audiovisual scenes. This webpage covers only the AV-QTSS task described here; it does not provide consent for other studies in the wider project.</p>
          </section>
          <section>
            <h2>Why have I been invited?</h2>
            <p>The planned study will recruit ${config.plannedRecruitment.minimum}-${config.plannedRecruitment.maximum} volunteers aged ${config.minimumAge} or over, with an absolute maximum of ${config.plannedRecruitment.maximum}. Participants will need to use headphones and be able to hear the volume and left/right channel checks comfortably.</p>
          </section>
          <section>
            <h2>What will I do?</h2>
            <p>You will first complete a comfortable-volume check, a left/right channel check, and one unscored practice trial. You will then complete 40 formal trials: five five-second clips from each of eight anonymised methods, in random order. On every trial, you will rate content correctness and perceived spatial accuracy on separate 1-5 scales. A break appears after formal trial 20. The full session is expected to take ${config.estimatedMinutes} minutes.</p>
            <p>You may pause, resume, or replay the current clip. You cannot skip either rating. You may change an answer while the current trial is open, but after selecting <strong>Save ratings and continue</strong> you cannot return to edit that trial.</p>
          </section>
          <section>
            <h2>Voluntary participation</h2>
            <p>Taking part will be voluntary. You may pause or stop during the study at any time without giving a reason. In this prototype, closing the page stops the demonstration and <strong>Restart</strong> deletes its browser-local record.</p>
            <p>The procedure and deadline for withdrawing formally submitted data have not yet been approved. They will be inserted here only after the University submission service, participant-code lookup, primary-storage deletion, and backup handling have been configured and tested. Formal recruitment will not begin before that work is complete.</p>
          </section>
          <section>
            <h2>Possible risks and benefits</h2>
            <p>Listening and viewing for up to ${config.estimatedMinutes} minutes may cause temporary listening fatigue, eye strain, dizziness, or discomfort. You will control the volume and may pause, take an additional break, or stop. Stop immediately if you experience discomfort or hearing strain. There is no guaranteed personal benefit from taking part.</p>
          </section>
          <section>
            <h2>Data, confidentiality, and submission</h2>
            <p>The proposed study record contains an assigned participant code; consent version, selected statements, and time; two ratings per trial; playback counts; response timing; randomisation information; and limited browser information. This webpage does not request your name, email address, microphone, camera, voice, or precise location. The host may separately create technical access logs, as explained under Privacy and withdrawal.</p>
            <p>The proposed formal receiving service is University of Surrey Qualtrics, followed by transfer to restricted University SharePoint or OneDrive. This has not yet been configured or approved for this study. The server region, retention period, backup handling, and deletion procedure remain to be confirmed. This prototype sends no ratings to Qualtrics or to the research team.</p>
          </section>
          <section>
            <h2>Funding and review status</h2>
            <p>This proposed listening task has ${escapeHtml(config.funding).toLowerCase()}. University of Surrey ethics reference: ${escapeHtml(config.ethicsReference)}. Recruitment will not open unless approval is granted and the remaining data-handling requirements are completed.</p>
          </section>
          <section>
            <h2>Contacts</h2>
            <p>Researcher: ${escapeHtml(config.researcher.name)} (<a href="mailto:${escapeAttribute(config.researcher.email)}">${escapeHtml(config.researcher.email)}</a>)<br>Supervisor: ${escapeHtml(config.researcher.supervisor)} (<a href="mailto:${escapeAttribute(config.researcher.supervisorEmail)}">${escapeHtml(config.researcher.supervisorEmail)}</a>)</p>
            <p>Questions can be sent to the researcher before deciding whether to participate.</p>
          </section>
        </div>

        <form class="consent-form" id="consentForm">
          <h2>Consent preview</h2>
          <p class="fine-print"><strong>Review only:</strong> selecting these boxes does not enrol you or submit data while this page remains a pre-approval prototype.</p>
          <div class="form-field">
            <label for="participantCode">Assigned participant code</label>
            <input id="participantCode" name="participantCode" type="text" maxlength="32" autocomplete="off" spellcheck="false" value="${escapeHtml(state.participantCode)}" placeholder="e.g. TEST-P0001">
            <div class="field-hint">Use only a fictional test code on this prototype. Do not enter a name or email address.</div>
          </div>
          <div class="check-list">
            <label class="check-row eligibility-row"><input type="checkbox" id="ageConfirmed" name="eligibility" value="age"><span>I confirm that I am at least ${config.minimumAge} years old.</span></label>
            <div class="consent-divider">Seven mandatory consent statements</div>
            ${config.consentForm.statements.map((statement, index) => `<label class="check-row"><input type="checkbox" name="consent" value="${escapeAttribute(statement.id)}"><span><strong>${index + 1}.</strong> ${escapeHtml(statement.text)}</span></label>`).join("")}
          </div>
          <button class="primary-button" id="consentContinue" type="submit" disabled>Continue to equipment check</button>
          <p class="fine-print">The consent-form version, participant-information version, selected statement IDs, consent time, age confirmation, and participant code are stored together in the coded session record.</p>
        </form>
      </div>`;

    const form = document.getElementById("consentForm");
    const consentBoxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    const continueButton = document.getElementById("consentContinue");
    const updateConsentButton = () => {
      const code = document.getElementById("participantCode").value.trim();
      continueButton.disabled = code.length < 3 || !consentBoxes.every((box) => box.checked);
    };
    form.addEventListener("change", updateConsentButton);
    document.getElementById("participantCode").addEventListener("input", updateConsentButton);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const code = document.getElementById("participantCode").value.trim();
      if (code.length < 3 || !consentBoxes.every((box) => box.checked)) return;
      state.participantCode = code;
      state.consent = {
        formVersion: config.consentForm.version,
        formDate: config.consentForm.date,
        participantInformationVersion: config.participantInformation.version,
        participantInformationDate: config.participantInformation.date,
        statementIds: config.consentForm.statements.map((statement) => statement.id),
        eligibilityConfirmed: true,
        consentedAt: new Date().toISOString(),
      };
      state.phase = "setup";
      saveState();
      render();
    });

    document.getElementById("resumeButton")?.addEventListener("click", () => {
      state = normaliseState(savedState);
      savedState = null;
      render();
    });
    document.getElementById("discardSavedButton")?.addEventListener("click", () => {
      clearSavedState();
      savedState = null;
      render();
    });
  }

  function renderSetup() {
    setStep("Equipment check");
    app.innerHTML = `
      <div class="page-heading">
        <p class="eyebrow">Step 1 of 3</p>
        <h1>Prepare your listening setup</h1>
        <p class="lead">Use the same headphones, listening level, and seated position throughout the study.</p>
      </div>
      <form class="setup-form" id="setupForm">
        <p class="participant-code-summary">Participant code: <strong>${escapeHtml(state.participantCode)}</strong></p>

        <div class="check-list">
          <label class="check-row"><input id="headphonesConfirmed" type="checkbox" ${state.setup.headphonesConfirmed ? "checked" : ""}><span>I am wearing headphones and can keep them on for the whole study.</span></label>
          <label class="check-row"><input id="quietConfirmed" type="checkbox" ${state.setup.quietConfirmed ? "checked" : ""}><span>I am in a quiet environment and notifications are silenced.</span></label>
        </div>

        <div class="equipment-checks">
          <section class="equipment-check">
            <h3>Comfortable volume</h3>
            <p>Play the sample and set a clear, comfortable level. Do not increase the volume later.</p>
            <button class="secondary-button" id="calibrationButton" type="button">Play volume sample</button>
            <div class="check-result" id="calibrationResult">${state.setup.calibrationPlayed ? "Volume sample played" : "Not yet played"}</div>
          </section>
          <section class="equipment-check">
            <h3>Left and right channels</h3>
            <p>You should hear one short tone on the left, followed by one on the right.</p>
            <button class="secondary-button" id="channelButton" type="button">Run channel check</button>
            <div class="check-result" id="channelResult">${state.setup.channelsChecked ? "Channel check completed" : "Not yet checked"}</div>
          </section>
        </div>

        <div class="button-row">
          <button class="primary-button" id="practiceButton" type="submit" disabled>Continue to practice</button>
        </div>
        <div class="error-message hidden" id="setupError" role="alert"></div>
      </form>`;

    document.getElementById("calibrationButton").addEventListener("click", playCalibration);
    document.getElementById("channelButton").addEventListener("click", playChannelCheck);
    document.getElementById("headphonesConfirmed").addEventListener("change", updateSetupContinueButton);
    document.getElementById("quietConfirmed").addEventListener("change", updateSetupContinueButton);
    updateSetupContinueButton();
    document.getElementById("setupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      state.setup.headphonesConfirmed = document.getElementById("headphonesConfirmed").checked;
      state.setup.quietConfirmed = document.getElementById("quietConfirmed").checked;
      const missing = [];
      if (!state.setup.headphonesConfirmed) missing.push("Confirm that you are wearing headphones.");
      if (!state.setup.quietConfirmed) missing.push("Confirm that the room is quiet.");
      if (!state.setup.calibrationPlayed) missing.push("Play the volume sample.");
      if (!state.setup.channelsChecked) missing.push("Complete the left/right channel check.");
      if (missing.length) {
        const error = document.getElementById("setupError");
        error.textContent = missing.join(" ");
        error.classList.remove("hidden");
        saveState();
        return;
      }
      state.phase = "practice";
      state.practiceDraft = newDraft("practice");
      saveState();
      render();
    });
  }

  function playCalibration() {
    stopMedia();
    const button = document.getElementById("calibrationButton");
    activeAudio = new Audio(config.calibrationAudio);
    activeAudio.volume = 0.45;
    button.disabled = true;
    button.textContent = "Playing…";
    activeAudio.addEventListener("ended", () => {
      state.setup.calibrationPlayed = true;
      button.disabled = false;
      button.textContent = "Replay volume sample";
      document.getElementById("calibrationResult").textContent = "Volume sample played";
      updateSetupContinueButton();
      saveState();
    }, { once: true });
    activeAudio.play().catch(() => {
      button.disabled = false;
      button.textContent = "Play volume sample";
      document.getElementById("calibrationResult").textContent = "Playback was blocked. Select the button again.";
    });
  }

  async function playChannelCheck() {
    const button = document.getElementById("channelButton");
    button.disabled = true;
    button.textContent = "Checking…";
    try {
      channelAudioContext = channelAudioContext || new (window.AudioContext || window.webkitAudioContext)();
      await channelAudioContext.resume();
      const now = channelAudioContext.currentTime;
      scheduleChannelTone(channelAudioContext, now + 0.05, -1);
      scheduleChannelTone(channelAudioContext, now + 0.72, 1);
      window.setTimeout(() => {
        state.setup.channelsChecked = true;
        button.disabled = false;
        button.textContent = "Repeat channel check";
        document.getElementById("channelResult").textContent = "Channel check completed";
        updateSetupContinueButton();
        saveState();
      }, 1450);
    } catch (error) {
      button.disabled = false;
      button.textContent = "Run channel check";
      document.getElementById("channelResult").textContent = "Channel check could not start in this browser.";
    }
  }

  function scheduleChannelTone(context, startTime, pan) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const panner = context.createStereoPanner();
    oscillator.frequency.value = 520;
    panner.pan.value = pan;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
    gain.gain.setValueAtTime(0.08, startTime + 0.32);
    gain.gain.linearRampToValueAtTime(0, startTime + 0.42);
    oscillator.connect(gain).connect(panner).connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.45);
  }

  function updateSetupContinueButton() {
    const button = document.getElementById("practiceButton");
    if (!button) return;
    const ready = document.getElementById("headphonesConfirmed").checked
      && document.getElementById("quietConfirmed").checked
      && state.setup.calibrationPlayed
      && state.setup.channelsChecked;
    button.disabled = !ready;
  }

  function renderPractice() {
    setStep("Practice trial");
    const draft = state.practiceDraft || newDraft("practice");
    state.practiceDraft = draft;
    renderListeningPage({
      heading: "Practice trial",
      eyebrow: "Step 2 of 3",
      counter: "Not recorded",
      query: config.practice.query,
      video: config.practice.video,
      audio: config.practice.audio,
      draft,
      practice: true,
    });
  }

  function renderReady() {
    setStep("Ready to begin");
    app.innerHTML = `
      <div class="page-heading">
        <p class="eyebrow">Step 3 of 3</p>
        <h1>Ready for the formal study</h1>
        <p class="lead">You will now complete 40 trials. Method names are hidden, and presentation order is randomised.</p>
      </div>
      <div class="notice-panel">
        <p><strong>For every trial:</strong> play the complete clip, rate MOS-C and MOS-S independently, then continue. You may replay a clip. Keep your headphones and volume unchanged.</p>
      </div>
      <div class="button-row">
        <button class="primary-button" id="startStudyButton" type="button">Start formal study</button>
      </div>`;
    document.getElementById("startStudyButton").addEventListener("click", () => {
      initialiseTrialPlan();
      state.phase = "test";
      state.startedAt = state.startedAt || new Date().toISOString();
      state.draft = newDraft(state.trialPlan[0].trialId);
      saveState();
      render();
    });
  }

  function renderTest() {
    const total = state.trialPlan.length;
    const index = state.currentTrialIndex;
    if (!total || index >= total) {
      finishStudy();
      return;
    }
    setStep(`Trial ${index + 1} of ${total}`);
    const trial = state.trialPlan[index];
    if (!state.draft || state.draft.trialId !== trial.trialId) {
      state.draft = newDraft(trial.trialId);
    }
    renderListeningPage({
      heading: `Listening trial ${index + 1}`,
      eyebrow: "Formal study",
      counter: `${index + 1} of ${total}`,
      query: trial.query,
      video: trial.video,
      audio: trial.audio,
      draft: state.draft,
      practice: false,
    });
  }

  function renderListeningPage(options) {
    const completed = options.practice ? 0 : state.currentTrialIndex;
    const total = options.practice ? 1 : state.trialPlan.length;
    const progress = options.practice ? 0 : Math.round((completed / total) * 100);
    const locked = !options.draft.listenedToEnd;
    app.innerHTML = `
      <div class="study-progress">
        <div class="progress-meta"><span>${escapeHtml(options.eyebrow)}</span><span>${escapeHtml(options.counter)}</span></div>
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
      </div>
      <div class="trial-heading">
        <h1>${escapeHtml(options.heading)}</h1>
        <div class="query-line">Class query:<span class="query-value">${escapeHtml(options.query)}</span></div>
      </div>
      <div class="stimulus-grid">
        <section class="visual-reference">
          <div class="panel-label">Visual reference: 360° scene</div>
          <video id="sceneVideo" src="${escapeAttribute(options.video)}" preload="metadata" muted playsinline aria-label="360-degree visual reference"></video>
        </section>
        <section class="playback-panel">
          <div class="panel-label">Binaural stimulus</div>
          <div class="playback-body">
            <button class="media-button" id="playStimulusButton" type="button">${options.draft.listenedToEnd ? "Replay complete clip" : "Play complete clip"}</button>
            <div class="media-progress-track" aria-hidden="true"><div class="media-progress-fill" id="mediaProgress"></div></div>
            <p class="playback-state" id="playbackState">${options.draft.listenedToEnd ? "Complete playback registered. You may rate or replay." : "Ratings unlock after one complete playback."}</p>
            <div class="status-copy">Play count: <span id="playCount">${options.draft.playCount}</span></div>
          </div>
        </section>
      </div>

      <div class="rating-grid" id="ratingGrid">
        ${ratingPanel("mosC", "MOS-C", "How correctly does this clip reproduce only the queried source?", "Completely incorrect", "Completely correct", options.draft.mosC, locked)}
        ${ratingPanel("mosS", "MOS-S", "How accurately does the perceived direction match the queried source shown in the scene?", "Completely inaccurate", "Completely accurate", options.draft.mosS, locked)}
      </div>
      <div class="trial-actions">
        <button class="primary-button" id="submitRatingButton" type="button" ${canSubmitDraft(options.draft) ? "" : "disabled"}>${options.practice ? "Finish practice" : "Save ratings and continue"}</button>
      </div>
      <audio id="stimulusAudio" src="${escapeAttribute(options.audio)}" preload="auto"></audio>`;

    initialiseTrialMedia(options);
    attachRatingListeners(options);
  }

  function ratingPanel(name, title, question, low, high, selected, locked) {
    const choices = [1, 2, 3, 4, 5].map((value) => `
      <div class="rating-choice">
        <input id="${name}-${value}" type="radio" name="${name}" value="${value}" ${selected === value ? "checked" : ""} ${locked ? "disabled" : ""}>
        <label for="${name}-${value}">${value}</label>
      </div>`).join("");
    return `
      <section class="rating-panel" id="${name}Panel" aria-disabled="${locked}">
        <h2>${title}</h2>
        <p class="rating-question">${question}</p>
        <fieldset class="rating-options" aria-label="${title} rating from 1 to 5">${choices}</fieldset>
        <div class="rating-anchors"><span>1 · ${low}</span><span>5 · ${high}</span></div>
      </section>`;
  }

  function initialiseTrialMedia(options) {
    const audio = document.getElementById("stimulusAudio");
    const video = document.getElementById("sceneVideo");
    const button = document.getElementById("playStimulusButton");
    const progress = document.getElementById("mediaProgress");
    const playbackState = document.getElementById("playbackState");
    activeAudio = audio;

    button.addEventListener("click", async () => {
      if (!audio.paused && !audio.ended) {
        audio.pause();
        video.pause();
        button.textContent = "Resume clip";
        playbackState.textContent = "Playback paused. Resume and listen to the end before rating.";
        return;
      }
      if (audio.ended || audio.currentTime >= audio.duration - 0.05) {
        audio.currentTime = 0;
        video.currentTime = 0;
      }
      options.draft.playCount += 1;
      options.draft.firstPlayedAt = options.draft.firstPlayedAt || new Date().toISOString();
      document.getElementById("playCount").textContent = String(options.draft.playCount);
      button.textContent = "Pause";
      playbackState.textContent = "Playing. Keep facing forward and listen through headphones.";
      try {
        await Promise.all([audio.play(), video.play()]);
      } catch (error) {
        audio.pause();
        video.pause();
        button.textContent = "Play complete clip";
        playbackState.textContent = "Playback was blocked. Select Play again.";
      }
      saveState();
    });

    audio.addEventListener("timeupdate", () => {
      const ratio = audio.duration ? Math.min(1, audio.currentTime / audio.duration) : 0;
      progress.style.width = `${ratio * 100}%`;
      if (!video.paused && Math.abs(video.currentTime - audio.currentTime) > 0.25) {
        video.currentTime = audio.currentTime;
      }
    });

    audio.addEventListener("ended", () => {
      video.pause();
      options.draft.listenedToEnd = true;
      options.draft.completedPlaybackAt = new Date().toISOString();
      progress.style.width = "100%";
      button.textContent = "Replay complete clip";
      playbackState.textContent = "Complete playback registered. Rate both questions or replay the clip.";
      unlockRatings(options.draft);
      saveState();
    });

    audio.addEventListener("error", () => {
      playbackState.textContent = "This stimulus could not be loaded. Tell the researcher and do not rate this trial.";
      button.disabled = true;
    });
  }

  function unlockRatings(draft) {
    document.querySelectorAll('.rating-options input[type="radio"]').forEach((input) => {
      input.disabled = false;
    });
    document.querySelectorAll(".rating-panel").forEach((panel) => panel.setAttribute("aria-disabled", "false"));
    updateSubmitButton(draft);
  }

  function attachRatingListeners(options) {
    document.querySelectorAll('.rating-options input[type="radio"]').forEach((input) => {
      input.addEventListener("change", () => {
        options.draft[input.name] = Number(input.value);
        options.draft.lastRatingAt = new Date().toISOString();
        updateSubmitButton(options.draft);
        saveState();
      });
    });
    document.getElementById("submitRatingButton").addEventListener("click", () => {
      if (!canSubmitDraft(options.draft)) return;
      if (options.practice) {
        state.practiceDraft = null;
        state.phase = "ready";
      } else {
        submitFormalTrial();
      }
      saveState();
      render();
    });
  }

  function updateSubmitButton(draft) {
    const button = document.getElementById("submitRatingButton");
    if (button) button.disabled = !canSubmitDraft(draft);
  }

  function canSubmitDraft(draft) {
    return Boolean(draft?.listenedToEnd && draft.mosC && draft.mosS);
  }

  function newDraft(trialId) {
    return {
      trialId,
      openedAt: new Date().toISOString(),
      firstPlayedAt: null,
      completedPlaybackAt: null,
      lastRatingAt: null,
      playCount: 0,
      listenedToEnd: false,
      mosC: null,
      mosS: null,
    };
  }

  function initialiseTrialPlan() {
    if (state.trialPlan.length === config.methods.length * config.stimuli.length) return;
    const randomArray = new Uint32Array(1);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(randomArray);
    state.randomisationSeed = randomArray[0] || Math.floor(Math.random() * 4294967295);
    const rng = mulberry32(state.randomisationSeed);

    const methodsForLabels = shuffled(config.methods, rng);
    state.blindMap = Object.fromEntries(methodsForLabels.map((method, index) => [method.id, `System ${String.fromCharCode(65 + index)}`]));
    const clipOrders = Object.fromEntries(config.methods.map((method) => [method.id, shuffled(config.stimuli, rng)]));
    const trials = [];
    let previousMethodId = null;

    for (let block = 0; block < config.stimuli.length; block += 1) {
      let methodOrder = shuffled(config.methods, rng);
      if (methodOrder[0].id === previousMethodId && methodOrder.length > 1) {
        methodOrder = methodOrder.slice(1).concat(methodOrder[0]);
      }
      methodOrder.forEach((method) => {
        const stimulus = clipOrders[method.id][block];
        trials.push({
          trialId: `${String(trials.length + 1).padStart(2, "0")}-${method.id}-${stimulus.id}`,
          block: block + 1,
          methodId: method.id,
          anonymousCondition: state.blindMap[method.id],
          stimulusId: stimulus.id,
          sceneId: stimulus.sceneId,
          query: stimulus.query,
          video: stimulus.video,
          audio: resolveStimulusAudio(stimulus, method.id),
        });
      });
      previousMethodId = methodOrder[methodOrder.length - 1].id;
    }
    state.trialPlan = trials;
    state.currentTrialIndex = 0;
    state.responses = [];
    state.passedBreaks = [];
  }

  function resolveStimulusAudio(stimulus, methodId) {
    return stimulus.audioByMethod?.[methodId] || stimulus.demoAudio;
  }

  function submitFormalTrial() {
    const trial = state.trialPlan[state.currentTrialIndex];
    const draft = state.draft;
    state.responses.push({
      ...trial,
      mosC: draft.mosC,
      mosS: draft.mosS,
      playCount: draft.playCount,
      openedAt: draft.openedAt,
      firstPlayedAt: draft.firstPlayedAt,
      completedPlaybackAt: draft.completedPlaybackAt,
      submittedAt: new Date().toISOString(),
      responseSeconds: secondsBetween(draft.openedAt, new Date().toISOString()),
    });
    state.currentTrialIndex += 1;
    state.draft = null;

    if (state.currentTrialIndex >= state.trialPlan.length) {
      finishStudy();
      return;
    }
    const breakDue = config.breakAfterTrials.includes(state.currentTrialIndex)
      && !state.passedBreaks.includes(state.currentTrialIndex);
    state.phase = breakDue ? "break" : "test";
    if (!breakDue) {
      state.draft = newDraft(state.trialPlan[state.currentTrialIndex].trialId);
    }
  }

  function renderBreak() {
    setStep("Scheduled break");
    app.innerHTML = `
      <section class="break-panel">
        <p class="eyebrow">${state.currentTrialIndex} of ${state.trialPlan.length} trials complete</p>
        <h1>Take a short break</h1>
        <p>Rest your ears and eyes for a moment. Keep the same headphones and do not change the volume.</p>
        <button class="primary-button" id="continueAfterBreak" type="button">Continue when ready</button>
      </section>`;
    document.getElementById("continueAfterBreak").addEventListener("click", () => {
      state.passedBreaks.push(state.currentTrialIndex);
      state.phase = "test";
      state.draft = newDraft(state.trialPlan[state.currentTrialIndex].trialId);
      saveState();
      render();
    });
  }

  function finishStudy() {
    state.phase = "complete";
    state.completedAt = state.completedAt || new Date().toISOString();
    state.draft = null;
    saveState();
    render();
  }

  function renderComplete() {
    setStep(config.demoMode ? "Prototype complete" : "Ready to submit");
    const completionCode = `${config.studyId}-${state.sessionId.slice(0, 8).toUpperCase()}`;
    const submissionMarkup = config.submission.enabled
      ? `<button class="primary-button" id="submitStudyButton" type="button">Submit coded ratings securely</button>`
      : `<button class="primary-button" type="button" disabled>Formal submission unavailable</button>`;
    const prototypeTools = config.demoMode
      ? `<button class="secondary-button" id="downloadCsvButton" type="button">Download fictional test CSV</button>
          <button class="secondary-button" id="downloadJsonButton" type="button">Download fictional test JSON</button>
          <button class="danger-button" id="deleteLocalRecordButton" type="button">Delete local test record</button>`
      : "";
    app.innerHTML = `
      <div class="page-heading">
        <p class="eyebrow">${config.demoMode ? "Fictional test run completed" : "All ratings completed"}</p>
        <h1>${config.demoMode ? "Prototype complete - no data submitted" : "Review and submit"}</h1>
        <p class="lead">All ${state.responses.length} formal trials are complete.</p>
      </div>
      <section class="completion-panel">
        <h2>Completion code</h2>
        <div class="completion-code">${escapeHtml(completionCode)}</div>
        <p><strong>Submission status:</strong> <span id="submissionStatus">${state.submissionReceipt ? "Submission acknowledged" : escapeHtml(config.submission.status)}</span></p>
        ${config.demoMode ? `<div class="notice-panel warning compact"><p><strong>No research data has been uploaded.</strong> The proposed University Qualtrics connection is disabled. Downloads are provided only as fictional ethics-review examples and must not be treated as participant submissions.</p></div>` : ""}
        <div class="button-row">
          ${submissionMarkup}
          ${prototypeTools}
        </div>
        <div class="error-message hidden" id="submissionError" role="alert"></div>
        <p class="fine-print">The JSON file contains the condition mapping and full audit trail. The CSV contains one row per formal trial. Downloaded copies must be deleted separately.</p>
      </section>`;
    document.getElementById("submitStudyButton")?.addEventListener("click", submitStudyRecord);
    document.getElementById("downloadCsvButton")?.addEventListener("click", downloadCsv);
    document.getElementById("downloadJsonButton")?.addEventListener("click", downloadJson);
    document.getElementById("deleteLocalRecordButton")?.addEventListener("click", deleteLocalRecord);
  }

  async function submitStudyRecord() {
    const button = document.getElementById("submitStudyButton");
    const status = document.getElementById("submissionStatus");
    const error = document.getElementById("submissionError");
    button.disabled = true;
    status.textContent = "Submitting to the approved University survey...";
    error.classList.add("hidden");
    try {
      state.submissionReceipt = await window.AVQTSSSubmissionBridge.submit(buildStudyRecord(), config);
      status.textContent = "Submission acknowledged by the University survey";
      button.textContent = "Submitted";
      saveState();
    } catch (submissionError) {
      status.textContent = "Submission not completed";
      error.textContent = submissionError.message;
      error.classList.remove("hidden");
      button.disabled = false;
    }
  }

  function downloadCsv() {
    const columns = [
      "study_id", "app_version", "participant_code", "session_id",
      "consent_form_version", "participant_information_version", "consented_at",
      "trial_number", "block",
      "anonymous_condition", "method_id", "stimulus_id", "scene_id", "query",
      "mos_c", "mos_s", "play_count", "response_seconds", "submitted_at",
    ];
    const rows = state.responses.map((response, index) => ({
      study_id: config.studyId,
      app_version: config.appVersion,
      participant_code: state.participantCode,
      session_id: state.sessionId,
      consent_form_version: state.consent.formVersion,
      participant_information_version: state.consent.participantInformationVersion,
      consented_at: state.consent.consentedAt,
      trial_number: index + 1,
      block: response.block,
      anonymous_condition: response.anonymousCondition,
      method_id: response.methodId,
      stimulus_id: response.stimulusId,
      scene_id: response.sceneId,
      query: response.query,
      mos_c: response.mosC,
      mos_s: response.mosS,
      play_count: response.playCount,
      response_seconds: response.responseSeconds,
      submitted_at: response.submittedAt,
    }));
    const csv = [columns.join(",")]
      .concat(rows.map((row) => columns.map((column) => csvValue(row[column])).join(",")))
      .join("\n");
    downloadBlob(csv, `${safeFilePart(state.participantCode)}_${config.studyId}_ratings.csv`, "text/csv;charset=utf-8");
  }

  function downloadJson() {
    downloadBlob(JSON.stringify(buildStudyRecord(), null, 2), `${safeFilePart(state.participantCode)}_${config.studyId}_record.json`, "application/json");
  }

  function buildStudyRecord() {
    return {
      schemaVersion: config.schemaVersion,
      appVersion: config.appVersion,
      studyId: config.studyId,
      demoMode: config.demoMode,
      participantCode: state.participantCode,
      sessionId: state.sessionId,
      consent: state.consent,
      startedAt: state.startedAt,
      completedAt: state.completedAt,
      randomisationSeed: state.randomisationSeed,
      blindMap: state.blindMap,
      methods: config.methods,
      plannedRecruitment: config.plannedRecruitment,
      responseCount: state.responses.length,
      responses: state.responses,
      userAgent: navigator.userAgent,
      language: navigator.language,
      submissionReceipt: state.submissionReceipt,
      recordGeneratedAt: new Date().toISOString(),
    };
  }

  function downloadBlob(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function showPrivacyDialog() {
    document.getElementById("privacyDialogContent").innerHTML = `
      <p><strong>Research data in this prototype:</strong> ratings and progress remain in this browser's local storage. The page can generate local CSV and JSON downloads, but it has no research-data submission endpoint.</p>
      <p><strong>Hosting logs:</strong> when this page is hosted on GitHub Pages, GitHub receives ordinary web requests and may automatically record technical information such as IP address, request date and time, pages viewed, browser, operating system, device information, and referring page. These service logs are separate from the study record and are not included in the researcher's CSV or JSON export.</p>
      <p><strong>Proposed formal route:</strong> coded responses would be received by ${escapeHtml(config.submission.service)} and transferred to ${escapeHtml(config.submission.archiveStorage)}. The University project, server region, approved retention period, backup handling, and access configuration are not yet confirmed. Formal submission therefore remains disabled.</p>
      <p><strong>Withdrawal status:</strong> ${escapeHtml(config.withdrawal.status)}. The intended request route is: ${escapeHtml(config.withdrawal.participantRoute)}. This will not be presented as an available formal process until it has been approved and tested.</p>
      <p><strong>Local deletion:</strong> selecting Restart or Delete local test record removes this browser's stored prototype record. It cannot remove files already downloaded, browser backups, or hosting-service logs.</p>`;
    privacyDialog.showModal();
  }

  function deleteLocalRecord() {
    const confirmed = window.confirm("Delete this fictional test record from browser local storage? Downloaded files will not be deleted.");
    if (!confirmed) return;
    stopMedia();
    clearSavedState();
    state = createInitialState();
    savedState = null;
    render();
  }

  function restartStudy() {
    const confirmed = window.confirm("Restart the study and delete all locally saved progress for this session?");
    if (!confirmed) return;
    stopMedia();
    clearSavedState();
    state = createInitialState();
    savedState = null;
    render();
  }

  function stopMedia() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
    }
    const video = document.getElementById("sceneVideo");
    if (video) video.pause();
  }

  function saveState() {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(state));
    } catch (error) {
      // The test remains usable if local storage is unavailable.
    }
  }

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(config.storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.schemaVersion !== config.schemaVersion) return null;
      return normaliseState(parsed);
    } catch (error) {
      return null;
    }
  }

  function normaliseState(candidate) {
    const fresh = createInitialState();
    return {
      ...fresh,
      ...candidate,
      setup: { ...fresh.setup, ...(candidate.setup || {}) },
      consent: { ...fresh.consent, ...(candidate.consent || {}) },
      responses: Array.isArray(candidate.responses) ? candidate.responses : [],
      trialPlan: Array.isArray(candidate.trialPlan) ? candidate.trialPlan : [],
      passedBreaks: Array.isArray(candidate.passedBreaks) ? candidate.passedBreaks : [],
    };
  }

  function clearSavedState() {
    try {
      localStorage.removeItem(config.storageKey);
    } catch (error) {
      // No action required.
    }
  }

  function secondsBetween(start, end) {
    return Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 100) / 10);
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    let value = seed || hashString(state.sessionId);
    return function random() {
      value |= 0;
      value = (value + 0x6d2b79f5) | 0;
      let result = Math.imul(value ^ (value >>> 15), 1 | value);
      result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, rng) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const target = Math.floor(rng() * (index + 1));
      [copy[index], copy[target]] = [copy[target], copy[index]];
    }
    return copy;
  }

  function csvValue(value) {
    const text = value == null ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  }

  function safeFilePart(value) {
    return String(value || "participant").replace(/[^a-z0-9_-]+/gi, "_");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }
})();
