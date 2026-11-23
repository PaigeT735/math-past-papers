/** Comparison table. The first column is treated as a row header. */
import { rich, escapeHtml } from '../lib/rich.js';

export function renderTable(table) {
  const head = table.columns.map((c) => `<th scope="col">${rich(c)}</th>`).join('');
  const body = table.rows
    .map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<th scope="row">${rich(cell)}</th>` : `<td>${rich(cell)}</td>`)).join('')}</tr>`)
    .join('');
  return `
  <figure class="ctable" id="${table.id}" aria-labelledby="${table.id}-title">
    <figcaption class="ctable__head">
      <div class="eyebrow">Compare</div>
      <h3 class="ctable__title" id="${table.id}-title">${escapeHtml(table.title)}</h3>
      ${table.caption ? `<p class="ctable__caption">${rich(table.caption)}</p>` : ''}
    </figcaption>
    <div class="ctable__scroll" tabindex="0" role="region" aria-label="${escapeHtml(table.title)}">
      <table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
    </div>
  </figure>`;
}
