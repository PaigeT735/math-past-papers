import { t } from '../lib/tag.js';

/**
 * Trends guide: what the December 2024 and 2025 papers share, what alternates,
 * and what to expect in December 2026. Sections use answer-style blocks
 * (heading, paras, list, table, formula).
 */
export default {
  kind: 'guide',
  id: 'trends',
  title: 'Trends & Predictions',
  short: 'Trends',
  accent: 'general',
  summary: t`What the December 2024 and December 2025 papers have in common, what alternates from year to year, and what is most likely in December 2026. Two papers is a small sample, so treat the confidence levels as a guide to where to spend time, not a guarantee.`,
  sections: [
    {
      id: 'format',
      title: 'The exam at a glance',
      blocks: [
        { table: { columns: ['', 'December 2024', 'December 2025'], rows: [
          ['Length', '2 hours (09:30–11:30)', '2 hours (09:30–11:30)'],
          ['Rule', 'Answer **all** three questions', 'Answer **all** three questions'],
          ['Calculator', 'Standard calculator', 'Standard calculator only'],
          ['Question 1', 'Supply and demand model ("Dublinia" car), 6 parts', 'Open-economy income model, 7 parts (35 marks)'],
          ['Question 2', 'Cost minimisation, $K^{3/4}L^{1/4}$, 8 parts', 'Utility maximisation, $\\tfrac13\\ln x_1 + \\tfrac23\\ln x_2$, 8 parts (40 marks)'],
          ['Question 3', '3×3 inverse, $AB$, total differential, derivative geometry, two integrals: 6 parts', '$AB$/$BA$, transposes, Jacobian, two integrals: 5 parts (25 marks)'],
          ['Marks per part', '5', '5'],
        ] } },
        { heading: 'Timing', list: [
          t`Every part is worth 5 marks, so budget about **6 minutes per part** (20 parts in 120 minutes, leaving 5–10 minutes to check).`,
          t`Q2 is the biggest question (40 marks): aim for about 45 minutes.`,
          'There is no choice, so every topic below must be prepared.',
        ] },
      ],
    },
    {
      id: 'map',
      title: 'Part-by-part map of both papers',
      blocks: [
        { heading: 'Question 1: linear model', table: { columns: ['Part', 'December 2024 (micro market)', 'December 2025 (macro income)'], rows: [
          ['(a)', 'Unsimplified 3×3 matrix form', 'Economic intuition for $b, t, m < 1$'],
          ['(b)', 'Simplified 2×2 form and determinant', 'Simplified 2×2 matrix form'],
          ['(c)', 'Sketch the two lines', 'Determinant: meaning, and what if it were zero'],
          ['(d)', "Cramer's rule for $P^*, Q^*$", "Cramer's rule for $Y^*, C^*$"],
          ['(e)', 'Effect of an exogenous shift ($G$)', 'Other endogenous variables ($T^*, M^*$)'],
          ['(f)', 'Effect of a slope parameter ($e$)', 'Effect of an exogenous shift ($X_0$)'],
          ['(g)', '—', 'Effect of a slope parameter ($m$)'],
        ] } },
        { heading: 'Question 2: constrained optimisation (identical template)', table: { columns: ['Part', 'Task (both years)', '2024 firm', '2025 consumer'], rows: [
          ['(a)', 'Marginal products / utilities and interpretation', '$MP_K, MP_L$', '$MU_1, MU_2$'],
          ['(b)', 'Problem and Lagrangian', 'min cost s.t. output', 'max utility s.t. budget'],
          ['(c)', 'Sketch and properties of the solution', 'isoquant and isocosts', 'budget line and indifference curves'],
          ['(d)', 'FOCs and $x^*$, $\\lambda^*$', '$K^*, L^*, \\lambda^*$', '$x_1^*, x_2^*, \\lambda^*$'],
          ['(e)', 'Meaning of $\\lambda$ and assumptions', 'marginal cost', 'marginal utility of income'],
          ['(f)', 'Bordered Hessian; global or local', 'minimum ($|\\bar H| < 0$)', 'maximum ($|\\bar H| > 0$)'],
          ['(g)', 'Comparative statics in a price and the constraint', '$p_K$, $\\bar{Y}$', '$p_1$, $M$'],
          ['(h)', 'Value function and its derivatives', 'cost function, Shephard', 'indirect utility, Roy'],
        ] } },
        { heading: 'Question 3: toolkit mix', table: { columns: ['Skill', 'December 2024', 'December 2025'], rows: [
          ['Matrices', '3×3 inverse, then $AA^{-1} = I$', '$AB$, and $BA$ not conformable; transposes'],
          ['Differentiation', 'Total differential of a 3-variable function', 'Jacobian of three 3-variable functions'],
          ['Theory', 'Geometric meaning of $f\'$ and $f\'\'$', '—'],
          ['Integral 1', 'Substitution: $\\int 5x\\sqrt{1+x^2}$', 'By parts twice: $\\int 3x^2e^{-x}$'],
          ['Integral 2', 'Improper at an endpoint (disguised), diverges', 'Improper to infinity, diverges'],
        ] } },
      ],
    },
    {
      id: 'patterns',
      title: 'Patterns and trends',
      blocks: [
        { heading: 'Fixed every year (expect them again)', list: [
          '**Same three-question structure:** a linear model (Q1), a Lagrangian problem (Q2), a mixed toolkit question (Q3). Same examiner, Professor Nicola Fontana.',
          "**Q1 always uses matrices and Cramer's rule**, always asks what the determinant implies, and always ends with comparative statics: one exogenous shift and one parameter (a slope) change, each to be interpreted.",
          '**Q2 is word-for-word the same eight-part template**: marginal values, Lagrangian, sketch, FOCs, $\\lambda$ meaning and assumptions, bordered Hessian with global or local, comparative statics, value function. Only the function and the economic setting change.',
          '**Q2 uses Cobb-Douglas** with one price given as a number (5 in 2024, 10 in 2025) and one left as a letter ($p_K$, $p_1$).',
          '**Q3 always has a matrix part, a multivariable differentiation part and two integrals**, one of which is **improper and diverges**.',
          '**"Interpret your results"** appears in every comparative-statics part: a sign alone is never full marks.',
        ] },
        { heading: 'Alternating year to year (every second exam)', list: [
          '**Q2 setting alternates firm ↔ consumer:** 2024 cost minimisation, 2025 utility maximisation. If it continues, **2026 is a firm problem** (cost minimisation again, or a variant).',
          '**Q1 alternates micro ↔ macro:** 2024 a market model, 2025 a national income model. If it continues, **2026 is a micro market model** (demand and supply, possibly with a tax or a second market).',
          '**Q1 matrix size alternates:** 2024 asked for both the unsimplified 3×3 and the simplified 2×2; 2025 only the 2×2 (but added a parameter-intuition part and a "what if the determinant were zero" part).',
          '**Q3 matrix skill alternates:** inverse (2024) ↔ multiplication and transpose (2025). 2026 may return to an inverse, or use the inverse to solve a system.',
          '**Q3 differentiation alternates:** total differential (2024) ↔ Jacobian (2025). Candidates for 2026: a Hessian, implicit differentiation, or a Jacobian determinant (functional dependence).',
          '**Q3 integration technique alternates:** substitution (2024) ↔ by parts (2025), each paired with a divergent improper integral.',
        ] },
        { heading: 'Trends across the two papers', list: [
          '**More interpretation, fewer graphs in Q1:** 2025 dropped the Q1 sketch and added "explain the intuition" and "what if $|A| = 0$". Expect at least one purely verbal 5-mark part in Q1.',
          '**Marks shifted towards Q1 and Q2:** 2025 weighted them 35 and 40, leaving Q3 at 25 with five parts.',
          '**Traps are deliberate:** 2024 hid an improper integral behind an innocent-looking fraction; 2025 asked for a product ($BA$) that does not exist. Expect one "spot the problem" part again.',
          '**Q2 parts are portable:** having learnt one Cobb-Douglas problem fully, you can answer any version. The exponents and the fixed price are the only things that change.',
        ] },
      ],
    },
    {
      id: 'predictions',
      title: 'Predictions for December 2026',
      blocks: [
        { table: { columns: ['Prediction', 'Confidence', 'Why'], rows: [
          ['Three questions, all compulsory, 2 hours, 5-mark parts', 'Very high', 'Identical in both years'],
          ['Q2 uses the full eight-part Lagrangian template with Cobb-Douglas', 'Very high', 'Word-for-word repeat'],
          ['Q2 is a **firm** problem (cost minimisation)', 'Medium–high', 'Alternation firm → consumer → firm'],
          ["Q1 is a linear model solved with Cramer's rule, with determinant meaning and comparative statics", 'Very high', 'Both years'],
          ['Q1 is a **micro** market model (possibly with a per-unit tax)', 'Medium', 'Alternation micro → macro → micro'],
          ['Q1 asks the economic intuition for parameter signs or bounds', 'Medium–high', 'New in 2025; easy marks the examiner seems to like'],
          ['Q3 includes a divergent or convergent **improper integral**', 'High', 'Both years'],
          ['Q3 includes integration by **substitution** or by **parts**', 'Very high', 'Both years'],
          ['Q3 includes a 3×3 **inverse** or determinant', 'Medium', 'Alternation'],
          ['Q3 includes a **Hessian**, implicit differentiation or Jacobian determinant', 'Medium', 'Differentiation part changes form each year'],
          ['A "trap" part (non-conformable product, singular matrix, improper integral)', 'High', 'Both years'],
        ] } },
        { heading: 'The two mocks on this site', list: [
          '**Mock 2026 A (most likely paper):** follows every alternation: a micro market model with a per-unit tax (Q1), cost minimisation with $K^{1/4}L^{3/4}$ and a variable wage (Q2), and a Q3 with a 2×2 inverse used to solve a system, a Hessian, implicit differentiation and two integrals.',
          '**Mock 2026 B (if the pattern breaks):** an IS–LM macro model (Q1), the consumer side again but as **expenditure minimisation** (Q2), and a Q3 with non-commuting products, a 3×3 determinant with Cramer, a Jacobian determinant, a total differential with elasticities and two integrals (one convergent improper).',
          'Do both under timed conditions: 2 hours each, all questions.',
        ] },
      ],
    },
    {
      id: 'full-marks',
      title: 'How to score full marks',
      blocks: [
        { heading: 'Habits the marking rewards', list: [
          '**State signs and interpret:** every derivative in Q1(f)/(g) and Q2(g)/(h) needs "positive because…", then one economic sentence.',
          '**Name the theorem:** "by the envelope theorem", "Shephard\'s lemma", "Roy\'s identity", "the multiplier", "non-singular".',
          '**Say global or local and why:** quasi-concave objective (or convex isoquant) plus linear constraint means a unique, global optimum.',
          '**State assumptions** in Q2(e): strictly positive prices and income or output.',
          '**Check your answer** by plugging back into the constraint or multiplying $AA^{-1}$.',
        ] },
        { heading: 'Common slips', list: [
          'Wrong column order in matrix form, or forgetting to change the sign when moving a term left.',
          'Using the bordered Hessian sign rule the wrong way round (positive = max, negative = min with two variables).',
          'Forgetting to transpose the cofactor matrix for an inverse.',
          'Evaluating an improper integral as if it were ordinary.',
          'Dropping the chain-rule factor in $e^{2x_2x_3}$ or $\\ln(2y^2)$.',
        ] },
      ],
    },
  ],
};
