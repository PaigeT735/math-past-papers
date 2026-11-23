/**
 * Client-side search over the formula library.
 * Indexes card titles, tags, summaries, formulas, clues and body text,
 * plus comparison tables. Every query word must match somewhere.
 */
import { PAPERS, FORMULA_SHEET, cardCode } from '../content/index.js';
import { topicById } from '../content/topics.js';
import { methodById } from '../content/methods.js';

/** Turn LaTeX / rich text into lowercase searchable words. */
export function normalise(str) {
  return String(str ?? '')
    .replace(/\\(frac|dfrac|tfrac|left|right|qquad|quad|text|textit|mathcal|mathbb|cdot|big|Big|begin|end|array|cases|hline|le|ge|Rightarrow|Leftrightarrow|Longleftrightarrow|underline|br|max|ln|partial|forall|in|ne|nexists|ldots|approx|times|sqrt|int|propto|gtreqless|to|infty)\b/g, ' ')
    .replace(/\\([a-zA-Z]+)/g, ' $1 ')
    .replace(/[_^{}$\\*]/g, ' ')
    .replace(/[^\p{L}\p{N}\s.-]/gu, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const flat = (v) => (Array.isArray(v) ? v.join(' ') : v ?? '');

let INDEX = null;

const blockText = (b) => [b.heading, flat(b.paras), b.formula, flat(b.list), b.table ? b.table.rows.flat().join(' ') : ''].join(' ');

function build() {
  const entries = [];
  for (const paper of PAPERS) {
    for (const q of paper.questions) {
      for (const part of q.parts) {
        const topics = (part.topics ?? []).map((id) => topicById.get(id)?.label ?? id).join(' ');
        entries.push({
          type: 'part',
          id: part.id,
          section: paper,
          code: `Q${part.label}`,
          title: `Question ${part.label} · ${paper.title}`,
          summary: part.prompt,
          href: `#/papers/${paper.id}/${part.id}`,
          f: {
            title: normalise(`question ${part.label} q${part.label} ${part.type === 'calc' ? 'calculation' : 'essay'}`),
            tags: normalise(topics + ' ' + paper.title + ' ' + paper.short),
            summary: normalise(part.prompt),
            formula: normalise((part.working ?? []).map((x) => (typeof x === 'string' ? x : [x.title, x.why, flat(x.math), x.note].join(' '))).join(' ')),
            clues: normalise(flat(part.tips) + ' ' + (part.approach ?? '') + ' ' + [].concat(part.method ?? []).map((id) => methodById.get(id)?.title ?? '').join(' ')),
            body: normalise((part.answer ?? []).map(blockText).join(' ')),
          },
        });
      }
    }
  }
  FORMULA_SHEET.cards.forEach((card, i) => {
    const body = [flat(card.when), flat(card.traps), (card.forms ?? []).map((f) => `${f.label} ${f.tex}`).join(' '), (card.variables ?? []).map((v) => v.join(' ')).join(' ')].join(' ');
    entries.push({
      type: 'card',
      id: card.id,
      section: FORMULA_SHEET,
      code: cardCode(FORMULA_SHEET, i),
      title: card.title,
      summary: card.summary,
      href: `#/papers/${FORMULA_SHEET.id}/${card.id}`,
      f: {
        title: normalise(card.title),
        tags: normalise((card.tags ?? []).join(' | ')),
        summary: normalise(card.summary),
        formula: normalise(card.formula),
        clues: normalise(flat(card.clues)),
        body: normalise(body),
      },
    });
  });
  return entries;
}

const WEIGHTS = { title: 12, tags: 7, summary: 4, formula: 3, clues: 3, body: 1 };

function matchField(field, token) {
  if (!field) return false;
  if (token.length <= 3) return new RegExp(`(^|\\s|-)${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(field);
  return field.includes(token);
}

export function search(query, limit = 12) {
  if (!INDEX) INDEX = build();
  const tokens = normalise(query).split(' ').filter((tok) => tok && tok !== '-' && tok !== '.');
  if (!tokens.length) return [];

  const results = [];
  for (const entry of INDEX) {
    let score = 0;
    let all = true;
    for (const tok of tokens) {
      let tokScore = 0;
      for (const [field, w] of Object.entries(WEIGHTS)) {
        if (matchField(entry.f[field], tok)) tokScore += w;
      }
      if (!tokScore) { all = false; break; }
      score += tokScore;
    }
    if (!all) continue;
    const q = tokens.join(' ');
    if (entry.f.title.startsWith(q)) score += 10;
    if (entry.f.title === q) score += 10;
    if (entry.type === 'card') score += 1;
    results.push({ entry, score });
  }
  results.sort((a, b) => b.score - a.score || a.entry.section.number - b.entry.section.number);
  return results.slice(0, limit).map((r) => r.entry);
}
