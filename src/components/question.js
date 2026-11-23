/**
 * Past-paper question part: the question is always visible; the model answer
 * opens underneath (same card shell and open/close behaviour as formula cards).
 */
import { rich, tex, escapeHtml } from '../lib/rich.js';
import { icons } from '../lib/icons.js';
import { cardIndex } from '../content/index.js';
import { topicById } from '../content/topics.js';
import { methodById } from '../content/methods.js';

const label = (text, hint = '') => `<h4 class="block__label">${text}${hint ? `<span class="block__hint">${hint}</span>` : ''}</h4>`;
const paras = (v) => [].concat(v ?? []).map((p) => `<p>${rich(p)}</p>`).join('');
/** Bullet list. An item may be a string, or { label, items } for a labelled group of sub-bullets. */
const list = (items) =>
  `<ul class="list">${items
    .map((i) =>
      typeof i === 'string'
        ? `<li>${rich(i)}</li>`
        : `<li class="list__group"><span class="list__label">${rich(i.label)}</span><ul class="list list--sub">${i.items.map((x) => `<li>${rich(x)}</li>`).join('')}</ul></li>`
    )
    .join('')}</ul>`;

function table(tb) {
  const head = tb.columns.map((c) => `<th scope="col">${rich(c)}</th>`).join('');
  const body = tb.rows.map((r) => `<tr>${r.map((c) => `<td>${rich(c)}</td>`).join('')}</tr>`).join('');
  return `<div class="ctable__scroll mini-table"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

/** One block of a model answer: heading + any of paras / formula / list / table. */
export function answerBlock(b) {
  return `<section class="block block--answer">
    ${b.heading ? label(escapeHtml(b.heading)) : ''}
    ${paras(b.paras)}
    ${b.formula ? `<div class="answer-formula">${tex(b.formula, true)}</div>` : ''}
    ${b.list ? list(b.list) : ''}
    ${b.table ? table(b.table) : ''}
  </section>`;
}

function givenBlock(given) {
  if (!given?.length) return '';
  const rows = given.map(([k, v]) => `<dt>${rich(k)}</dt><dd>${rich(v)}</dd>`).join('');
  return `<section class="block block--given">${label('What you are given')}<dl class="vars">${rows}</dl></section>`;
}

/**
 * Step-by-step working. A step is either a rich string, or
 * { title, why, math, note }: a short step name, one line explaining why,
 * the maths on its own line (LaTeX, display mode), and an optional note.
 */
function workingStep(step) {
  if (typeof step === 'string') return `<li><div>${rich(step)}</div></li>`;
  return `<li><div class="wstep">
      ${step.title ? `<div class="wstep__title">${rich(step.title)}</div>` : ''}
      ${step.why ? `<div class="wstep__why">${rich(step.why)}</div>` : ''}
      ${[].concat(step.math ?? []).map((m) => `<div class="wstep__math">${tex(m, true)}</div>`).join('')}
      ${step.note ? `<div class="wstep__note">${rich(step.note)}</div>` : ''}
    </div></li>`;
}

function workingBlock(steps, result) {
  if (!steps?.length) return '';
  return `<section class="block block--example">${label('Step-by-step working')}
    <div class="example">
      <ol class="example__steps">${steps.map(workingStep).join('')}</ol>
      ${result ? `<div class="example__answer"><span class="example__answer-label">Answer</span><span>${rich(result)}</span></div>` : ''}
    </div>
  </section>`;
}

/**
 * Standard method: the general recipe for this type of question (letters, not numbers).
 * Parts reference one or more methods from content/methods.js by id.
 */
function methodPanel(ids) {
  const methods = [].concat(ids ?? []).map((id) => methodById.get(id)).filter(Boolean);
  if (!methods.length) return '<p class="smethod__empty">No standard method for this question yet.</p>';
  return methods
    .map(
      (m, i) => `<section class="smethod">
      <div class="smethod__head">
        <span class="smethod__kicker">${methods.length > 1 ? `Method ${i + 1} of ${methods.length}` : 'Standard method'}</span>
        <h4 class="smethod__title">${rich(m.title)}</h4>
      </div>
      <div class="smethod__when"><span class="smethod__tag">Use it when</span><span>${rich(m.when)}</span></div>
      ${m.setup ? `<div class="smethod__setup"><span class="smethod__tag">Notation</span><span>${rich(m.setup)}</span></div>` : ''}
      <div class="example smethod__steps">
        <ol class="example__steps">${m.steps.map((s) => workingStep({ title: s.title, why: s.how, math: s.math })).join('')}</ol>
        ${m.shortcut ? `<div class="example__answer smethod__shortcut"><span class="example__answer-label">Shortcut</span><span class="smethod__shortcut-math">${tex(m.shortcut, true)}</span></div>` : ''}
      </div>
      ${m.check ? `<div class="smethod__check"><span class="smethod__tag">Sense check</span><span>${rich(m.check)}</span></div>` : ''}
      ${m.traps?.length ? `<div class="smethod__traps"><span class="smethod__tag">Watch out</span>${list(m.traps)}</div>` : ''}
    </section>`
    )
    .join('');
}

function formulaLinks(ids) {
  const links = (ids ?? [])
    .map((id) => cardIndex.get(id))
    .filter(Boolean)
    .map(({ card, section }) => `<a href="#/papers/${section.id}/${card.id}" data-accent="${section.accent}"><i></i>${escapeHtml(card.title)}</a>`)
    .join('');
  return links ? `<div class="related"><span class="related__label">Formulas used</span>${links}</div>` : '';
}

export function renderQuestionPart(part, question, section) {
  const topics = (part.topics ?? [])
    .map((id) => topicById.get(id))
    .filter(Boolean)
    .map((tp) => `<span class="badge badge--topic">${escapeHtml(tp.label)}</span>`)
    .join('');
  const badges = [
    part.marks ? `<span class="badge badge--paper">${part.marks} marks</span>` : '',
    question.compulsory ? '<span class="badge badge--must">Compulsory</span>' : '',
    part.type === 'calc' ? '<span class="badge">Calculation</span>' : '',
  ].join('');

  const hints = 'solution · standard steps';

  return `
  <article class="fcard qcard" id="${part.id}" data-card="${part.id}" data-type="${part.type}" data-open="false" aria-labelledby="${part.id}-title">
    <div class="fcard__head">
      <div class="fcard__meta">
        <span class="fcard__code">${escapeHtml(section.short)}</span>${badges}
        <button class="fcard__link" type="button" data-copy-link="#/papers/${section.id}/${part.id}" aria-label="Copy link to question ${escapeHtml(part.label)}">${icons.link}Link</button>
      </div>
      <h3 class="fcard__title" id="${part.id}-title">Question ${escapeHtml(part.label)}${part.title ? ` · ${escapeHtml(part.title)}` : ''}</h3>
      ${topics ? `<div class="qcard__topics">${topics}</div>` : ''}
    </div>
    <div class="fcard__formula qcard__prompt">${rich(part.prompt)}</div>
    <button class="fcard__toggle" type="button" aria-expanded="false" aria-controls="${part.id}-body">
      <span class="fcard__toggle-text"><span class="fcard__toggle-show">Show answer</span><span class="fcard__toggle-hide">Hide answer</span></span>
      <span class="fcard__toggle-hint">${hints}</span>${icons.chevron}
    </button>
    <div class="fcard__body" id="${part.id}-body">
      <div class="fcard__inner" inert>
        <div class="fcard__content">
          <div class="atabs" role="tablist" aria-label="Answer views">
            <button class="atabs__tab" type="button" role="tab" id="${part.id}-tab-solution" aria-controls="${part.id}-panel-solution" aria-selected="true" data-atab="solution">Solution</button>
            <button class="atabs__tab" type="button" role="tab" id="${part.id}-tab-method" aria-controls="${part.id}-panel-method" aria-selected="false" tabindex="-1" data-atab="method">Standard steps</button>
          </div>
          <div class="apanel" role="tabpanel" id="${part.id}-panel-solution" aria-labelledby="${part.id}-tab-solution" data-apanel="solution">
          ${part.approach ? `<section class="block block--when">${label('How to approach it')}<div class="block__lead">${paras(part.approach)}</div></section>` : ''}
          ${givenBlock(part.given)}
          ${workingBlock(part.working, part.result)}
          ${(part.answer ?? []).map(answerBlock).join('')}
          ${part.tips?.length ? `<section class="block block--clues">${label('Exam tips')}<div class="callout">${list(part.tips)}</div></section>` : ''}
          </div>
          <div class="apanel" role="tabpanel" id="${part.id}-panel-method" aria-labelledby="${part.id}-tab-method" data-apanel="method" hidden>
            ${methodPanel(part.method)}
          </div>
          ${formulaLinks(part.formulas)}
        </div>
      </div>
    </div>
  </article>`;
}
