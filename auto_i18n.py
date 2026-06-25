import os
import json
import re
from bs4 import BeautifulSoup
import hashlib
from deep_translator import GoogleTranslator

def get_inner_html(tag):
    return ''.join(str(c) for c in tag.contents).strip()

def has_direct_text(tag):
    # Check if the tag has any string children that contain non-whitespace
    for child in tag.children:
        if isinstance(child, str) and child.strip():
            return True
    return False

def is_translatable(tag):
    # Ignore certain tags entirely
    if tag.name in ['script', 'style', 'br', 'hr', 'meta', 'link', 'svg', 'path', 'img', 'noscript', 'head', 'html', 'body']:
        return False

    # We want tags that contain direct text, AND do not contain block elements
    if not has_direct_text(tag):
        return False

    block_elements = ['div', 'section', 'header', 'footer', 'ul', 'ol', 'table', 'tbody', 'tr', 'nav', 'article', 'aside', 'form', 'main', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li']

    # If the tag itself is a block element and has text, we can translate it if it DOESN'T contain other block elements
    # Or if it's an inline element with text

    for child in tag.children:
        if getattr(child, 'name', None) in block_elements:
            return False

    return True

def process_html_files():
    html_files = [f for f in os.listdir('site') if f.endswith('.html')]
    translations_fr = {}

    for filename in html_files:
        filepath = os.path.join('site', filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        for tag in soup.find_all(True):
            if is_translatable(tag):
                content = get_inner_html(tag)
                # Skip if empty or just numbers/symbols
                if len(content) > 1 and not content.isnumeric() and re.search(r'[a-zA-ZÀ-ÿ]', content):
                    key = "i18n_" + hashlib.md5(content.encode('utf-8')).hexdigest()[:8]
                    tag['data-i18n'] = key
                    translations_fr[key] = content

        # Add script for i18n
        if not soup.find('script', src='js/i18n.js'):
            if soup.body:
                script_tag = soup.new_tag('script', src='js/i18n.js')
                soup.body.append(script_tag)

        # Also need to add the language switcher and animation container
        # We can do this manually later or inject it here. Let's do it manually later or just inject basic.

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(str(soup))

    with open('site/js/fr.json', 'w', encoding='utf-8') as f:
        json.dump(translations_fr, f, ensure_ascii=False, indent=2)

    print(f"Extracted {len(translations_fr)} strings.")

    # Translate
    print("Translating to English...")
    translations_en = {}
    translator = GoogleTranslator(source='fr', target='en')

    # Batch translation to speed up
    keys = list(translations_fr.keys())
    values = [translations_fr[k] for k in keys]

    # Since values might have HTML tags, google translate might mess them up,
    # but for simple inline tags it usually handles them okay. Let's try.
    # To be safer, we can translate individually or in small batches

    for i, (k, v) in enumerate(translations_fr.items()):
        # Quick and dirty translation, in real life we might want to handle HTML tags properly
        # For this test we will just use deep_translator
        try:
            # Strip tags for translation? No, we need them for formatting.
            translated = translator.translate(v)
            if translated:
                # Basic fix for some common HTML issues after translation
                translated = translated.replace('<br>', '<br />').replace('</ br>', '<br />')
                translations_en[k] = translated
            else:
                translations_en[k] = v
        except Exception as e:
            print(f"Error translating {k}: {e}")
            translations_en[k] = v

        if (i+1) % 50 == 0:
            print(f"Translated {i+1}/{len(keys)}")

    with open('site/js/en.json', 'w', encoding='utf-8') as f:
        json.dump(translations_en, f, ensure_ascii=False, indent=2)
    print("Done!")

process_html_files()
