"""Check local HTML output, including internal links and the no-CV requirement."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / '.preview'
BASE = '/kurtji9803.github.io'
errors = []

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1':
            self.h1 += 1
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                errors.append(f'duplicate ID: {attrs["id"]}')
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.links.append(attrs[key])
        if tag == 'img' and not attrs.get('alt'):
            errors.append('image without descriptive alt text')

documents = {}
for file in ROOT.rglob('*.html'):
    page = Page()
    source = file.read_text(encoding='utf-8')
    page.feed(source)
    if '{{' in source or '{%' in source:
        errors.append(f'unrendered Liquid: {file.relative_to(ROOT)}')
    if '<!doctype' in source.lower() and page.h1 != 1:
        errors.append(f'{file.relative_to(ROOT)}: expected one H1, got {page.h1}')
    if any(token in source.lower() for token in ('github university', 'paper title number', 'nothing to see here')):
        errors.append(f'template content: {file.relative_to(ROOT)}')
    documents[file] = page

for file, page in documents.items():
    for link in page.links:
        parts = urlsplit(link)
        if parts.scheme in ('mailto', 'tel') or (parts.hostname and parts.hostname not in ('localhost', '127.0.0.1')):
            continue
        uri = unquote(parts.path)
        if any(part in ('cv', 'cv-json', 'resume', 'resume-json') for part in uri.split('/')):
            errors.append(f'CV link: {file.relative_to(ROOT)} -> {link}')
        if uri.startswith(BASE + '/'):
            target = ROOT / uri[len(BASE):].lstrip('/')
        elif uri.startswith('/'):
            errors.append(f'link outside configured baseurl: {link}')
            continue
        elif uri:
            target = file.parent / uri
        else:
            target = file
        if target.is_dir():
            target /= 'index.html'
        if not target.exists():
            errors.append(f'broken local link: {file.relative_to(ROOT)} -> {link}')
        if parts.fragment and target in documents and parts.fragment not in documents[target].ids:
            errors.append(f'broken anchor: {link}')

for directory in ('cv', 'cv-json', 'resume', 'resume-json'):
    if (ROOT / directory).exists():
        errors.append(f'CV route exists: {directory}')
if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print(f'PASS: {len(documents)} HTML files; local links, anchors, image descriptions, headings, and no CV routes.')
