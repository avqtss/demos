(function () {
  "use strict";

  const MESSAGE_TYPE = "AVQTSS_QUALTRICS_SUBMISSION_V1";
  const ACK_TYPE = "AVQTSS_QUALTRICS_ACK_V1";

  function validateConfiguration(config) {
    if (!config.submission.enabled) {
      throw new Error("Formal submission is disabled in this pre-recruitment prototype.");
    }
    if (config.submission.mode !== "qualtrics-parent-bridge") {
      throw new Error("Unsupported submission mode.");
    }
    if (!config.submission.allowedParentOrigin) {
      throw new Error("The approved Qualtrics parent origin has not been configured.");
    }
    const origin = new URL(config.submission.allowedParentOrigin).origin;
    if (!origin.startsWith("https://")) {
      throw new Error("The Qualtrics parent origin must use HTTPS.");
    }
    if (window.parent === window) {
      throw new Error("Formal submission is available only inside the approved University Qualtrics survey.");
    }
    return origin;
  }

  function submit(record, config) {
    const targetOrigin = validateConfiguration(config);
    const requestId = window.crypto?.randomUUID?.() || `submit-${Date.now()}`;

    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        window.removeEventListener("message", receiveAcknowledgement);
        reject(new Error("The University Qualtrics survey did not acknowledge the submission."));
      }, 15000);

      function receiveAcknowledgement(event) {
        if (event.origin !== targetOrigin || event.source !== window.parent) return;
        if (event.data?.type !== ACK_TYPE || event.data?.requestId !== requestId) return;
        window.clearTimeout(timeout);
        window.removeEventListener("message", receiveAcknowledgement);
        if (event.data.status !== "accepted") {
          reject(new Error(event.data.message || "The University Qualtrics survey rejected the submission."));
          return;
        }
        resolve({
          requestId,
          acknowledgedAt: new Date().toISOString(),
          service: config.submission.service,
          receiptId: event.data.receiptId || null,
        });
      }

      window.addEventListener("message", receiveAcknowledgement);
      window.parent.postMessage({
        type: MESSAGE_TYPE,
        requestId,
        protocolVersion: 1,
        studyId: config.studyId,
        payload: record,
      }, targetOrigin);
    });
  }

  window.AVQTSSSubmissionBridge = {
    messageType: MESSAGE_TYPE,
    acknowledgementType: ACK_TYPE,
    submit,
  };
})();
