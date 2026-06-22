from playwright.sync_api import sync_playwright
import os

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        url = "file://" + os.path.abspath("site/index.html")
        page.goto(url)

        # Check initial state (FR)
        print(f"Page title: {page.title()}")
        assert "KIJ" in page.title()

        hero_text = page.locator("h1").inner_text()
        print(f"Initial Hero Text (FR): {hero_text}")
        assert "L'IA au service de" in hero_text

        # Click the 'EN' button
        print("Switching to EN...")
        page.locator("button[data-lang='en']").first.click()

        # Wait for the change to take effect
        page.wait_for_timeout(500)

        hero_text_en = page.locator("h1").inner_text()
        print(f"Hero Text after switch (EN): {hero_text_en}")
        assert "AI at the service of" in hero_text_en

        # Check game canvas exists
        canvas_count = page.locator("#gameCanvas").count()
        print(f"Game canvas count: {canvas_count}")
        assert canvas_count == 1

        print("All tests passed successfully!")
        browser.close()

if __name__ == "__main__":
    run_tests()
