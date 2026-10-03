// Local visual preview. GitHub Pages still uses Jekyll for the production build.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const YAML = require('yaml');
const sass = require('sass');
const { Liquid } = require('liquidjs');
const { marked } = require('marked');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '.preview');
const port = Number(process.env.PORT || 4173);
const split = (text) => {
  const match = text.match(/^---\r?\n([\s\S]*?)^---[ \t]*\r?\n?/m);
  return match ? { data: YAML.parse(match[1]) || {}, body: text.slice(match[0].length) } : { data: {}, body: text };
};
const read = (file) => split(fs.readFileSync(path.join(root, file), 'utf8'));
const excluded = (file, config) => config.exclude.some(entry => file === entry || file.startsWith(entry + '/'));
const engine = new Liquid({ root: path.join(root, '_includes'), jekyllInclude: true, strictFilters: true });
engine.registerFilter('markdownify', (value) => marked.parse(String(value || '')));
engine.registerFilter('jsonify', (value) => JSON.stringify(value ?? null));
engine.registerFilter('date_to_xmlschema', (value) => new Date(value).toISOString());
engine.registerFilter('relative_url', (value) => config.baseurl + '/' + String(value).replace(/^\//, ''));
const config = YAML.parse(fs.readFileSync(path.join(root, '_config.yml'), 'utf8'));
config.url = `http://localhost:${port}`;
config.time = new Date().toISOString();
config.data = {};
for (const file of fs.readdirSync(path.join(root, '_data'))) {
  if (file.endsWith('.yml')) config.data[path.basename(file, '.yml')] = YAML.parse(fs.readFileSync(path.join(root, '_data', file), 'utf8'));
  if (file.endsWith('.json')) config.data[path.basename(file, '.json')] = JSON.parse(fs.readFileSync(path.join(root, '_data', file), 'utf8'));
}
const pages = [];
for (const folder of ['_pages', '_publications', '_portfolio']) {
  for (const filename of fs.readdirSync(path.join(root, folder))) {
    const file = `${folder}/${filename}`;
    if (!/\.(md|html)$/.test(file) || excluded(file, config)) continue;
    const document = read(file);
    if (document.data.published === false || !Object.keys(document.data).length) continue;
    const collection = folder === '_pages' ? undefined : folder.slice(1);
    const url = document.data.permalink || `/${collection}/${path.basename(filename, path.extname(filename))}/`;
    const defaults = collection ? { layout: 'single', author_profile: true } : { layout: 'single', author_profile: true };
    pages.push({ ...defaults, ...document.data, url, collection, source: file, body: document.body });
  }
}
config.pages = pages.filter(p => !p.collection);
config.publications = pages.filter(p => p.collection === 'publications');
config.portfolio = pages.filter(p => p.collection === 'portfolio');
async function build() {
  fs.mkdirSync(output, { recursive: true });
  for (const folder of ['assets', 'images', 'files']) fs.cpSync(path.join(root, folder), path.join(output, folder), { recursive: true });
  const scss = read('assets/css/main.scss').body;
  fs.writeFileSync(path.join(output, 'assets/css/main.css'), sass.compileString(scss, { loadPaths: [path.join(root, '_sass')], style: 'compressed', logger: { warn() {} } }).css);
  const generated = [];
  for (const page of pages) {
    const scope = { site: config, page, content: '' };
    let content = await engine.parseAndRender(page.body, scope);
    if (page.source.endsWith('.md')) content = marked.parse(content);
    let layout = page.layout;
    const visited = new Set();
    while (layout && layout !== 'compress') {
      if (visited.has(layout)) throw new Error(`Layout cycle: ${layout}`);
      visited.add(layout);
      const wrapper = read(`_layouts/${layout}.html`);
      content = await engine.parseAndRender(wrapper.body, { ...scope, content });
      layout = wrapper.data.layout;
    }
    const relative = page.url.endsWith('/') ? page.url.slice(1) + 'index.html' : page.url.slice(1);
    const target = path.join(output, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
    generated.push(page.url);
    for (const redirect of page.redirect_from || []) {
      const relative = redirect.endsWith('/') ? redirect.slice(1) + 'index.html' : redirect.slice(1);
      const target = path.join(output, relative);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, `<meta http-equiv="refresh" content="0;url=${config.baseurl}${page.url}">`);
    }
  }
  if (generated.some(url => /^\/(cv|resume)/.test(url))) throw new Error('CV route generated');
  console.log(`Rendered ${generated.length} pages; ${config.publications.length} publications; no CV routes.`);
  if (process.argv.includes('--build-only')) return;
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.JPG': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon' };
  http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/') { res.writeHead(302, { Location: config.baseurl + '/' }); return res.end(); }
    if (!pathname.startsWith(config.baseurl + '/')) { res.writeHead(404); return res.end('Not found'); }
    let filename = path.resolve(output, '.' + pathname.slice(config.baseurl.length));
    if (filename !== output && !filename.startsWith(output + path.sep)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');
    if (!fs.existsSync(filename)) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(filename).pipe(res);
  }).listen(port, '127.0.0.1', () => console.log(`Preview: ${config.url}${config.baseurl}/`));
}
build().catch(error => { console.error(error); process.exitCode = 1; });
