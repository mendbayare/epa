// node --test scripts/hyphenate.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { tidy, hyphenatePage } from './hyphenate.mjs';

const S = '\u00AD';
const page = (lang, body) => `<html lang="${lang}"><body><p>кнопка операторын</p><div class="prose" data-hyphenate>${body}</div><footer>операторын</footer></body></html>`;

test('short edge fragments merge back into the word', () => {
  assert.equal(tidy(`Ла${S}бо${S}ра${S}то${S}ри`), `Лабо${S}ра${S}тори`);
  assert.equal(tidy(`ав${S}то${S}мат${S}жуу${S}лал${S}тын`), `авто${S}мат${S}жуу${S}лал${S}тын`);
  assert.equal(tidy(`бо${S}лон`), 'болон');
});

test('only the marked element on a Mongolian page is hyphenated', () => {
  const out = hyphenatePage(page('mn-MN', '<p>операторын <a href="/интерфейсийн">интерфейсийн</a></p><div class="footnotes"><p>автоматжуулалтын</p></div><p>практик сургалт</p>'));
  const [before, body, after] = out.split(/data-hyphenate>|<\/div><footer>/);
  assert.ok(!before.includes(S) && !after.includes(S), 'text outside the element is untouched');
  assert.ok(body.includes(`опе${S}ра${S}то${S}рын`));
  assert.ok(body.includes('href="/интерфейсийн"'), 'attributes are untouched');
  assert.ok(body.includes('сур') && out.includes('<footer>'), 'nested </div> does not end the element early');
  assert.ok(body.split('</div>').at(-1).includes(`сур${S}галт`), 'content after a nested div is still hyphenated');
});

test('English pages are left to the browser', () => {
  const html = page('en-US', '<p>операторын</p>');
  assert.equal(hyphenatePage(html), html);
});
