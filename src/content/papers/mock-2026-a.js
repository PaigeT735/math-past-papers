import { t } from '../../lib/tag.js';

/**
 * Predicted mock A for December 2026: follows every alternation seen in 2024 → 2025
 * (Q1 back to a micro market, Q2 back to a firm, Q3 inverse + new differentiation skill).
 */
const model = t`$$Q^D = a - bP + cY,\qquad Q^S = d + e(P - \tau),\qquad Q^D = Q^S$$`;

export default {
  kind: 'paper',
  practice: true,
  id: 'mock-2026-a',
  title: 'Mock 2026 A (most likely)',
  short: 'Mock A',
  accent: 'competition',
  summary: t`A predicted paper that follows every alternation in the past papers: a **micro market model with a per-unit tax** (Q1, 35 marks), **cost minimisation** with $y = K^{1/4}L^{3/4}$ (Q2, 40 marks), and a toolkit Q3 (25 marks) with a 2×2 inverse, a Hessian, implicit differentiation and two integrals. Two hours, answer all three questions.`,
  meta: [['Status', 'Predicted mock with full solutions'], ['Format', '2 hours, all three questions, 5 marks per part']],
  questions: [
    /* ------------------------------------------------------------------ Q1 */
    {
      number: 1,
      topic: 'A market with a per-unit tax',
      parts: [
        {
          id: 'ma-q1a', method: 'parameter-intuition', label: '1(a)', title: 'Signs of the parameters', type: 'essay', marks: 5,
          topics: ['linear-models', 'interpretation'],
          prompt: t`Consider a market for electric bikes: ${model} where $P$ is the price paid by consumers, $Y$ is consumer income and $\tau$ is a per-unit tax paid by producers. $P$, $Q^D$ and $Q^S$ are endogenous; $Y$ and $\tau$ are exogenous; $a, b, c, d, e > 0$. **(a)** Explain the economic meaning of $b$, $c$ and $e$, and of the term $P - \tau$.`,
          answer: [{ heading: 'Meaning', list: [
            t`$b > 0$: demand slopes down: a higher price lowers the quantity demanded (law of demand). It measures how price-sensitive buyers are.`,
            t`$c > 0$: e-bikes are a **normal good**: more income raises demand at every price.`,
            t`$e > 0$: supply slopes up: producers offer more when the price they receive rises.`,
            t`$P - \tau$ is the **price producers keep** after paying the tax, so supply responds to the net price, not the price consumers pay. The tax drives a wedge between the two.`,
          ] }],
        },
        {
          id: 'ma-q1b', method: ['matrix-form', 'determinant-meaning'], label: '1(b)', title: 'Unsimplified 3×3 form', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(b)** Without simplifying, write the model in matrix form with the variables in the order $(Q^D, P, Q^S)$. Call the coefficient matrix $A$ and compute $|A|$.`,
          working: [
            { title: 'Rearrange', why: 'Endogenous variables on the left.', math: [t`Q^D + bP = a + cY`, t`-eP + Q^S = d - e\tau`, t`Q^D - Q^S = 0`] },
            { title: 'Matrix form', why: '', math: t`\begin{bmatrix} 1 & b & 0 \\ 0 & -e & 1 \\ 1 & 0 & -1 \end{bmatrix}\begin{bmatrix} Q^D \\ P \\ Q^S \end{bmatrix} = \begin{bmatrix} a + cY \\ d - e\tau \\ 0 \end{bmatrix}` },
            { title: 'Determinant (row 1)', why: '', math: t`|A| = 1\big((-e)(-1) - 0\big) - b\big(0 - 1\big) + 0 = b + e > 0` },
          ],
          result: t`$|A| = b + e > 0$: non-singular, unique solution.`,
          formulas: ['matrix-form', 'determinant'],
        },
        {
          id: 'ma-q1c', method: ['matrix-form', 'determinant-meaning'], label: '1(c)', title: 'Simplified 2×2 form', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(c)** Simplify the model to two equations in $(Q, P)$, write it in matrix form with coefficient matrix $B$, and explain what $|B|$ implies.`,
          working: [
            { title: 'Set Q^D = Q^S = Q', why: '', math: [t`Q + bP = a + cY`, t`Q - eP = d - e\tau`] },
            { title: 'Matrix form', why: '', math: t`\begin{bmatrix} 1 & b \\ 1 & -e \end{bmatrix}\begin{bmatrix} Q \\ P \end{bmatrix} = \begin{bmatrix} a + cY \\ d - e\tau \end{bmatrix}` },
            { title: 'Determinant', why: '', math: t`|B| = -e - b = -(b + e) < 0` },
          ],
          result: t`$|B| = -(b+e) \neq 0$`,
          answer: [{ heading: 'Implication', paras: [t`$B$ is non-singular (demand and supply are not parallel), so there is a unique equilibrium and Cramer's rule applies. Note $|B| = -|A|$: simplifying does not change whether a unique solution exists.`] }],
          formulas: ['determinant'],
        },
        {
          id: 'ma-q1d', method: 'cramers-rule', label: '1(d)', title: "Equilibrium by Cramer's rule", type: 'calc', marks: 5,
          topics: ['cramer'],
          prompt: t`**(d)** Use Cramer's rule to find $P^*$ and $Q^*$. What condition makes $P^* > 0$?`,
          working: [
            { title: 'P*', why: 'Replace column 2.', math: t`P^* = \frac{\begin{vmatrix} 1 & a + cY \\ 1 & d - e\tau \end{vmatrix}}{-(b+e)} = \frac{a + cY - d + e\tau}{b + e}` },
            { title: 'Q*', why: 'Replace column 1.', math: t`Q^* = \frac{\begin{vmatrix} a + cY & b \\ d - e\tau & -e \end{vmatrix}}{-(b+e)} = \frac{e(a + cY) + b(d - e\tau)}{b + e}` },
          ],
          result: t`$P^* = \dfrac{a + cY - d + e\tau}{b+e}$, $\ Q^* = \dfrac{e(a+cY) + b(d - e\tau)}{b+e}$; $P^* > 0$ if $a + cY + e\tau > d$.`,
          formulas: ['cramer'],
        },
        {
          id: 'ma-q1e', method: 'comparative-statics-linear', label: '1(e)', title: 'A rise in income', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(e)** Find and interpret the effect of a rise in income $Y$ on $P^*$ and $Q^*$.`,
          working: [{ title: 'Differentiate', why: t`$Y$ enters the numerators with coefficients $c$ and $ec$.`, math: t`\frac{\partial P^*}{\partial Y} = \frac{c}{b+e} > 0,\qquad \frac{\partial Q^*}{\partial Y} = \frac{ec}{b+e} > 0` }],
          result: 'Price and quantity both rise.',
          answer: [{ heading: 'Interpretation', paras: [t`Higher income shifts the demand curve out (normal good). Moving along the unchanged supply curve, the market reaches a higher price and quantity. The more responsive supply is (larger $e$), the more of the demand shift shows up in quantity rather than price.`] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'ma-q1f', method: 'comparative-statics-linear', label: '1(f)', title: 'Who pays the tax?', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(f)** Find the effect of a rise in the tax $\tau$ on the price consumers pay, the price producers receive, and the quantity traded. Who bears the tax?`,
          working: [
            { title: 'Consumer price', why: '', math: t`\frac{\partial P^*}{\partial \tau} = \frac{e}{b+e} \in (0, 1)` },
            { title: 'Producer price', why: t`$P^* - \tau$.`, math: t`\frac{\partial (P^* - \tau)}{\partial \tau} = \frac{e}{b+e} - 1 = -\frac{b}{b+e} \in (-1, 0)` },
            { title: 'Quantity', why: '', math: t`\frac{\partial Q^*}{\partial \tau} = -\frac{be}{b+e} < 0` },
          ],
          result: t`Consumers bear the share $\frac{e}{b+e}$ and producers $\frac{b}{b+e}$; quantity falls.`,
          answer: [{ heading: 'Interpretation', list: [
            t`The tax shifts supply up by $\tau$. Consumers pay more and producers receive less; together the two changes add up to the full tax.`,
            t`**The less responsive side pays more.** If demand is very price-insensitive ($b$ small), consumers bear almost all of it.`,
            'It does not matter who legally pays the tax: incidence depends only on the slopes.',
          ] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'ma-q1g', method: 'comparative-statics-linear', label: '1(g)', title: 'More price-sensitive demand', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** Suppose buyers become more price-sensitive. Which parameter changes, and how do $P^*$ and $Q^*$ respond? Interpret.`,
          working: [
            { title: 'Parameter', why: t`Price sensitivity of demand is $b$.`, math: t`b \uparrow` },
            { title: 'Differentiate', why: 'Quotient rule.', math: [t`\frac{\partial P^*}{\partial b} = -\frac{a + cY - d + e\tau}{(b+e)^2} = -\frac{P^*}{b+e} < 0`, t`\frac{\partial Q^*}{\partial b} = \frac{(d - e\tau)(b+e) - [e(a+cY) + b(d - e\tau)]}{(b+e)^2} = -\frac{eP^*}{b+e} < 0`] },
          ],
          result: 'Both price and quantity fall.',
          answer: [{ heading: 'Interpretation', paras: [t`A steeper fall in quantity demanded as price rises rotates demand inward around its intercept. At the old price, buyers now want less, so the market clears at a lower price and a lower quantity.`] }],
          formulas: ['comparative-statics'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q2 */
    {
      number: 2,
      topic: 'Cost minimisation with a variable wage',
      parts: [
        {
          id: 'ma-q2a', method: 'marginal-products', label: '2(a)', title: 'Marginal products and returns to scale', type: 'calc', marks: 5,
          topics: ['derivatives', 'interpretation'],
          prompt: t`A firm produces $y = K^{1/4}L^{3/4}$. Capital costs 3 per unit and labour costs $w$ per unit. It wants the cheapest way to produce $\bar{Y}$. **(a)** Compute and interpret the marginal products. What returns to scale does the technology have?`,
          working: [
            { title: 'Marginal products', why: '', math: t`MP_K = \tfrac14K^{-3/4}L^{3/4} > 0,\qquad MP_L = \tfrac34K^{1/4}L^{-1/4} > 0` },
            { title: 'Diminishing returns', why: '', math: t`\frac{\partial MP_K}{\partial K} = -\tfrac{3}{16}K^{-7/4}L^{3/4} < 0,\qquad \frac{\partial MP_L}{\partial L} = -\tfrac{3}{16}K^{1/4}L^{-5/4} < 0` },
            { title: 'Returns to scale', why: t`Scale both inputs by $s$.`, math: t`(sK)^{1/4}(sL)^{3/4} = s\,K^{1/4}L^{3/4}` },
          ],
          result: 'Positive, diminishing marginal products; constant returns to scale (exponents sum to 1).',
          formulas: ['differentiation-rules'],
        },
        {
          id: 'ma-q2b', method: 'lagrangian-setup', label: '2(b)', title: 'Problem and Lagrangian', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(b)** Write down the firm's problem and the Lagrangian.`,
          working: [
            { title: 'Problem', why: '', math: t`\min_{K,L}\ 3K + wL\quad\text{s.t.}\quad K^{1/4}L^{3/4} = \bar{Y}` },
            { title: 'Lagrangian', why: '', math: t`\mathcal{L} = 3K + wL + \lambda\big(\bar{Y} - K^{1/4}L^{3/4}\big)` },
          ],
          result: t`$\mathcal{L} = 3K + wL + \lambda(\bar{Y} - K^{1/4}L^{3/4})$`,
          formulas: ['lagrangian'],
        },
        {
          id: 'ma-q2c', method: 'optimum-graph', label: '2(c)', title: 'Sketch', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(c)** Sketch the problem and describe the properties of the solution.`,
          answer: [{ heading: 'Sketch and properties', list: [
            t`Convex isoquant $K^{1/4}L^{3/4} = \bar{Y}$ and parallel isocost lines $3K + wL = C$ (slope $-w/3$ with $K$ on the vertical axis).`,
            t`The optimum is the tangency with the lowest isocost: $MRTS = \frac{MP_L}{MP_K} = \frac{w}{3}$.`,
            'Interior, unique, and the output constraint binds.',
            'A higher wage makes the isocost steeper, sliding the tangency towards more capital and less labour.',
          ] }],
        },
        {
          id: 'ma-q2d', method: 'lagrange-foc', label: '2(d)', title: 'FOCs and solution', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(d)** Write the first-order conditions and find $K^*$, $L^*$ and $\lambda^*$.`,
          working: [
            { title: 'FOCs', why: '', math: [t`3 = \tfrac14\lambda K^{-3/4}L^{3/4}`, t`w = \tfrac34\lambda K^{1/4}L^{-1/4}`, t`K^{1/4}L^{3/4} = \bar{Y}`] },
            { title: 'Divide', why: '', math: t`\frac{3}{w} = \frac{L}{3K}\ \Rightarrow\ L = \frac{9K}{w}` },
            { title: 'Constraint', why: '', math: [t`K^{1/4}\left(\frac{9K}{w}\right)^{3/4} = K\left(\frac{9}{w}\right)^{3/4} = \bar{Y}`, t`K^* = \bar{Y}\left(\frac{w}{9}\right)^{3/4} = \frac{\sqrt3}{9}\,\bar{Y}w^{3/4}`] },
            { title: 'Labour', why: '', math: t`L^* = \frac{9K^*}{w} = \sqrt3\,\bar{Y}w^{-1/4}` },
            { title: 'Multiplier', why: t`From the $L$ condition with $K/L = w/9$.`, math: t`\lambda^* = \frac{4w}{3}\left(\frac{9}{w}\right)^{1/4} = \frac{4\sqrt3}{3}\,w^{3/4}` },
          ],
          result: t`$K^* = \frac{\sqrt3}{9}\bar{Y}w^{3/4}$, $\ L^* = \sqrt3\,\bar{Y}w^{-1/4}$, $\ \lambda^* = \frac{4\sqrt3}{3}w^{3/4} \approx 2.31\,w^{3/4}$`,
          formulas: ['lagrangian', 'cobb-douglas-solutions'],
        },
        {
          id: 'ma-q2e', method: 'lagrange-multiplier', label: '2(e)', title: 'Meaning of λ', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(e)** Interpret $\lambda^*$. What assumptions on $\bar{Y}$ and $w$ are needed?`,
          answer: [
            { heading: 'Interpretation', paras: [t`$\lambda^* = \frac{4\sqrt3}{3}w^{3/4}$ is **marginal cost**: the increase in minimum cost from producing one more unit. It is constant in output (constant returns) and rises with the wage, but less than proportionally because the firm substitutes towards capital.`] },
            { heading: 'Assumptions', list: [t`$\bar{Y} > 0$ and $w > 0$, so inputs are positive and the fractional powers are defined.`] },
          ],
          formulas: ['multiplier-lagrange'],
        },
        {
          id: 'ma-q2f', method: 'bordered-hessian', label: '2(f)', title: 'Second-order condition', type: 'calc', marks: 5,
          topics: ['second-order'],
          prompt: t`**(f)** Write the bordered Hessian and verify the candidate is a minimum. Global or local?`,
          working: [
            { title: 'Entries', why: '', math: [t`g_K = \tfrac14K^{-3/4}L^{3/4},\quad g_L = \tfrac34K^{1/4}L^{-1/4}`, t`\mathcal{L}_{KK} = \tfrac{3}{16}\lambda K^{-7/4}L^{3/4},\quad \mathcal{L}_{LL} = \tfrac{3}{16}\lambda K^{1/4}L^{-5/4},\quad \mathcal{L}_{KL} = -\tfrac{3}{16}\lambda K^{-3/4}L^{-1/4}`] },
            { title: 'Bordered Hessian', why: '', math: t`\bar{H} = \begin{bmatrix} 0 & g_K & g_L \\ g_K & \mathcal{L}_{KK} & \mathcal{L}_{KL} \\ g_L & \mathcal{L}_{KL} & \mathcal{L}_{LL} \end{bmatrix}` },
            { title: 'Determinant', why: '', math: t`|\bar{H}| = -g_K^2\mathcal{L}_{LL} + 2g_Kg_L\mathcal{L}_{KL} - g_L^2\mathcal{L}_{KK} = -\frac{3\lambda}{16}K^{-5/4}L^{1/4} < 0` },
          ],
          result: t`$|\bar{H}| < 0$: a minimum; global, because the isoquant is convex (Cobb-Douglas is quasi-concave) and cost is linear.`,
          formulas: ['bordered-hessian'],
        },
        {
          id: 'ma-q2g', method: 'comparative-statics-optimum', label: '2(g)', title: 'Effects of w and Ȳ', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** How do $K^*$ and $L^*$ respond to a higher wage, and to a higher output target? Interpret.`,
          working: [
            { title: 'Wage', why: '', math: t`\frac{\partial K^*}{\partial w} = \frac{\sqrt3}{12}\bar{Y}w^{-1/4} > 0,\qquad \frac{\partial L^*}{\partial w} = -\frac{\sqrt3}{4}\bar{Y}w^{-5/4} < 0` },
            { title: 'Output', why: '', math: t`\frac{\partial K^*}{\partial \bar{Y}} = \frac{\sqrt3}{9}w^{3/4} > 0,\qquad \frac{\partial L^*}{\partial \bar{Y}} = \sqrt3\,w^{-1/4} > 0` },
          ],
          result: 'A higher wage: less labour, more capital. More output: more of both, proportionally.',
          answer: [{ heading: 'Interpretation', paras: ['Pure substitution away from the dearer input (output is held fixed). Constant returns mean the input mix depends only on relative prices, so scaling output scales both inputs.'] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'ma-q2h', method: 'value-function', label: '2(h)', title: 'Cost function', type: 'calc', marks: 5,
          topics: ['value-function'],
          prompt: t`**(h)** Find the value function and its derivatives with respect to $\bar{Y}$ and $w$. Interpret.`,
          working: [
            { title: 'Cost function', why: '', math: t`C^* = 3K^* + wL^* = \frac{\sqrt3}{3}\bar{Y}w^{3/4} + \sqrt3\,\bar{Y}w^{3/4} = \frac{4\sqrt3}{3}\,\bar{Y}w^{3/4}` },
            { title: 'Derivatives', why: '', math: t`\frac{\partial C^*}{\partial \bar{Y}} = \frac{4\sqrt3}{3}w^{3/4} = \lambda^*,\qquad \frac{\partial C^*}{\partial w} = \sqrt3\,\bar{Y}w^{-1/4} = L^*` },
          ],
          result: t`$C^* = \frac{4\sqrt3}{3}\bar{Y}w^{3/4}$; $\partial C^*/\partial\bar{Y} = \lambda^*$; $\partial C^*/\partial w = L^*$ (Shephard's lemma)`,
          formulas: ['envelope'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q3 */
    {
      number: 3,
      topic: 'Inverse, Hessian, implicit differentiation and integrals',
      parts: [
        {
          id: 'ma-q3a', method: ['matrix-inverse', 'matrix-form'], label: '3(a)', title: 'Solve a system with an inverse', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(a)** Let $A = \begin{bmatrix} 3 & 2 \\ 5 & 4 \end{bmatrix}$. Find $A^{-1}$ and use it to solve $3x + 2y = 7$, $\ 5x + 4y = 13$.`,
          working: [
            { title: 'Inverse', why: t`$|A| = 12 - 10 = 2$.`, math: t`A^{-1} = \frac12\begin{bmatrix} 4 & -2 \\ -5 & 3 \end{bmatrix}` },
            { title: 'Solve', why: t`$\mathbf{x} = A^{-1}\mathbf{d}$.`, math: t`\begin{bmatrix} x \\ y \end{bmatrix} = \frac12\begin{bmatrix} 4(7) - 2(13) \\ -5(7) + 3(13) \end{bmatrix} = \frac12\begin{bmatrix} 2 \\ 4 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}` },
          ],
          result: t`$A^{-1} = \begin{bmatrix} 2 & -1 \\ -2.5 & 1.5 \end{bmatrix}$; $(x, y) = (1, 2)$`,
          formulas: ['inverse'],
        },
        {
          id: 'ma-q3b', method: 'unconstrained-hessian', label: '3(b)', title: 'Classify stationary points', type: 'calc', marks: 5,
          topics: ['unconstrained', 'second-order'],
          prompt: t`**(b)** Find and classify the stationary points of $f(x, y) = x^3 - 12x + y^2 - 4y$.`,
          working: [
            { title: 'FOCs', why: '', math: t`f_x = 3x^2 - 12 = 0 \Rightarrow x = \pm 2,\qquad f_y = 2y - 4 = 0 \Rightarrow y = 2` },
            { title: 'Hessian', why: '', math: t`H = \begin{bmatrix} 6x & 0 \\ 0 & 2 \end{bmatrix}` },
            { title: 'At (2, 2)', why: '', math: t`|H_1| = 12 > 0,\ |H_2| = 24 > 0\ \Rightarrow\ \text{minimum},\ f = -20` },
            { title: 'At (−2, 2)', why: '', math: t`|H_2| = -24 < 0\ \Rightarrow\ \text{saddle point},\ f = 12` },
          ],
          result: t`$(2, 2)$ is a local minimum ($f = -20$); $(-2, 2)$ is a saddle point.`,
          tips: ['The minimum is only local: $f \\to -\\infty$ as $x \\to -\\infty$.'],
          formulas: ['hessian'],
        },
        {
          id: 'ma-q3c', method: 'implicit-differentiation', label: '3(c)', title: 'Implicit differentiation', type: 'calc', marks: 5,
          topics: ['derivatives'],
          prompt: t`**(c)** The equation $x^2y + 2y^3 - 3x = 0$ defines $y$ as a function of $x$ near $(1, 1)$. Find $dy/dx$ and evaluate it at $(1, 1)$.`,
          working: [
            { title: 'Partials', why: t`$F(x, y) = x^2y + 2y^3 - 3x$.`, math: t`F_x = 2xy - 3,\qquad F_y = x^2 + 6y^2` },
            { title: 'Implicit function rule', why: '', math: t`\frac{dy}{dx} = -\frac{F_x}{F_y} = -\frac{2xy - 3}{x^2 + 6y^2}` },
            { title: 'At (1, 1)', why: t`Check: $1 + 2 - 3 = 0$ ✓.`, math: t`\frac{dy}{dx} = -\frac{2 - 3}{1 + 6} = \frac17` },
          ],
          result: t`$\dfrac{dy}{dx} = -\dfrac{2xy - 3}{x^2 + 6y^2}$; at $(1,1)$ it equals $\tfrac17$.`,
        },
        {
          id: 'ma-q3d', method: 'integration-by-parts', label: '3(d)', title: 'Integral by parts', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(d)** Compute $\displaystyle\int_1^e x\ln x\,dx$.`,
          working: [
            { title: 'Parts', why: t`$u = \ln x$, $dv = x\,dx$: $du = dx/x$, $v = x^2/2$.`, math: t`\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int \frac{x}{2}dx = \frac{x^2}{2}\ln x - \frac{x^2}{4}` },
            { title: 'Evaluate', why: t`$\ln e = 1$, $\ln 1 = 0$.`, math: t`\Big(\frac{e^2}{2} - \frac{e^2}{4}\Big) - \Big(0 - \frac14\Big) = \frac{e^2 + 1}{4}` },
          ],
          result: t`$\dfrac{e^2 + 1}{4} \approx 2.097$`,
          formulas: ['integration-rules'],
        },
        {
          id: 'ma-q3e', method: 'improper-integral', label: '3(e)', title: 'Convergent vs divergent', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(e)** Compute $\displaystyle\int_1^\infty \frac{6}{x^4}\,dx$ and compare its convergence with $\displaystyle\int_1^\infty \frac{1}{x}\,dx$.`,
          working: [
            { title: 'First integral', why: '', math: t`\lim_{b\to\infty}\Big[-\frac{2}{x^3}\Big]_1^b = 0 - (-2) = 2` },
            { title: 'Second integral', why: '', math: t`\lim_{b\to\infty}\big[\ln x\big]_1^b = \infty` },
          ],
          result: t`$\int_1^\infty 6x^{-4}dx = 2$ converges; $\int_1^\infty x^{-1}dx$ diverges.`,
          answer: [{ heading: 'Why', paras: [t`$\int_1^\infty x^{-p}dx$ converges only if $p > 1$: the integrand must fall fast enough. $p = 4$ does; $p = 1$ does not.`] }],
          formulas: ['improper'],
        },
      ],
    },
  ],
};
