/** Formula card: headline formula always visible, details expandable. */
import { rich, tex, escapeHtml } from '../lib/rich.js';
import { icons } from '../lib/icons.js';
import { cardIndex, cardCode } from '../content/index.js';

const paras = (v) => [].concat(v ?? []).map((p) => `<p>${rich(p)}</p>`).join('');
const list = (items) => `<ul class="list">${items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul>`;
const label = (text, hint = '') => `<h4 class="block__label">${text}${hint ? `<span class="block__hint">${hint}</span>` : ''}</h4>`;

function formsBlock(forms) {
  if (!forms?.length) return '';
  const rows = forms
    .map((f) => `<div class="form-row"><div class="form-row__label">${rich(f.label)}</div><div class="form-row__tex">${tex(f.tex, true)}</div></div>`)
    .join('');
  return `<section class="block block--forms">${label('Other ways to write it', 'rearrangements, special cases, shortcuts')}<div class="forms">${rows}</div></section>`;
}

function variablesBlock(vars) {
  if (!vars?.length) return '';
  const rows = vars.map(([sym, meaning]) => `<dt>${tex(sym)}</dt><dd>${rich(meaning)}</dd>`).join('');
  return `<section class="block block--vars">${label('What the symbols mean')}<dl class="vars">${rows}</dl></section>`;
}

function exampleBlock(ex) {
  if (!ex) return '';
  return `<section class="block block--example">${label('Worked example', 'illustrative numbers')}
    <div class="example">
      ${ex.given ? `<div class="example__given"><span class="example__given-label">Given</span>${rich(ex.given)}</div>` : ''}
      <ol class="example__steps">${ex.steps.map((s) => `<li><div>${rich(s)}</div></li>`).join('')}</ol>
      ${ex.answer ? `<div class="example__answer"><span class="example__answer-label">Answer</span><span>${rich(ex.answer)}</span></div>` : ''}
    </div>
  </section>`;
}

function relatedBlock(ids) {
  const links = (ids ?? [])
    .map((id) => cardIndex.get(id))
    .filter(Boolean)
    .map(({ card, section }) => `<a href="#/papers/${section.id}/${card.id}" data-accent="${section.accent}"><i></i>${escapeHtml(card.title)}</a>`)
    .join('');
  return links ? `<div class="related"><span class="related__label">Related</span>${links}</div>` : '';
}

export function renderCard(card, section, index) {
  const code = cardCode(section, index);
  const level = card.level === 'extension' ? 'extension' : 'core';
  const onPaper = card.paper?.length ? 'true' : 'false';

  const badges = [
    card.paper?.length ? `<span class="badge badge--paper" title="Used in the practice paper">Paper ${card.paper.join(' · ')}</span>` : '',
    level === 'extension' ? `<span class="badge badge--ext" title="Related material that goes beyond the practice paper">Beyond the paper</span>` : '',
  ].join('');

  const hints = [card.forms?.length && 'other forms', card.variables?.length && 'symbols', card.clues?.length && 'exam clues', card.example && 'worked example']
    .filter(Boolean)
    .join(' · ');

  const whenBlock = card.when ? `<section class="block block--when">${label('When to use it')}<div class="block__lead">${paras(card.when)}</div></section>` : '';
  const pair = (a, b) => (a || b ? `<div class="block-grid">${a}${b}</div>` : '');
  const clues = card.clues?.length ? `<section class="block block--clues">${label('Spot it in a question', 'wording that points here')}<div class="callout">${list(card.clues)}</div></section>` : '';
  const traps = card.traps?.length ? `<section class="block block--traps">${label('Watch out for')}<div class="callout">${list(card.traps)}</div></section>` : '';
  const assumptions = card.assumptions?.length ? `<section class="block block--assumptions">${label('Assumptions &amp; limits')}${list(card.assumptions)}</section>` : '';

  return `
  <article class="fcard" id="${card.id}" data-card="${card.id}" data-level="${level}" data-paper="${onPaper}" data-open="false" aria-labelledby="${card.id}-title">
    <div class="fcard__head">
      <div class="fcard__meta">
        <span class="fcard__code">${code}</span>${badges}
        <button class="fcard__link" type="button" data-copy-link="#/papers/${section.id}/${card.id}" aria-label="Copy link to ${escapeHtml(card.title)}">${icons.link}Link</button>
      </div>
      <h3 class="fcard__title" id="${card.id}-title">${escapeHtml(card.title)}</h3>
      <p class="fcard__summary">${rich(card.summary)}</p>
    </div>
    <div class="fcard__formula" role="math" aria-label="${escapeHtml(card.title)} formula">${tex(card.formula, true)}</div>
    <button class="fcard__toggle" type="button" aria-expanded="false" aria-controls="${card.id}-body">
      <span class="fcard__toggle-text"><span class="fcard__toggle-show">Show explanation</span><span class="fcard__toggle-hide">Hide explanation</span></span>
      <span class="fcard__toggle-hint">${hints}</span>${icons.chevron}
    </button>
    <div class="fcard__body" id="${card.id}-body">
      <div class="fcard__inner" inert>
        <div class="fcard__content">
          ${whenBlock}
          ${formsBlock(card.forms)}
          ${pair(variablesBlock(card.variables), clues)}
          ${pair(traps, assumptions)}
          ${exampleBlock(card.example)}
          ${relatedBlock(card.related)}
        </div>
      </div>
    </div>
  </article>`;
}

export function setCardOpen(el, open) {
  el.dataset.open = String(open);
  el.querySelector('.fcard__toggle')?.setAttribute('aria-expanded', String(open));
  const inner = el.querySelector('.fcard__inner');
  if (inner) inner.inert = !open;
}
