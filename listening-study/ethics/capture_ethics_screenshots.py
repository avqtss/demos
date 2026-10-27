import csv
import json
import os
from collections import Counter
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("AVQTSS_STUDY_URL", "http://127.0.0.1:8770/")
OUTPUT_DIR = Path(__file__).parent / "screenshots"
EVIDENCE_DIR = Path(__file__).parent / "test-evidence"
DOWNLOAD_DIR = EVIDENCE_DIR / "fictional-downloads"
STORAGE_KEY = "avqtss-subjective-study-v2"
FICTIONAL_CODE = "TEST-P0001"


def finish_visible_trial(page, mos_c: int = 3, mos_s: int = 4) -> None:
    """Exercise the post-playback UI without waiting five seconds in every trial."""
    page.locator("#stimulusAudio").evaluate("el => el.dispatchEvent(new Event('ended'))")
    page.locator(f'label[for="mosC-{mos_c}"]').click()
    page.locator(f'label[for="mosS-{mos_s}"]').click()
    page.get_by_role("button", name="Save ratings and continue").click()


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
    for old_file in OUTPUT_DIR.glob("*.png"):
        old_file.unlink()
    for old_file in DOWNLOAD_DIR.iterdir():
        if old_file.is_file():
            old_file.unlink()

    console_errors = []
    request_failures = []
    page_requests = []
    report = {
        "testRecord": "fictional",
        "participantCode": FICTIONAL_CODE,
        "formalSubmission": {
            "attempted": False,
            "result": "NOT RUN - University Qualtrics project is not configured and submission is disabled",
        },
        "checks": {},
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        context = browser.new_context(
            viewport={"width": 1440, "height": 1000},
            device_scale_factor=1,
            accept_downloads=True,
        )
        page = context.new_page()
        page.on("request", lambda request: page_requests.append(request.url))
        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.on(
            "requestfailed",
            lambda request: request_failures.append(f"{request.url}: {request.failure}")
            if "ERR_ABORTED" not in str(request.failure)
            else None,
        )

        page.goto(BASE_URL, wait_until="networkidle")
        page.evaluate("localStorage.clear()")
        page.reload(wait_until="networkidle")

        media_paths = page.evaluate("""
          () => Array.from(new Set([
            ...STUDY_CONFIG.stimuli.flatMap(item => [item.video, item.demoAudio]),
            STUDY_CONFIG.practice.video,
            STUDY_CONFIG.practice.audio,
            STUDY_CONFIG.calibrationAudio,
          ]))
        """)
        media_status = {}
        for media_path in media_paths:
            response = page.request.get(urljoin(BASE_URL, media_path))
            metadata = page.evaluate(
                """async ({url, isVideo}) => new Promise((resolve, reject) => {
                  const element = document.createElement(isVideo ? 'video' : 'audio');
                  const timer = setTimeout(() => reject(new Error(`metadata timeout: ${url}`)), 10000);
                  element.preload = 'metadata';
                  element.onloadedmetadata = () => {
                    clearTimeout(timer);
                    resolve({
                      durationSeconds: element.duration,
                      width: isVideo ? element.videoWidth : null,
                      height: isVideo ? element.videoHeight : null,
                    });
                  };
                  element.onerror = () => {
                    clearTimeout(timer);
                    reject(new Error(`metadata load failed: ${url}`));
                  };
                  element.src = url;
                })""",
                {"url": urljoin(BASE_URL, media_path), "isVideo": media_path.endswith(".mp4")},
            )
            media_status[media_path] = {
                "status": response.status,
                "bytes": len(response.body()),
                "metadata": metadata,
            }
            assert response.ok
            assert media_status[media_path]["bytes"] > 0
            assert 4.9 <= metadata["durationSeconds"] <= 5.1
        report["mediaHttpChecks"] = media_status
        report["checks"]["demoMediaHttp"] = f"PASS - {len(media_status)} unique placeholder media files returned HTTP 200"

        assert "pre-recruitment ethics-review prototype" in page.locator("#prototypeBanner").inner_text().lower()
        assert page.locator('input[name="consent"]').count() == 7
        assert page.locator('input[name="eligibility"]').count() == 1
        assert page.get_by_role("button", name="Continue to equipment check").is_disabled()
        page.screenshot(path=OUTPUT_DIR / "01-participant-information-and-consent.png", full_page=True)

        page.get_by_label("Assigned participant code").fill(FICTIONAL_CODE)
        page.locator('input[name="eligibility"]').check()
        for checkbox in page.locator('input[name="consent"]').all():
            checkbox.check()
        assert page.get_by_role("button", name="Continue to equipment check").is_enabled()
        page.get_by_role("button", name="Continue to equipment check").click()

        stored_consent = page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}')).consent")
        assert stored_consent["formVersion"] == "AVQTSS-CF-v0.2-pre-approval"
        assert len(stored_consent["statementIds"]) == 7
        assert stored_consent["eligibilityConfirmed"] is True
        assert stored_consent["consentedAt"]
        report["checks"]["consent"] = "PASS - seven statements, age confirmation, version, time, and code recorded"
        page.screenshot(path=OUTPUT_DIR / "02-equipment-check.png", full_page=True)

        page.get_by_label("I am wearing headphones and can keep them on for the whole study.").check()
        page.get_by_label("I am in a quiet environment and notifications are silenced.").check()
        page.get_by_role("button", name="Play volume sample").click()
        page.locator("#calibrationResult").get_by_text("Volume sample played").wait_for(timeout=12000)
        page.get_by_role("button", name="Run channel check").click()
        page.locator("#channelResult").get_by_text("Channel check completed").wait_for(timeout=5000)
        page.get_by_role("button", name="Continue to practice").click()

        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 10
        page.screenshot(path=OUTPUT_DIR / "03-practice-before-playback.png", full_page=True)
        page.get_by_role("button", name="Play complete clip").click()
        page.get_by_text("Complete playback registered. Rate both questions or replay the clip.").wait_for(timeout=12000)
        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 0
        page.screenshot(path=OUTPUT_DIR / "04-practice-after-playback.png", full_page=True)
        page.locator('label[for="mosC-4"]').click()
        page.locator('label[for="mosS-4"]').click()
        page.get_by_role("button", name="Finish practice").click()

        page.screenshot(path=OUTPUT_DIR / "05-ready-for-formal-study.png", full_page=True)
        page.get_by_role("button", name="Start formal study").click()

        assert page.get_by_text("Trial 1 of 40").is_visible()
        plan = page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}')).trialPlan")
        method_counts = Counter(trial["methodId"] for trial in plan)
        assert len(plan) == 40
        assert len(method_counts) == 8
        assert set(method_counts.values()) == {5}
        method_names = [method["internalName"] for method in page.evaluate("STUDY_CONFIG.methods")]
        assert not any(name in page.locator("body").inner_text() for name in method_names)
        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 10
        assert page.get_by_role("button", name="Save ratings and continue").is_disabled()
        page.screenshot(path=OUTPUT_DIR / "06-formal-trial-before-playback.png", full_page=True)

        page.get_by_role("button", name="Play complete clip").click()
        page.get_by_text("Complete playback registered. Rate both questions or replay the clip.").wait_for(timeout=12000)
        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 0
        assert page.get_by_role("button", name="Save ratings and continue").is_disabled()
        page.screenshot(path=OUTPUT_DIR / "07-formal-trial-after-playback.png", full_page=True)
        page.locator('label[for="mosC-3"]').click()
        assert page.get_by_role("button", name="Save ratings and continue").is_disabled()
        page.locator('label[for="mosS-4"]').click()
        assert page.get_by_role("button", name="Save ratings and continue").is_enabled()
        page.get_by_role("button", name="Save ratings and continue").click()

        while True:
            state = page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}'))")
            if state["phase"] == "break":
                break
            finish_visible_trial(page)
        assert state["currentTrialIndex"] == 20
        assert len(state["responses"]) == 20
        page.screenshot(path=OUTPUT_DIR / "08-scheduled-break-after-trial-20.png", full_page=True)
        page.get_by_role("button", name="Continue when ready").click()

        while True:
            state = page.evaluate(f"JSON.parse(localStorage.getItem('{STORAGE_KEY}'))")
            if state["phase"] == "complete":
                break
            finish_visible_trial(page)

        assert len(state["responses"]) == 40
        assert state["passedBreaks"] == [20]
        assert page.get_by_role("button", name="Formal submission unavailable").is_disabled()
        assert "No research data has been uploaded" in page.locator(".completion-panel").inner_text()
        page.screenshot(path=OUTPUT_DIR / "09-prototype-complete-not-submitted.png", full_page=True)

        with page.expect_download() as csv_download_info:
            page.get_by_role("button", name="Download fictional test CSV").click()
        csv_target = DOWNLOAD_DIR / "fictional-test-ratings.csv"
        csv_target.write_bytes(Path(csv_download_info.value.path()).read_bytes())

        with page.expect_download() as json_download_info:
            page.get_by_role("button", name="Download fictional test JSON").click()
        json_target = DOWNLOAD_DIR / "fictional-test-record.json"
        json_target.write_bytes(Path(json_download_info.value.path()).read_bytes())

        with csv_target.open(newline="", encoding="utf-8") as handle:
            rows = list(csv.DictReader(handle))
        exported_record = json.loads(json_target.read_text(encoding="utf-8"))
        assert len(rows) == 40
        assert all(row["participant_code"] == FICTIONAL_CODE for row in rows)
        assert exported_record["participantCode"] == FICTIONAL_CODE
        assert exported_record["responseCount"] == 40
        assert exported_record["submissionReceipt"] is None
        report["checks"]["trialPlan"] = "PASS - 40 trials; eight hidden methods occur five times each"
        report["checks"]["playbackAndRatings"] = "PASS - ratings locked before ended event; both ratings required"
        report["checks"]["break"] = "PASS - break shown after formal trial 20"
        report["checks"]["localCompletion"] = "PASS - 40 fictional responses exported; no network submission"

        page.on("dialog", lambda dialog: dialog.accept())
        page.get_by_role("button", name="Delete local test record").click()
        page.wait_for_timeout(200)
        assert page.evaluate(f"localStorage.getItem('{STORAGE_KEY}')") is None
        assert page.get_by_text("Participant information and consent").is_visible()
        report["checks"]["localDeletion"] = "PASS - browser-local fictional record removed"

        browser.close()

    request_origins = sorted({
        f"{urlparse(url).scheme}://{urlparse(url).netloc}"
        for url in page_requests
        if urlparse(url).scheme in {"http", "https"}
    })
    expected_origin = f"{urlparse(BASE_URL).scheme}://{urlparse(BASE_URL).netloc}"
    assert request_origins == [expected_origin]
    report["networkOriginsObserved"] = request_origins
    report["checks"]["noExternalSubmission"] = "PASS - browser requests used only the configured localhost test origin"
    report["consoleErrors"] = console_errors
    report["requestFailures"] = request_failures
    report["result"] = "PASS" if not console_errors and not request_failures else "FAIL"
    (EVIDENCE_DIR / "fictional-lifecycle-test-result.json").write_text(
        json.dumps(report, indent=2) + "\n",
        encoding="utf-8",
    )

    if console_errors:
        raise RuntimeError(f"Browser console errors: {console_errors}")
    if request_failures:
        raise RuntimeError(f"Failed requests: {request_failures}")

    for image in sorted(OUTPUT_DIR.glob("*.png")):
        print(f"{image.name}\t{image.stat().st_size} bytes")
    print(EVIDENCE_DIR / "fictional-lifecycle-test-result.json")


if __name__ == "__main__":
    main()
