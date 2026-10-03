// Regression checks for theme selection and browsers without Screen Orientation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let savedTheme = null;
let darkPreference = true;
let htmlTheme;
const element = {
  length: 0,
  attr(key, value) {
    if (arguments.length === 1) return htmlTheme;
    htmlTheme = value;
    return this;
  },
  removeAttr() { htmlTheme = undefined; return this; },
  width() { return 0; },
  height() { return 0; },
  hasClass() { return false; },
  is() { return false; },
};
for (const method of ['children', 'removeClass', 'addClass', 'on', 'css']) {
  element[method] = () => element;
}
const context = vm.createContext({
  $: () => element,
  window: { matchMedia: () => ({ matches: darkPreference }) },
  screen: {},
  localStorage: { getItem: () => savedTheme, setItem: (key, value) => { savedTheme = value; } },
});
const source = fs.readFileSync(path.join(root, 'assets/js/_main.js'), 'utf8');
vm.runInContext(source.slice(0, source.indexOf('// Read the Plotly data')), context);
const evaluate = (code) => vm.runInContext(code, context);
assert.equal(evaluate('determineComputedTheme()'), 'dark');
savedTheme = 'system';
evaluate('setTheme()');
assert.equal(htmlTheme, 'dark');
darkPreference = false;
evaluate('setTheme()');
assert.equal(htmlTheme, undefined);
savedTheme = 'dark';
assert.equal(evaluate('determineComputedTheme()'), 'dark');
evaluate('setTheme(); toggleTheme()');
assert.equal(savedTheme, 'light');
assert.equal(htmlTheme, undefined);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/plugins/jquery.greedy-navigation.js'), 'utf8'), context);
console.log('PASS: system theme, explicit theme, toggle, and navigation without Screen Orientation.');
