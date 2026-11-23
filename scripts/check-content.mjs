#!/usr/bin/env node
/**
 * Content check: renders every formula and rich-text string with KaTeX
 * (throwing on errors) and validates ids and cross-links.
 *
 *   npm install   (once, installs KaTeX for this script only)
 *   npm run check
 */
import katex from 'katex';
import { KATEX_MACROS, prepTex } from '../src/lib/katex-options.js';

// rich.js expects window.katex in the browser
globalThis.window = { katex };
const { segments } = await import('../src/lib/rich.js');
const { PAPERS, FORMULA_SHEET } = await import('../src/content/index.js');
const { topicById } = await import('../src/content/topics.js');
const { METHODS, methodById } = await import('../src/content/methods.js');
const SECTIONS = [FORMULA_SHEET];

const errors = [];
let rendered = 0;

function render(src, display, where) {
  try {
    katex.renderToString(prepTex(src), { displayMode: display, throwOnError: true, strict: (code) => (['unknownSymbol', 'symbolNotInFont'].includes(code) ? 'ignore' : 'error'), macros: { ...KATEX_MACROS } });
    rendered += 1;
  } catch (err) {
    errors.push(`${where}: ${err.message}\n    source: ${src}`);
  }
}

function checkRich(str, where) {
  if (str == null) return;
  if (typeof str !== 'string') {
    errors.push(`${where}: expected a string, got ${typeof str}`);
    return;
  }
  const dollarCount = (str.match(/\$/g) || []).length;
  if (dollarCount % 2 !== 0) errors.push(`${where}: unbalanced $ delimiters`);
  for (const seg of segments(str)) {
    if (seg.type === 'inline') render(seg.value, false, where);
    if (seg.type === 'display') render(seg.value, true, where);
  }
}

const ids = new Set();
const sectionIds = new Set();
const allRelated = [];

for (const section of SECTIONS) {
  const s = section.id;
  if (sectionIds.has(s)) errors.push(`Duplicate section id ${s}`);
  sectionIds.add(s);
  for (const key of ['id', 'title', 'short', 'accent', 'summary']) {
    if (section[key] == null) errors.push(`Section ${s}: missing ${key}`);
  }
  checkRich(section.summary, `${s}.summary`);
  section.method?.steps.forEach((step, i) => checkRich(step, `${s}.method[${i}]`));

  for (const card of section.cards) {
    const w = `${s}/${card.id}`;
    if (ids.has(card.id)) errors.push(`Duplicate card id ${card.id}`);
    ids.add(card.id);
    for (const key of ['id', 'title', 'summary', 'formula']) {
      if (!card[key]) errors.push(`${w}: missing ${key}`);
    }
    render(card.formula, true, `${w}.formula`);
    checkRich(card.summary, `${w}.summary`);
    (card.forms ?? []).forEach((f, i) => {
      checkRich(f.label, `${w}.forms[${i}].label`);
      render(f.tex, true, `${w}.forms[${i}].tex`);
    });
    (card.variables ?? []).forEach(([sym, meaning], i) => {
      render(sym, false, `${w}.variables[${i}]`);
      checkRich(meaning, `${w}.variables[${i}].meaning`);
    });
    [].concat(card.when ?? []).forEach((p, i) => checkRich(p, `${w}.when[${i}]`));
    for (const key of ['clues', 'assumptions', 'traps']) {
      (card[key] ?? []).forEach((p, i) => checkRich(p, `${w}.${key}[${i}]`));
    }
    if (card.example) {
      checkRich(card.example.given, `${w}.example.given`);
      card.example.steps.forEach((p, i) => checkRich(p, `${w}.example.steps[${i}]`));
      checkRich(card.example.answer, `${w}.example.answer`);
    }
    (card.related ?? []).forEach((r) => allRelated.push([w, r]));
  }

  for (const table of section.tables ?? []) {
    const w = `${s}/table:${table.id}`;
    if (ids.has(table.id)) errors.push(`Duplicate id ${table.id}`);
    ids.add(table.id);
    checkRich(table.caption, `${w}.caption`);
    table.columns.forEach((c, i) => checkRich(c, `${w}.columns[${i}]`));
    table.rows.forEach((row, r) => {
      if (row.length !== table.columns.length) errors.push(`${w}: row ${r} has ${row.length} cells, expected ${table.columns.length}`);
      row.forEach((cell, c) => checkRich(cell, `${w}.rows[${r}][${c}]`));
    });
  }
}

// ---- Past papers ----
const formulaIds = new Set(FORMULA_SHEET.cards.map((c) => c.id));
let parts = 0;
for (const paper of PAPERS) {
  if (sectionIds.has(paper.id)) errors.push(`Duplicate section id ${paper.id}`);
  sectionIds.add(paper.id);
  checkRich(paper.summary, `${paper.id}.summary`);
  checkRich(paper.timing, `${paper.id}.timing`);
  for (const q of paper.questions) {
    for (const part of q.parts) {
      parts += 1;
      const w = `${paper.id}/${part.id}`;
      if (ids.has(part.id)) errors.push(`Duplicate id ${part.id}`);
      ids.add(part.id);
      for (const key of ['id', 'label', 'type', 'prompt']) if (part[key] == null) errors.push(`${w}: missing ${key}`);
      if (!['essay', 'calc'].includes(part.type)) errors.push(`${w}: type must be 'essay' or 'calc'`);
      checkRich(part.prompt, `${w}.prompt`);
      checkRich(part.approach, `${w}.approach`);
      checkRich(part.result, `${w}.result`);
      (part.given ?? []).forEach(([k, v], i) => { checkRich(k, `${w}.given[${i}]`); checkRich(v, `${w}.given[${i}]`); });
      (part.working ?? []).forEach((x, i) => {
        if (typeof x === 'string') return checkRich(x, `${w}.working[${i}]`);
        checkRich(x.title, `${w}.working[${i}].title`);
        checkRich(x.why, `${w}.working[${i}].why`);
        checkRich(x.note, `${w}.working[${i}].note`);
        [].concat(x.math ?? []).forEach((m) => render(m, true, `${w}.working[${i}].math`));
      });
      (part.tips ?? []).forEach((x, i) => checkRich(x, `${w}.tips[${i}]`));
      (part.answer ?? []).forEach((b, i) => {
        [].concat(b.paras ?? []).forEach((x) => checkRich(x, `${w}.answer[${i}].paras`));
        (b.list ?? []).forEach((x) => (typeof x === 'string' ? checkRich(x, `${w}.answer[${i}].list`) : [x.label, ...x.items].forEach((y) => checkRich(y, `${w}.answer[${i}].list`))));
        if (b.formula) render(b.formula, true, `${w}.answer[${i}].formula`);
        b.table?.rows.flat().forEach((x) => checkRich(x, `${w}.answer[${i}].table`));
      });
      (part.topics ?? []).forEach((tp) => { if (!topicById.has(tp)) errors.push(`${w}: unknown topic "${tp}" (add it to topics.js)`); });
      (part.formulas ?? []).forEach((f) => { if (!formulaIds.has(f)) errors.push(`${w}: unknown formula card "${f}"`); });
      const methods = [].concat(part.method ?? []);
      if (!methods.length) errors.push(`${w}: missing method (add a standard method id from content/methods.js)`);
      methods.forEach((m) => { if (!methodById.has(m)) errors.push(`${w}: unknown method "${m}" (add it to content/methods.js)`); });
    }
  }
}

// ---- Standard methods ----
const methodIds = new Set();
for (const m of METHODS) {
  const w = `method:${m.id}`;
  if (methodIds.has(m.id)) errors.push(`Duplicate method id ${m.id}`);
  methodIds.add(m.id);
  for (const key of ['id', 'title', 'when', 'steps']) if (m[key] == null) errors.push(`${w}: missing ${key}`);
  checkRich(m.title, `${w}.title`);
  checkRich(m.when, `${w}.when`);
  checkRich(m.setup, `${w}.setup`);
  checkRich(m.check, `${w}.check`);
  if (m.shortcut) render(m.shortcut, true, `${w}.shortcut`);
  (m.traps ?? []).forEach((x, i) => checkRich(x, `${w}.traps[${i}]`));
  (m.steps ?? []).forEach((st, i) => {
    checkRich(st.title, `${w}.steps[${i}].title`);
    checkRich(st.how, `${w}.steps[${i}].how`);
    [].concat(st.math ?? []).forEach((x) => render(x, true, `${w}.steps[${i}].math`));
  });
}

// ---- Trends guide ----
const { GUIDE } = await import('../src/content/index.js');
for (const sec of GUIDE.sections) {
  (sec.blocks ?? []).forEach((b, i) => {
    const w = `guide/${sec.id}[${i}]`;
    [].concat(b.paras ?? []).forEach((x) => checkRich(x, `${w}.paras`));
    (b.list ?? []).forEach((x) => (typeof x === 'string' ? checkRich(x, `${w}.list`) : [x.label, ...x.items].forEach((y) => checkRich(y, `${w}.list`))));
    if (b.formula) render(b.formula, true, `${w}.formula`);
    b.table?.columns.forEach((x) => checkRich(x, `${w}.table`));
    b.table?.rows.flat().forEach((x) => checkRich(x, `${w}.table`));
  });
}

for (const [from, to] of allRelated) {
  if (!ids.has(to)) errors.push(`${from}: related link to unknown id "${to}"`);
}

const cards = SECTIONS.reduce((n, s) => n + s.cards.length, 0);
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n`);
  errors.forEach((e) => console.error('  • ' + e));
  process.exit(1);
}
console.log(`✓ ${PAPERS.length} paper(s), ${parts} question parts, ${cards} formula cards, ${METHODS.length} standard methods, ${rendered} maths expressions rendered without errors. All links resolve.`);
