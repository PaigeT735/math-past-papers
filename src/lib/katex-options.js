/** Shared KaTeX settings, used by the browser and by scripts/check-content.mjs. */
export const KATEX_MACROS = {
  // \br{x}: marks a best-response payoff in a game matrix
  '\\br': '\\underline{#1}',
};

export const katexOptions = (displayMode) => ({
  displayMode,
  throwOnError: false,
  strict: 'ignore',
  output: 'htmlAndMathml',
  macros: { ...KATEX_MACROS },
});

/** KaTeX has no euro glyph in maths mode: wrap bare € signs as text. */
export const prepTex = (src) => String(src).replace(/(?<!\\text\{)€/g, '\\text{€}');
