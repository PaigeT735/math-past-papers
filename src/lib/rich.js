/**
 * Rich text renderer: turns content strings into HTML.
 *   $...$    inline maths (KaTeX)
 *   $$...$$  display maths (KaTeX)
 *   **...**  bold
 * Everything else is HTML-escaped.
 */
import { katexOptions, prepTex } from './katex-options.js';

const cache = new Map();

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function tex(src, display = false) {
  const key = (display ? 'D:' : 'I:') + src;
  if (cache.has(key)) return cache.get(key);
  let html;
  try {
    html = window.katex.renderToString(prepTex(src), katexOptions(display));
  } catch (err) {
    console.warn('KaTeX failed for', src, err);
    html = `<code>${escapeHtml(src)}</code>`;
  }
  cache.set(key, html);
  return html;
}

function plain(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Split a rich string into text / inline / display segments. Exported for search indexing. */
export function segments(str) {
  const out = [];
  let i = 0;
  let buf = '';
  const s = String(str ?? '');
  while (i < s.length) {
    if (s[i] === '$') {
      const isDisplay = s[i + 1] === '$';
      const open = isDisplay ? 2 : 1;
      const close = s.indexOf(isDisplay ? '$$' : '$', i + open);
      if (close === -1) {
        buf += s.slice(i);
        break;
      }
      if (buf) out.push({ type: 'text', value: buf });
      buf = '';
      out.push({ type: isDisplay ? 'display' : 'inline', value: s.slice(i + open, close) });
      i = close + open;
    } else {
      buf += s[i];
      i += 1;
    }
  }
  if (buf) out.push({ type: 'text', value: buf });
  return out;
}

export function rich(str) {
  return segments(str)
    .map((seg) => {
      if (seg.type === 'text') return plain(seg.value);
      if (seg.type === 'inline') return tex(seg.value, false);
      return `<div class="math-display">${tex(seg.value, true)}</div>`;
    })
    .join('');
}
