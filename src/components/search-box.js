/** Search box with keyboard-navigable results panel. */
import { search } from '../lib/search.js';
import { rich, escapeHtml } from '../lib/rich.js';
import { icons } from '../lib/icons.js';

export function renderSearchBox() {
  return `
  <div class="search" role="search">
    <label class="search__field">
      ${icons.search}
      <span class="visually-hidden">Search formulas</span>
      <input class="search__input" type="search" placeholder="Search questions, topics, formulas…" autocomplete="off" spellcheck="false"
        role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list">
      <kbd aria-hidden="true">/</kbd>
    </label>
    <div class="search__panel" id="search-results" role="listbox" aria-label="Search results" hidden></div>
  </div>`;
}

export function mountSearchBox(root, { navigate }) {
  const input = root.querySelector('.search__input');
  const panel = root.querySelector('.search__panel');
  let results = [];
  let active = -1;

  const close = () => {
    panel.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  };

  const highlight = (i) => {
    active = i;
    panel.querySelectorAll('.result').forEach((el, idx) => el.setAttribute('aria-selected', String(idx === i)));
    const el = panel.querySelector(`#sr-${i}`);
    if (el) {
      input.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    }
  };

  const go = (i) => {
    const r = results[i];
    if (!r) return;
    close();
    input.value = '';
    input.blur();
    navigate(r.href);
  };

  const update = () => {
    const q = input.value.trim();
    if (!q) return close();
    results = search(q);
    if (!results.length) {
      panel.innerHTML = `<div class="search__empty">Nothing matches “${escapeHtml(q)}”. Try a topic (WACC, dividends), a formula (CAPM) or exam wording (working capital).</div>`;
    } else {
      panel.innerHTML =
        `<div class="search__meta eyebrow">${results.length} result${results.length === 1 ? '' : 's'}</div>` +
        results
          .map(
            (r, i) => `
          <div class="result" id="sr-${i}" role="option" aria-selected="false" data-i="${i}" data-accent="${r.section.accent}">
            <span class="result__dot"></span>
            <div class="result__head"><span class="result__title">${escapeHtml(r.title)}</span><span class="result__where">${escapeHtml(r.section.short)} · ${r.code}</span></div>
            <div class="result__summary">${rich(r.summary)}</div>
          </div>`
          )
          .join('');
    }
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    highlight(results.length ? 0 : -1);
  };

  input.addEventListener('input', update);
  input.addEventListener('focus', () => { if (input.value.trim()) update(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (results.length) highlight((active + 1) % results.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (results.length) highlight((active - 1 + results.length) % results.length); }
    else if (e.key === 'Enter') { e.preventDefault(); go(active < 0 ? 0 : active); }
    else if (e.key === 'Escape') { close(); input.blur(); }
  });
  panel.addEventListener('mousedown', (e) => e.preventDefault()); // keep focus in input
  panel.addEventListener('click', (e) => {
    const el = e.target.closest('.result');
    if (el) go(Number(el.dataset.i));
  });
  panel.addEventListener('mousemove', (e) => {
    const el = e.target.closest('.result');
    if (el && Number(el.dataset.i) !== active) highlight(Number(el.dataset.i));
  });
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) close(); });

  // Global shortcuts: "/" or Ctrl/Cmd+K
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  return { focus: () => { input.focus(); input.select(); } };
}
