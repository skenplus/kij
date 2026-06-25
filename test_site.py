from playwright.sync_api import sync_playwright
import time

def test_translation():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000')
        print(page.title())
        page.click('text="EN"')
        time.sleep(2) # wait for animation
        print(page.title())
        browser.close()

if __name__ == '__main__':
    test_translation()
