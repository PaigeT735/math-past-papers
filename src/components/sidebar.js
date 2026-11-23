/**
 * Navigation: the top section tabs (with a sliding underline) and the
 * full menu drawer, both built from NAV_GROUPS in src/config/site.js.
 */
import { NAV_GROUPS, SITE } from '../config/site.js';
import { SECTIONS } from '../content/index.js';
import { escapeHtml } from '../lib/rich.js';
import { brandMark } from '../lib/icons.js';

export function renderBrand() {
  return `${brandMark}
    <span class="brand__text">
      <span class="brand__title">${escapeHtml(SITE.title)}</span>
      <span class="brand__sub">${escapeHtml(SITE.sub)}</span>
    </span>`;
}

/* ---------- Top tabs ---------- */
export function renderTabs() {
  const tabs = [
    ...SECTIONS.map((s) => `<a class="tab" href="#/papers/${s.id}" data-nav="section:${s.id}" data-accent="${s.accent}" title="${escapeHtml(s.title)}">${escapeHtml(s.short)}</a>`),
  ].join('');
  return `<div class="tabs__track">${tabs}<span class="ink" aria-hidden="true"></span></div>`;
}

/**
 * Slide an underline (`.ink`) under the active link inside a scrollable tab strip.
 * Used by both the section tabs and the in-page card navigation.
 */
export function moveInk(strip, active, { scroll = true } = {}) {
  // The underline lives in the same track as the active link (strips may hold several tracks)
  const ink = active?.parentElement?.querySelector(':scope > .ink') || strip.querySelector('.ink');
  if (!ink) return;
  if (!active) { ink.dataset.show = 'false'; return; }
  ink.style.width = `${active.offsetWidth - 16}px`;
  ink.style.transform = `translateX(${active.offsetLeft + 8}px)`;
  ink.style.backgroundColor = getComputedStyle(active).getPropertyValue('--accent') || '';
  ink.dataset.show = 'true';
  if (scroll) {
    const target = active.offsetLeft - strip.clientWidth / 2 + active.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }
}

/* ---------- Drawer ---------- */
function renderItem(item) {
  const accent = item.accent ? ` data-accent="${item.accent}"` : '';
  const lead = item.num ? `<span class="nav-link__num">${item.num}</span>` : '<span class="nav-link__dot"></span>';
  const count = item.count != null ? `<span class="nav-link__count">${item.count}</span>` : '';
  return `<li><a class="nav-link" href="${item.href}" data-nav="${item.id}"${accent}>${lead}<span class="nav-link__label">${escapeHtml(item.label)}</span>${count}</a></li>`;
}

export function renderSidebar() {
  const groups = NAV_GROUPS.map((g) => {
    const items = typeof g.items === 'function' ? g.items() : g.items;
    return `<div class="nav-group"><div class="nav-group__label eyebrow">${escapeHtml(g.label)}</div><ul>${items.map(renderItem).join('')}</ul></div>`;
  }).join('');

  return `
    <a class="brand" href="#/" aria-label="${escapeHtml(SITE.title)}, home">${renderBrand()}</a>
    <nav class="sidebar__nav" aria-label="Main">${groups}</nav>
    <div class="sidebar__foot">Press <kbd>/</kbd> to search any formula, term or exam phrase.</div>`;
}

/** Mark the active item (drawer links and top tabs share ids). */
export function setActiveNav(root, activeId) {
  root.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === activeId) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
