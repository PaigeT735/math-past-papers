/**
 * The two kinds of page, each opened from a tab in the top bar:
 *   #/papers/formula-sheet            the formula sheet (also the home page)
 *   #/papers/:paperId                 a past paper: its questions, answers in dropdowns
 *   #/papers/:id/:anchorId            ... scrolled to (and opening) one card or question part
 */
import { SECTIONS, sectionById } from '../content/index.js';
import { renderCard, setCardOpen } from '../components/card.js';
import { renderQuestionPart, answerBlock } from '../components/question.js';
import { rich, escapeHtml } from '../lib/rich.js';

function renderFormulaSheet(section) {
  return `
  <div class="page" data-accent="${section.accent}">
    <div class="section-wrap">
      <header class="section-hero">
        <h1 class="section-hero__title">${escapeHtml(section.title)}</h1>
        <p class="section-hero__lede">${rich(section.summary)}</p>
      </header>
      <div class="cards">${section.cards.map((c, i) => renderCard(c, section, i)).join('')}</div>
    </div>
  </div>`;
}

/** Guide page: trends, patterns and predictions, written as answer-style blocks. */
function renderGuide(section) {
  const toc = section.sections.map((s) => `<a href="#/papers/${section.id}/${s.id}">${escapeHtml(s.title)}</a>`).join('<span aria-hidden="true">·</span>');
  const body = section.sections
    .map((s) => `<section class="qgroup guide-sec" id="${s.id}">
        <div class="qgroup__head"><h2 class="qgroup__num">${escapeHtml(s.title)}</h2></div>
        <div class="guide-body">${s.blocks.map(answerBlock).join('')}</div>
      </section>`)
    .join('');
  return `
  <div class="page" data-accent="${section.accent}">
    <div class="section-wrap">
      <header class="section-hero">
        <h1 class="section-hero__title">${escapeHtml(section.title)}</h1>
        <p class="section-hero__lede">${rich(section.summary)}</p>
        <nav class="guide-toc" aria-label="On this page">${toc}</nav>
      </header>
      ${body}
    </div>
  </div>`;
}

function renderPaper(paper) {
  const questions = paper.questions
    .map((q) => {
      const marks = q.parts.reduce((m, p) => m + p.marks, 0);
      return `
      <section class="qgroup" id="${paper.id}-q${q.number}">
        <div class="qgroup__head">
          <h2 class="qgroup__num">Question ${q.number}</h2>
          <span class="qgroup__meta">${[q.topic ?? '', marks ? `${marks} marks` : ''].filter(Boolean).join(' · ')}</span>
        </div>
        <div class="cards">${q.parts.map((part) => renderQuestionPart(part, q, paper)).join('')}</div>
      </section>`;
    })
    .join('');

  return `
  <div class="page" data-accent="${paper.accent}">
    <div class="section-wrap">
      <header class="section-hero">
        <h1 class="section-hero__title">${escapeHtml(paper.title)}</h1>
        <p class="section-hero__lede">${rich(paper.summary)}</p>
      </header>
      ${questions}
    </div>
  </div>`;
}

/** Scroll to a card / question and open its dropdown. */
function focusAnchor(root, anchorId, { smooth = true } = {}) {
  if (!anchorId) return;
  const el = root.querySelector(`#${CSS.escape(anchorId)}`);
  if (!el) return;
  if (el.classList.contains('fcard')) {
    setCardOpen(el, true);
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
  }
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    if (!smooth) {
      const target = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const settle = () => { if (Math.abs(el.getBoundingClientRect().top - target) > 8) el.scrollIntoView({ block: 'start' }); };
      document.fonts?.ready.then(() => setTimeout(settle, 60));
      setTimeout(settle, 450);
    }
  });
}

/** "q3" means the whole of Question 3 on a paper page. */
const resolveAnchor = (section, anchor) => (/^q\d+$/.test(anchor ?? '') && section.kind === 'paper' ? `${section.id}-${anchor}` : anchor);

export default {
  key: (p) => `page:${p.section.id}`,

  match(seg) {
    if (seg.length === 0) return { section: SECTIONS[0] }; // home = first tab
    if (seg[0] !== 'papers') return null;
    if (seg.length === 1) return { section: SECTIONS[0] };
    const section = sectionById.get(seg[1]);
    if (!section || seg.length > 3) return null;
    return { section, anchor: seg[2] };
  },

  render(p) {
    return {
      title: p.section.title,
      nav: `section:${p.section.id}`,
      accent: p.section.accent,
      html: p.section.kind === 'paper' ? renderPaper(p.section) : p.section.kind === 'guide' ? renderGuide(p.section) : renderFormulaSheet(p.section),
    };
  },

  mount(root, p, ctx) {
    root.addEventListener('click', (e) => {
      const toggle = e.target.closest('.fcard__toggle');
      if (toggle) {
        const card = toggle.closest('.fcard');
        setCardOpen(card, card.dataset.open !== 'true');
        return;
      }
      const tab = e.target.closest('[data-atab]');
      if (tab) {
        selectAnswerTab(tab);
        return;
      }
      const copy = e.target.closest('[data-copy-link]');
      if (copy) {
        const url = `${location.origin}${location.pathname}${copy.dataset.copyLink}`;
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(() => ctx.toast('Link copied'), () => ctx.toast(url));
        else ctx.toast(url);
      }
    });
    root.addEventListener('keydown', (e) => {
      const tab = e.target.closest('[data-atab]');
      if (!tab || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const tabs = [...tab.parentElement.querySelectorAll('[data-atab]')];
      const next = tabs[(tabs.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      selectAnswerTab(next);
      next.focus();
      e.preventDefault();
    });
    focusAnchor(root, resolveAnchor(p.section, p.anchor), { smooth: false });
  },

  /** Same page, different anchor: scroll there without re-rendering. */
  update(root, p) {
    if (p.anchor) focusAnchor(root, resolveAnchor(p.section, p.anchor));
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};

/** Switch a question card between its Solution and Standard steps panels. */
function selectAnswerTab(tab) {
  const card = tab.closest('.qcard');
  if (!card) return;
  const which = tab.dataset.atab;
  card.querySelectorAll('[data-atab]').forEach((b) => {
    const on = b.dataset.atab === which;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
  });
  card.querySelectorAll('[data-apanel]').forEach((p) => (p.hidden = p.dataset.apanel !== which));
}
