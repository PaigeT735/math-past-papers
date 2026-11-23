import { t } from '../../lib/tag.js';

/**
 * Predicted mock B for December 2026: the "pattern breaks" paper.
 * Macro again in Q1 (IS–LM), the consumer side again in Q2 but as expenditure minimisation,
 * and the Q3 skills not yet examined.
 */
const model = t`$$\begin{aligned} Y &= C + I + G_0, & C &= a + b(1-t)Y, & I &= I_0 - hr \\ \frac{M_0}{P_0} &= kY - lr \end{aligned}$$`;
const s = t`1 - b(1-t)`;
const Dn = t`l\big(1 - b(1-t)\big) + hk`;

export default {
  kind: 'paper',
  practice: true,
  id: 'mock-2026-b',
  title: 'Mock 2026 B (if the pattern breaks)',
  short: 'Mock B',
  accent: 'games',
  summary: t`A second predicted paper for the case where the alternations stop: an **IS–LM** macro model (Q1, 35 marks), the consumer problem as **expenditure minimisation** (Q2, 40 marks), and a Q3 (25 marks) with non-commuting products, a 3×3 determinant and Cramer, a Jacobian determinant, a total differential with elasticities and two integrals. Two hours, answer all three questions.`,
  meta: [['Status', 'Predicted mock with full solutions'], ['Format', '2 hours, all three questions, 5 marks per part']],
  questions: [
    /* ------------------------------------------------------------------ Q1 */
    {
      number: 1,
      topic: 'IS–LM model',
      parts: [
        {
          id: 'mb-q1a', method: 'parameter-intuition', label: '1(a)', title: 'Parameter signs', type: 'essay', marks: 5,
          topics: ['linear-models', 'interpretation'],
          prompt: t`Consider the closed-economy model ${model} where $Y$ (income) and $r$ (interest rate) are endogenous, $G_0$, $I_0$, $M_0$ and the price level $P_0$ are exogenous, and $a, b, t, h, k, l > 0$ with $b, t < 1$. **(a)** Give the economic meaning of $h$, $k$ and $l$, and explain why $0 < b(1-t) < 1$.`,
          answer: [{ heading: 'Meaning', list: [
            t`$h$: investment falls when borrowing costs rise (interest sensitivity of investment).`,
            t`$k$: money demand rises with income (more transactions).`,
            t`$l$: money demand falls when the interest rate rises (the opportunity cost of holding money).`,
            t`$b(1-t)$ is the share of each extra euro of income that is consumed after tax. It is below 1 because people save part and the state taxes part, which keeps the multiplier finite and the determinant non-zero.`,
          ] }],
        },
        {
          id: 'mb-q1b', method: 'matrix-form', label: '1(b)', title: 'Matrix form', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(b)** Reduce the model to two equations (IS and LM) and write it in matrix form with variables $(Y, r)$.`,
          working: [
            { title: 'IS curve', why: 'Substitute $C$ and $I$ into the income identity.', math: t`\big(1 - b(1-t)\big)Y + hr = a + I_0 + G_0` },
            { title: 'LM curve', why: '', math: t`kY - lr = \frac{M_0}{P_0}` },
            { title: 'Matrix form', why: '', math: t`\begin{bmatrix} 1 - b(1-t) & h \\ k & -l \end{bmatrix}\begin{bmatrix} Y \\ r \end{bmatrix} = \begin{bmatrix} a + I_0 + G_0 \\ M_0/P_0 \end{bmatrix}` },
          ],
          result: t`$A = \begin{bmatrix} ${s} & h \\ k & -l \end{bmatrix}$`,
          formulas: ['matrix-form'],
        },
        {
          id: 'mb-q1c', method: 'determinant-meaning', label: '1(c)', title: 'Determinant', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(c)** Compute $|A|$, sign it, and explain what it implies.`,
          working: [{ title: 'Determinant', why: '', math: t`|A| = -l\big(1 - b(1-t)\big) - hk < 0` }],
          result: t`$|A| = -\big[${Dn}\big] < 0$`,
          answer: [{ heading: 'Implication', paras: [t`Every term is positive, so $|A| \neq 0$: the IS curve (downward sloping) and the LM curve (upward sloping) cross exactly once, giving a unique equilibrium. Write $D = ${Dn} > 0$, so $|A| = -D$.`] }],
          formulas: ['determinant'],
        },
        {
          id: 'mb-q1d', method: 'cramers-rule', label: '1(d)', title: "Y* and r* by Cramer's rule", type: 'calc', marks: 5,
          topics: ['cramer'],
          prompt: t`**(d)** Find $Y^*$ and $r^*$ using Cramer's rule. Let $A_0 = a + I_0 + G_0$.`,
          working: [
            { title: 'Y*', why: '', math: t`Y^* = \frac{\begin{vmatrix} A_0 & h \\ M_0/P_0 & -l \end{vmatrix}}{-D} = \frac{lA_0 + hM_0/P_0}{D}` },
            { title: 'r*', why: '', math: t`r^* = \frac{\begin{vmatrix} ${s} & A_0 \\ k & M_0/P_0 \end{vmatrix}}{-D} = \frac{kA_0 - \big(${s}\big)M_0/P_0}{D}` },
          ],
          result: t`$Y^* = \dfrac{lA_0 + hM_0/P_0}{D}$, $\ r^* = \dfrac{kA_0 - (${s})M_0/P_0}{D}$, $\ D = ${Dn}$`,
          formulas: ['cramer'],
        },
        {
          id: 'mb-q1e', method: 'comparative-statics-linear', label: '1(e)', title: 'Fiscal policy and crowding out', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(e)** Find $\partial Y^*/\partial G_0$ and $\partial r^*/\partial G_0$. Compare the fiscal multiplier with the simple multiplier $1/(1 - b(1-t))$.`,
          working: [
            { title: 'Differentiate', why: t`$G_0$ enters through $A_0$.`, math: t`\frac{\partial Y^*}{\partial G_0} = \frac{l}{D} > 0,\qquad \frac{\partial r^*}{\partial G_0} = \frac{k}{D} > 0` },
            { title: 'Compare', why: t`Divide top and bottom by $l$.`, math: t`\frac{l}{l\big(1 - b(1-t)\big) + hk} = \frac{1}{1 - b(1-t) + hk/l} < \frac{1}{1 - b(1-t)}` },
          ],
          result: 'Income and the interest rate both rise; the multiplier is smaller than the simple one.',
          answer: [{ heading: 'Interpretation', paras: [t`Higher spending raises income, which raises money demand; with a fixed money supply the interest rate rises and **crowds out** some private investment. The term $hk/l$ measures the leak through crowding out.`] }],
          formulas: ['comparative-statics', 'multiplier'],
        },
        {
          id: 'mb-q1f', method: 'comparative-statics-linear', label: '1(f)', title: 'Monetary policy', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(f)** Find the effect of a rise in the money supply $M_0$ on $Y^*$ and $r^*$. Interpret.`,
          working: [{ title: 'Differentiate', why: '', math: t`\frac{\partial Y^*}{\partial M_0} = \frac{h}{P_0D} > 0,\qquad \frac{\partial r^*}{\partial M_0} = -\frac{1 - b(1-t)}{P_0D} < 0` }],
          result: 'More money lowers the interest rate and raises income.',
          answer: [{ heading: 'Interpretation', paras: ['Extra money must be held, so the interest rate falls until people want to hold it; cheaper borrowing raises investment, and the multiplier raises income further.'] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'mb-q1g', method: 'comparative-statics-linear', label: '1(g)', title: 'Special cases', type: 'essay', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** What happens to the effectiveness of monetary policy if investment does not respond to the interest rate ($h \to 0$)? And to the fiscal multiplier if money demand is extremely interest-sensitive ($l \to \infty$)?`,
          answer: [{ heading: 'Answer', list: [
            t`$h \to 0$: $\partial Y^*/\partial M_0 = h/(P_0D) \to 0$. Monetary policy can move the interest rate but not income, because investment ignores it.`,
            t`$l \to \infty$ (a liquidity trap): $\partial Y^*/\partial G_0 = \frac{1}{1 - b(1-t) + hk/l} \to \frac{1}{1 - b(1-t)}$. There is no crowding out, so fiscal policy has the full simple multiplier.`,
          ] }],
          formulas: ['comparative-statics'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q2 */
    {
      number: 2,
      topic: 'Expenditure minimisation',
      parts: [
        {
          id: 'mb-q2a', method: 'marginal-products', label: '2(a)', title: 'Marginal utilities and MRS', type: 'calc', marks: 5,
          topics: ['derivatives', 'interpretation'],
          prompt: t`A consumer has utility $U = x_1^{1/2}x_2^{1/2}$. Good 1 costs $p_1$ and good 2 costs 4. The consumer wants the cheapest way to reach utility $\bar{U}$. **(a)** Find the marginal utilities and the MRS, and interpret.`,
          working: [
            { title: 'Marginal utilities', why: '', math: t`MU_1 = \tfrac12x_1^{-1/2}x_2^{1/2} > 0,\qquad MU_2 = \tfrac12x_1^{1/2}x_2^{-1/2} > 0` },
            { title: 'MRS', why: '', math: t`MRS = \frac{MU_1}{MU_2} = \frac{x_2}{x_1}` },
          ],
          result: t`Positive, diminishing marginal utilities; $MRS = x_2/x_1$, falling as $x_1$ rises (convex indifference curves).`,
          formulas: ['differentiation-rules'],
        },
        {
          id: 'mb-q2b', method: 'lagrangian-setup', label: '2(b)', title: 'Problem and Lagrangian', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(b)** Write down the expenditure-minimisation problem and its Lagrangian.`,
          working: [
            { title: 'Problem', why: '', math: t`\min_{x_1,x_2}\ p_1x_1 + 4x_2\quad\text{s.t.}\quad x_1^{1/2}x_2^{1/2} = \bar{U}` },
            { title: 'Lagrangian', why: '', math: t`\mathcal{L} = p_1x_1 + 4x_2 + \lambda\big(\bar{U} - x_1^{1/2}x_2^{1/2}\big)` },
          ],
          result: t`$\mathcal{L} = p_1x_1 + 4x_2 + \lambda(\bar{U} - x_1^{1/2}x_2^{1/2})$`,
          formulas: ['lagrangian'],
        },
        {
          id: 'mb-q2c', method: 'optimum-graph', label: '2(c)', title: 'Sketch', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(c)** Sketch the problem and describe the solution.`,
          answer: [{ heading: 'Sketch and properties', list: [
            t`One fixed indifference curve $U = \bar{U}$ and several parallel budget (iso-expenditure) lines with slope $-p_1/4$; lower lines mean less spending.`,
            t`The optimum is the tangency with the lowest line: $MRS = x_2/x_1 = p_1/4$.`,
            'This is the **dual** of utility maximisation: same tangency, but utility is fixed and spending is minimised.',
            'Interior, unique, global minimum (convex indifference curve, linear expenditure).',
          ] }],
        },
        {
          id: 'mb-q2d', method: 'lagrange-foc', label: '2(d)', title: 'FOCs and Hicksian demands', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(d)** Find the first-order conditions and solve for $x_1^h$, $x_2^h$ and $\lambda^*$.`,
          working: [
            { title: 'FOCs', why: '', math: [t`p_1 = \tfrac12\lambda x_1^{-1/2}x_2^{1/2}`, t`4 = \tfrac12\lambda x_1^{1/2}x_2^{-1/2}`, t`x_1^{1/2}x_2^{1/2} = \bar{U}`] },
            { title: 'Divide', why: '', math: t`\frac{p_1}{4} = \frac{x_2}{x_1}\ \Rightarrow\ x_2 = \frac{p_1}{4}x_1` },
            { title: 'Constraint', why: '', math: [t`x_1^{1/2}\Big(\frac{p_1}{4}x_1\Big)^{1/2} = \frac{\sqrt{p_1}}{2}x_1 = \bar{U}`, t`x_1^h = \frac{2\bar{U}}{\sqrt{p_1}},\qquad x_2^h = \frac{\sqrt{p_1}}{2}\bar{U}`] },
            { title: 'Multiplier', why: '', math: t`\lambda^* = 2p_1\sqrt{\frac{x_1}{x_2}} = 2p_1\cdot\frac{2}{\sqrt{p_1}} = 4\sqrt{p_1}` },
          ],
          result: t`$x_1^h = 2\bar{U}/\sqrt{p_1}$, $\ x_2^h = \bar{U}\sqrt{p_1}/2$, $\ \lambda^* = 4\sqrt{p_1}$`,
          formulas: ['lagrangian'],
        },
        {
          id: 'mb-q2e', method: 'lagrange-multiplier', label: '2(e)', title: 'Meaning of λ', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(e)** Interpret $\lambda^*$. What must be assumed about $\bar{U}$ and $p_1$?`,
          answer: [{ heading: 'Answer', list: [
            t`$\lambda^* = 4\sqrt{p_1} = \partial E^*/\partial\bar{U}$: the extra spending needed for one more unit of utility (the marginal cost of utility). It is the reciprocal of the marginal utility of income in the matching utility-maximisation problem.`,
            t`$\bar{U} > 0$ and $p_1 > 0$ for positive, finite quantities.`,
          ] }],
          formulas: ['multiplier-lagrange'],
        },
        {
          id: 'mb-q2f', method: 'bordered-hessian', label: '2(f)', title: 'Second-order condition', type: 'calc', marks: 5,
          topics: ['second-order'],
          prompt: t`**(f)** Write the bordered Hessian and check the candidate is a minimum. Global or local?`,
          working: [
            { title: 'Entries', why: '', math: [t`g_1 = \tfrac12\sqrt{x_2/x_1},\quad g_2 = \tfrac12\sqrt{x_1/x_2}`, t`\mathcal{L}_{11} = \tfrac{\lambda}{4}x_1^{-3/2}x_2^{1/2},\quad \mathcal{L}_{22} = \tfrac{\lambda}{4}x_1^{1/2}x_2^{-3/2},\quad \mathcal{L}_{12} = -\tfrac{\lambda}{4}x_1^{-1/2}x_2^{-1/2}`] },
            { title: 'Determinant', why: '', math: t`|\bar{H}| = -\frac{\lambda}{4\sqrt{x_1x_2}} < 0;\qquad \text{at the optimum } |\bar{H}| = -\frac{\sqrt{p_1}}{\bar{U}}` },
          ],
          result: t`$|\bar{H}| < 0$: a minimum, and global (quasi-concave utility, linear expenditure).`,
          formulas: ['bordered-hessian'],
        },
        {
          id: 'mb-q2g', method: 'comparative-statics-optimum', label: '2(g)', title: 'Effects of p₁ and Ū', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** How do $x_1^h$ and $x_2^h$ change when $p_1$ rises, and when $\bar{U}$ rises? Interpret.`,
          working: [
            { title: 'Price', why: '', math: t`\frac{\partial x_1^h}{\partial p_1} = -\bar{U}p_1^{-3/2} < 0,\qquad \frac{\partial x_2^h}{\partial p_1} = \frac{\bar{U}}{4\sqrt{p_1}} > 0` },
            { title: 'Utility target', why: '', math: t`\frac{\partial x_1^h}{\partial \bar{U}} = \frac{2}{\sqrt{p_1}} > 0,\qquad \frac{\partial x_2^h}{\partial \bar{U}} = \frac{\sqrt{p_1}}{2} > 0` },
          ],
          result: 'Compensated demand for good 1 falls with its price; good 2 rises (substitutes); both rise with the utility target.',
          answer: [{ heading: 'Interpretation', paras: [t`These are **Hicksian (compensated)** demands: utility is held fixed, so a price rise produces a pure **substitution effect**, always negative for the good's own price. Unlike the 2025 Marshallian demand, good 2 now responds to $p_1$.`] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'mb-q2h', method: 'value-function', label: '2(h)', title: 'Expenditure function', type: 'calc', marks: 5,
          topics: ['value-function'],
          prompt: t`**(h)** Find the value function (expenditure function) and its derivatives with respect to $\bar{U}$ and $p_1$. Interpret.`,
          working: [
            { title: 'Expenditure function', why: '', math: t`E^* = p_1\frac{2\bar{U}}{\sqrt{p_1}} + 4\frac{\sqrt{p_1}}{2}\bar{U} = 4\bar{U}\sqrt{p_1}` },
            { title: 'Derivatives', why: '', math: t`\frac{\partial E^*}{\partial \bar{U}} = 4\sqrt{p_1} = \lambda^*,\qquad \frac{\partial E^*}{\partial p_1} = \frac{2\bar{U}}{\sqrt{p_1}} = x_1^h` },
          ],
          result: t`$E^* = 4\bar{U}\sqrt{p_1}$; derivative in $\bar{U}$ is $\lambda^*$; derivative in $p_1$ is $x_1^h$ (Shephard's lemma).`,
          formulas: ['envelope'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q3 */
    {
      number: 3,
      topic: 'Matrices, dependence, differentials and integrals',
      parts: [
        {
          id: 'mb-q3a', method: 'matrix-multiplication', label: '3(a)', title: 'AB and BA', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(a)** Let $A = \begin{bmatrix} 1 & 2 \\ 0 & -1 \\ 3 & 1 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & 0 & 1 \\ -1 & 4 & 2 \end{bmatrix}$. Compute $AB$ and $BA$. Comment.`,
          working: [
            { title: 'AB is (3×2)(2×3) = 3×3', why: '', math: t`AB = \begin{bmatrix} 0 & 8 & 5 \\ 1 & -4 & -2 \\ 5 & 4 & 5 \end{bmatrix}` },
            { title: 'BA is (2×3)(3×2) = 2×2', why: '', math: t`BA = \begin{bmatrix} 5 & 5 \\ 5 & -4 \end{bmatrix}` },
          ],
          result: t`Both exist but have different sizes, so $AB \neq BA$.`,
          formulas: ['matrix-product'],
        },
        {
          id: 'mb-q3b', method: ['determinant-meaning', 'cramers-rule'], label: '3(b)', title: '3×3 determinant and one unknown', type: 'calc', marks: 5,
          topics: ['matrix-algebra', 'cramer'],
          prompt: t`**(b)** For $M = \begin{bmatrix} 2 & 1 & 3 \\ 0 & -1 & 4 \\ 1 & 2 & 1 \end{bmatrix}$, compute $|M|$. Does $M\mathbf{x} = (1, 2, 3)^T$ have a unique solution? Find $x_3$ by Cramer's rule.`,
          working: [
            { title: 'Determinant (row 1)', why: '', math: t`|M| = 2(-1 - 8) - 1(0 - 4) + 3(0 + 1) = -18 + 4 + 3 = -11` },
            { title: 'Replace column 3', why: '', math: t`|M_3| = \begin{vmatrix} 2 & 1 & 1 \\ 0 & -1 & 2 \\ 1 & 2 & 3 \end{vmatrix} = 2(-3 - 4) - 1(0 - 2) + 1(0 + 1) = -11` },
            { title: 'Divide', why: '', math: t`x_3 = \frac{-11}{-11} = 1` },
          ],
          result: t`$|M| = -11 \neq 0$: unique solution; $x_3 = 1$ (the full solution is $(-2, 2, 1)$).`,
          formulas: ['determinant', 'cramer'],
        },
        {
          id: 'mb-q3c', method: 'jacobian', label: '3(c)', title: 'Jacobian determinant', type: 'calc', marks: 5,
          topics: ['derivatives', 'matrix-algebra'],
          prompt: t`**(c)** Use the Jacobian determinant to test whether $y_1 = 2x_1 + 3x_2$ and $y_2 = 4x_1^2 + 12x_1x_2 + 9x_2^2$ are functionally dependent.`,
          working: [
            { title: 'Jacobian', why: '', math: t`|J| = \begin{vmatrix} 2 & 3 \\ 8x_1 + 12x_2 & 12x_1 + 18x_2 \end{vmatrix} = 24x_1 + 36x_2 - 24x_1 - 36x_2 = 0` },
          ],
          result: t`$|J| \equiv 0$: the functions are dependent; indeed $y_2 = y_1^2$.`,
          formulas: ['jacobian'],
        },
        {
          id: 'mb-q3d', method: 'total-differential', label: '3(d)', title: 'Total differential and elasticities', type: 'calc', marks: 5,
          topics: ['derivatives'],
          prompt: t`**(d)** For $U = x^{0.3}y^{0.7}$, find $dU$ and the elasticities of $U$ with respect to $x$ and $y$.`,
          working: [
            { title: 'Total differential', why: '', math: t`dU = 0.3x^{-0.7}y^{0.7}\,dx + 0.7x^{0.3}y^{-0.3}\,dy` },
            { title: 'Elasticities', why: t`$\varepsilon_x = \frac{\partial U}{\partial x}\frac{x}{U}$.`, math: t`\varepsilon_x = 0.3,\qquad \varepsilon_y = 0.7` },
          ],
          result: 'A 1% rise in $x$ raises $U$ by 0.3%; in $y$, by 0.7%. For Cobb-Douglas the elasticities are the exponents.',
          formulas: ['total-differential'],
        },
        {
          id: 'mb-q3e', method: ['integration-substitution', 'improper-integral'], label: '3(e)', title: 'Two integrals', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(e)** Compute (i) $\displaystyle\int_0^2 xe^{x^2}dx$ and (ii) $\displaystyle\int_0^4 \frac{1}{\sqrt{x}}\,dx$, commenting on convergence where relevant.`,
          working: [
            { title: '(i) Substitution', why: t`$u = x^2$, $du = 2x\,dx$; limits 0 to 4.`, math: t`\frac12\int_0^4 e^u\,du = \frac{e^4 - 1}{2} \approx 26.80` },
            { title: '(ii) Improper at 0', why: t`$x^{-1/2}$ is unbounded at $x = 0$.`, math: t`\lim_{\varepsilon\to0^+}\Big[2\sqrt{x}\Big]_\varepsilon^4 = 4 - 0 = 4` },
          ],
          result: t`(i) $\frac{e^4 - 1}{2}$; (ii) converges to 4 (since $p = \tfrac12 < 1$).`,
          formulas: ['integration-rules', 'improper'],
        },
      ],
    },
  ],
};
