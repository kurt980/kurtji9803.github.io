"""Check static site references without requiring Ruby (not a Jekyll build)."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors = []
routes = {}
layouts = {p.stem for p in (ROOT / '_layouts').glob('*.html')}
documents = []
for folder in ('_pages', '_posts', '_portfolio', '_publications', '_talks', '_teaching', '_layouts', '_includes'):
    documents.extend(p for p in (ROOT / folder).rglob('*') if p.is_file() and p.suffix in ('', '.md', '.html'))

for path in documents:
    text = path.read_text(encoding='utf-8-sig')
    frontmatter = re.match(r'^---\s*\n(.*?)\n---', text, re.S)
    if frontmatter:
        for key, value in re.findall(r'^(layout|permalink):\s*(.+)$', frontmatter[1], re.M):
            value = value.strip().strip('\"\'')
            if key == 'layout' and value not in layouts:
                errors.append(f'{path.relative_to(ROOT)}: missing layout {value}')
            if key == 'permalink':
                route = value.rstrip('/') or '/'
                if route in routes:
                    errors.append(f'duplicate route {route}: {routes[route]} and {path.relative_to(ROOT)}')
                routes[route] = path.relative_to(ROOT)
    for target in re.findall(r'{%\s*include\s+([\w./-]+)\s*(?:[^%]*)%}', text):
        if not (ROOT / '_includes' / target.lstrip('/')).is_file():
            errors.append(f'{path.relative_to(ROOT)}: missing include {target}')
    for image in re.findall(r'(?:\.\./images/|/images/)([\w./-]+\.(?:jpg|JPG|png|svg|ico|webp))', text):
        if not (ROOT / 'images' / image).is_file():
            errors.append(f'{path.relative_to(ROOT)}: missing image {image}')

for url in re.findall(r'^\s+url:\s*(/\S+)', (ROOT / '_data/navigation.yml').read_text()):
    if (url.rstrip('/') or '/') not in routes:
        errors.append(f'navigation route has no page: {url}')

for path in (ROOT / '_data/cv.json', ROOT / 'package.json', ROOT / 'images/manifest.json'):
    json.loads(path.read_text(encoding='utf-8'))
manifest = json.loads((ROOT / 'images/manifest.json').read_text())
for icon in manifest['icons']:
    if not (ROOT / 'images' / icon['src']).is_file():
        errors.append(f'missing manifest icon: {icon["src"]}')

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print(f'PASS: {len(documents)} source files; layouts, includes, explicit routes, navigation, images, and JSON.')
