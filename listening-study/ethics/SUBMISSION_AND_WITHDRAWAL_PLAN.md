# Proposed Submission and Withdrawal Plan

## Status summary

This is an implementable design, not a claim that a live data service has been approved. The public page currently submits nothing. The University Qualtrics project, region, access policy, retention, and backup handling are pending.

## Proposed formal submission

**Receiving platform:** University of Surrey Qualtrics.
**Service provider:** Qualtrics, LLC under the University's tenancy.
**Primary response location:** the University's Qualtrics tenancy; exact contracted region to be confirmed by the University administrator.
**Analysis/archive location:** restricted University SharePoint or OneDrive.
**Proposed access:** Qingyu Luo and Professor Philip Jackson; responsible University staff or regulators may access records for monitoring/audit where authorised.
**Backups:** Qualtrics documents disaster-recovery backups, but the University's contracted arrangements and deletion timing must be confirmed. University SharePoint/OneDrive backup and recycle-bin behaviour must also be confirmed.
**Export:** coded CSV/JSON through the Qualtrics project, then verified transfer to restricted University storage.
**Retention:** not yet approved; must be entered in Ethics RM and the data management plan before recruitment.

### Technical sequence

1. Participant receives an approved study invitation and assigned code.
2. Participant opens the University Qualtrics study link.
3. Qualtrics loads the AV-QTSS interface from the static GitHub Pages origin.
4. The interface enforces consent, equipment checks, practice, playback, ratings, trial count, and break.
5. After trial 40, the interface passes one versioned coded payload to the configured Qualtrics parent origin. It will not use an API token in client code.
6. The parent validates origin, study ID, code, consent metadata, and exactly 40 responses before writing approved embedded-data fields.
7. Qualtrics finalises the response. Only after server persistence is confirmed should a production page display submission success.
8. The researcher verifies and exports the coded response to restricted University storage according to the approved schedule.

### Required configuration test

Before activation, perform a test with a fictional code through the actual University tenancy and record:

- survey URL and project owner;
- exact parent origin and child origin;
- anonymisation and security settings screenshots;
- response fields stored in Qualtrics;
- server/data-centre region confirmation;
- collaborators and permissions;
- exported file checksum and destination;
- deletion from Qualtrics, recovery window, permanent deletion timing, and backup handling;
- deletion from SharePoint/OneDrive, recycle bins, version history, and managed backups;
- confirmation that no real participant data were used.

## Proposed withdrawal workflow

The final deadline is deliberately not stated because the central deletion test and backup confirmation have not happened.

Once approved, the operational workflow should be:

1. Participant emails `qingyu.luo@surrey.ac.uk` before the published deadline and supplies only their assigned participant code.
2. Researcher logs the request date, code, and action status in the restricted withdrawal log.
3. Researcher filters Qualtrics responses by `avqtss_participant_code`, verifies that exactly one matching record is found, records its response ID, and deletes it.
4. Researcher searches every exported working dataset and analysis copy in the restricted University folder by participant code, removes the matching response, and regenerates derived aggregate files where necessary.
5. Researcher deletes obsolete exported files and follows the approved SharePoint/OneDrive recycle-bin, version-history, and backup procedure.
6. If a separate recruitment linkage exists, the matching code-to-contact entry is deleted when no longer required.
7. Researcher records completion without copying ratings into the withdrawal log and confirms the outcome to the requester.
8. Qualtrics' documented recovery/permanent-deletion interval and University backup ageing are allowed to complete; the participant wording must describe these limits accurately.

### Setting the deadline

The deadline must be late enough for the researcher to perform the search and deletions, but earlier than irreversible de-identification, aggregation, or publication. Ethics RM must approve either a fixed calendar date or a clear interval after submission. The final participant statement must use the approved wording and must not imply selective deletion from immutable disaster-recovery backups if that cannot be done.

## Why formal submission remains blocked

The following values are absent and cannot be safely invented:

- University Qualtrics survey/project identifier and owner;
- approved custom-JavaScript and iframe permission;
- allowed Qualtrics parent origin;
- contracted storage region;
- authorised collaborators and export destination;
- approved retention period;
- executable primary and backup deletion procedure;
- withdrawal cutoff;
- final method-specific stimuli;
- ethics approval reference.

No password, API token, or private key is needed in the repository. The researcher should obtain configuration and approvals through University channels, then provide only non-secret project/origin information for final integration.
