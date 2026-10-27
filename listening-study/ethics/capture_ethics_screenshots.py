from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:8770/"
OUTPUT_DIR = Path(__file__).parent / "screenshots"


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    console_errors = []
    request_failures = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=1)
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
        assert page.locator('input[name="consent"]').count() == 6
        page.screenshot(path=OUTPUT_DIR / "01-participant-information.png", full_page=True)

        for checkbox in page.locator('input[name="consent"]').all():
            checkbox.check()
        page.get_by_role("button", name="Continue to equipment check").click()
        page.get_by_label("Assigned participant code").fill("ETHICS-DEMO")
        page.get_by_label("I am wearing headphones and can keep them on for the whole study.").check()
        page.get_by_label("I am in a quiet environment and notifications are silenced.").check()
        page.screenshot(path=OUTPUT_DIR / "02-equipment-check.png", full_page=True)

        page.get_by_role("button", name="Play volume sample").click()
        page.locator("#calibrationResult").get_by_text("Volume sample played").wait_for(timeout=12000)
        page.get_by_role("button", name="Run channel check").click()
        page.locator("#channelResult").get_by_text("Channel check completed").wait_for(timeout=5000)
        page.get_by_role("button", name="Continue to practice").click()

        page.get_by_role("button", name="Play complete clip").click()
        page.get_by_text("Complete playback registered. Rate both questions or replay the clip.").wait_for(timeout=12000)
        page.locator('label[for="mosC-4"]').click()
        page.locator('label[for="mosS-4"]').click()
        page.get_by_role("button", name="Finish practice").click()
        page.get_by_role("button", name="Start formal study").click()

        assert page.get_by_text("Trial 1 of 40").is_visible()
        plan = page.evaluate("JSON.parse(localStorage.getItem('avqtss-subjective-study-v1')).trialPlan")
        assert len(plan) == 40
        assert {method_id: sum(trial["methodId"] == method_id for trial in plan) for method_id in {trial["methodId"] for trial in plan}} == {
            method_id: 5 for method_id in {trial["methodId"] for trial in plan}
        }
        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 10
        assert page.get_by_role("button", name="Save ratings and continue").is_disabled()
        page.get_by_role("button", name="Play complete clip").click()
        page.get_by_text("Complete playback registered. Rate both questions or replay the clip.").wait_for(timeout=12000)
        assert page.locator('.rating-options input[type="radio"]:disabled').count() == 0
        assert page.locator('.rating-options input[type="radio"]').count() == 10
        assert page.get_by_role("button", name="Save ratings and continue").is_disabled()
        page.screenshot(path=OUTPUT_DIR / "03-rating-interface.png", full_page=True)

        page.locator('label[for="mosC-3"]').click()
        page.locator('label[for="mosS-4"]').click()
        page.get_by_role("button", name="Save ratings and continue").click()
        stored = page.evaluate("JSON.parse(localStorage.getItem('avqtss-subjective-study-v1'))")
        assert stored["currentTrialIndex"] == 1
        assert len(stored["responses"]) == 1
        assert stored["responses"][0]["mosC"] == 3
        assert stored["responses"][0]["mosS"] == 4

        browser.close()

    if console_errors:
        raise RuntimeError(f"Browser console errors: {console_errors}")
    if request_failures:
        raise RuntimeError(f"Failed requests: {request_failures}")

    for image in sorted(OUTPUT_DIR.glob("*.png")):
        print(f"{image.name}\t{image.stat().st_size} bytes")


if __name__ == "__main__":
    main()
