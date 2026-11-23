/**
 * App entry: builds the shell, then routes on hash changes.
 */
import { ROUTES, NOT_FOUND } from './config/routes.js';
import { SITE } from './config/site.js';
import { renderSidebar, renderBrand, renderTabs, moveInk, setActiveNav } from './components/sidebar.js';
import { renderSearchBox, mountSearchBox } from './components/search-box.js';
import { escapeHtml } from './lib/rich.js';
import { icons } from './lib/icons.js';

const $ = (sel) => document.querySelector(sel);

const sidebar = $('#sidebar');
const backdrop = $('.backdrop');
const main = $('#main');
const tabs = $('[data-slot="tabs"]');
const themeBtn = $('.theme-toggle');
const menuBtn = $('.menu-btn');
const toastEl = $('.toast');

/* ---------- Shell ---------- */
sidebar.innerHTML = renderSidebar();
$('[data-slot="brand"]').innerHTML = renderBrand();
tabs.innerHTML = renderTabs();
$('.topbar__search').innerHTML = renderSearchBox();
menuBtn.innerHTML = icons.menu;

/* ---------- Theme (light default, dark optional, remembered) ---------- */
themeBtn.innerHTML = icons.moon + icons.sun;
function applyTheme(theme) {
  if (theme === 'dark') document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeBtn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1a1a1c' : '#e8e7e4');
}
applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('maths-theme', next); } catch (e) { /* storage unavailable: theme lasts this visit */ }
  requestAnimationFrame(() => syncTabsInk(false));
});

function syncTabsInk(scroll = false) {
  moveInk(tabs, tabs.querySelector('[aria-current="page"]'), { scroll });
}
window.addEventListener('resize', () => syncTabsInk(false));
document.fonts?.ready.then(() => syncTabsInk(false));

const setDrawer = (open) => {
  sidebar.dataset.open = String(open);
  backdrop.dataset.open = String(open);
  menuBtn.setAttribute('aria-expanded', String(open));
};
menuBtn.addEventListener('click', () => setDrawer(sidebar.dataset.open !== 'true'));
backdrop.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });

let toastTimer;
function toast(message) {
  toastEl.textContent = message;
  toastEl.dataset.show = 'true';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastEl.dataset.show = 'false'), 1800);
}

function navigate(href) {
  if (location.hash === href) route();
  else location.hash = href;
}

const search = mountSearchBox($('.topbar__search'), { navigate });

/* ---------- Router ---------- */
let current = { key: null, view: null, el: null, cleanups: [] };

function parse() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('?')[0];
  return raw.split('/').filter(Boolean);
}

function resolve(segments) {
  for (const view of ROUTES) {
    const params = view.match(segments);
    if (params) return { view, params };
  }
  return { view: NOT_FOUND, params: {} };
}

function route() {
  // Ignore non-route hashes (e.g. the skip link)
  if (location.hash && !location.hash.startsWith('#/')) return;

  const { view, params } = resolve(parse());
  const key = view.key(params);
  setDrawer(false);

  const ctx = { navigate, toast, focusSearch: search.focus, onLeave: (fn) => current.cleanups.push(fn) };

  if (key === current.key && view.update) {
    view.update(current.el, params, ctx);
    return;
  }

  current.cleanups.forEach((fn) => fn());
  const out = view.render(params);
  const el = document.createElement('div');
  el.className = 'view';
  if (out.accent) el.dataset.accent = out.accent;
  el.innerHTML = out.html;
  main.replaceChildren(el);
  current = { key, view, el, cleanups: [] };

  document.title = out.title ? `${out.title} · ${SITE.title} · ${SITE.docTitle}` : `${SITE.title} · ${SITE.docTitle}`;
  document.body.dataset.accent = out.accent ?? '';
  if (!out.accent) delete document.body.dataset.accent;
  setActiveNav(document, out.nav);
  syncTabsInk(true);

  window.scrollTo(0, 0);
  view.mount?.(el, params, { ...ctx, onLeave: (fn) => current.cleanups.push(fn) });
}

window.addEventListener('hashchange', route);
route();
