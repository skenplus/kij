import pytest
from playwright.sync_api import Page, expect

def test_i18n_translation(page: Page):
    page.goto("http://localhost:3000")

    # Check default language is FR
    expect(page.locator("html")).to_have_attribute("lang", "fr")

    # Check language switcher exists
    expect(page.locator(".lang-switcher")).to_be_visible()

    # Click EN button
    page.click("button[data-lang='en']")

    # Check animation trigger
    expect(page.locator("#vg-overlay")).to_have_class("vg-transition-overlay animating")

    # Wait for language change
    page.wait_for_timeout(700)

    # Check language is EN
    expect(page.locator("html")).to_have_attribute("lang", "en")
