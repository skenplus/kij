import time
import os
from playwright.sync_api import sync_playwright

def test_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load local file
        file_path = f"file://{os.path.abspath('site/index.html')}"
        page.goto(file_path)

        # Wait for elements
        page.wait_for_selector('.pacman-container')

        # Switch language to EN
        en_btn = page.locator('.lang-btn[data-lang="en"]').first
        en_btn.click()

        time.sleep(1) # wait for animation

        # Take screenshot
        page.screenshot(path='verification.png', full_page=True)
        browser.close()

if __name__ == "__main__":
    test_frontend()
