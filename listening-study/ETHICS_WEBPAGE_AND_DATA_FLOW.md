# AV-QTSS Ethics-Review Web Pack

**Document status:** pre-recruitment review material, 27 October 2026

**Participant-information version:** AVQTSS-PIS-v0.2-pre-approval

**Consent-form version:** AVQTSS-CF-v0.2-pre-approval
**Application version:** 2026.10.27-ethics-prototype-3

No participant has been recruited through this page and no formal rating has been collected. All test evidence uses the fictional code `TEST-P0001`.

## Entry points

- Review URL: <https://avqtss.github.io/demos/listening-study/>
- Code repository: <https://github.com/avqtss/demos/tree/main/listening-study>
- Comprehensive handover: [`ethics/ETHICS_REVIEW_HANDOVER.md`](ethics/ETHICS_REVIEW_HANDOVER.md)
- Exact participant-facing text: [`ethics/PARTICIPANT_PAGE_TEXT.md`](ethics/PARTICIPANT_PAGE_TEXT.md)
- Data dictionary: [`ethics/DATA_DICTIONARY.md`](ethics/DATA_DICTIONARY.md)
- Proposed submission and withdrawal process: [`ethics/SUBMISSION_AND_WITHDRAWAL_PLAN.md`](ethics/SUBMISSION_AND_WITHDRAWAL_PLAN.md)
- Implementation status: [`ethics/IMPLEMENTATION_STATUS.md`](ethics/IMPLEMENTATION_STATUS.md)

## Current and proposed data flows

Current deployed prototype:

```text
Browser -> browser localStorage
        -> optional fictional CSV/JSON download

No ratings -> GitHub repository
No ratings -> researcher
No ratings -> Qualtrics
```

Proposed formal route, not yet configured or approved:

```text
University Qualtrics survey
  embeds the static AV-QTSS interface
    -> coded payload passed to the Qualtrics parent survey
      -> University Qualtrics response store
        -> restricted University SharePoint/OneDrive export
```

The webpage-side bridge is implemented but disabled. A University Qualtrics project, approved parent origin, administrator confirmation, retention settings, access controls, deletion procedure, and full end-to-end test are still required. The public page therefore fails closed and displays `Formal submission unavailable`.

## Evidence

- Nine flow screenshots: [`ethics/screenshots/`](ethics/screenshots/)
- Blank CSV and JSON: [`examples/`](examples/)
- Fictional lifecycle result: [`ethics/test-evidence/fictional-lifecycle-test-result.json`](ethics/test-evidence/fictional-lifecycle-test-result.json)
- Placeholder-media audit: [`ethics/test-evidence/placeholder-media-audit.json`](ethics/test-evidence/placeholder-media-audit.json)

The formal Qualtrics submit/delete test is explicitly `NOT RUN` because no University project has been configured. The browser-local completion, export, and deletion test passed using only fictional data.
