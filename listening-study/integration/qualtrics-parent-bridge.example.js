/*
 * REVIEW-ONLY EXAMPLE. This is not deployed and contains no credentials.
 * A University Qualtrics administrator must confirm that custom JavaScript and
 * the payload size are permitted before this is adapted for the live survey.
 * The Qualtrics survey remains responsible for persisting and finalising the
 * response after acknowledging the embedded AV-QTSS page.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
  "use strict";

  const CHILD_ORIGIN = "https://avqtss.github.io";
  const MESSAGE_TYPE = "AVQTSS_QUALTRICS_SUBMISSION_V1";
  const ACK_TYPE = "AVQTSS_QUALTRICS_ACK_V1";
  const studyFrame = document.querySelector("iframe[data-avqtss-study]");

  window.addEventListener("message", function (event) {
    if (event.origin !== CHILD_ORIGIN) return;
    if (!studyFrame || event.source !== studyFrame.contentWindow) return;
    if (event.data?.type !== MESSAGE_TYPE || event.data?.studyId !== "AVQTSS-MOS-01") return;

    const record = event.data.payload;
    if (!record || record.responseCount !== 40 || !record.participantCode) return;

    // Field names and maximum lengths must be approved in the University project.
    Qualtrics.SurveyEngine.setEmbeddedData("avqtss_participant_code", record.participantCode);
    Qualtrics.SurveyEngine.setEmbeddedData("avqtss_consent_version", record.consent?.formVersion || "");
    Qualtrics.SurveyEngine.setEmbeddedData("avqtss_payload_json", JSON.stringify(record));

    event.source.postMessage({
      type: ACK_TYPE,
      requestId: event.data.requestId,
      status: "accepted",
      // This acknowledges transfer into the survey page, not final server persistence.
      receiptId: null,
    }, CHILD_ORIGIN);
  });
});
