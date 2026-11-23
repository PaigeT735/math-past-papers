import { t } from '../../lib/tag.js';

/**
 * ECU22031 Mathematical and Statistical Methods A — December 2025
 * 15 December 2025, 09:30–11:30, Professor Nicola Fontana. Answer ALL three questions.
 */
const model = t`$$\begin{aligned} Y &= C + I_0 + G_0 + (X_0 - M) \\ C &= a + b(Y - T) \\ T &= tY \\ M &= mY \end{aligned}$$`;
const D = t`1 - b(1-t) + m`;

export default {
  kind: 'paper',
  id: '2025-12',
  title: 'December 2025',
  short: 'Dec 2025',
  accent: 'monopoly',
  summary: t`15 December 2025, 2 hours, answer **all three** questions. Q1 (35): an open-economy income model solved with matrices and Cramer's rule. Q2 (40): utility maximisation with log Cobb-Douglas utility and the full Lagrangian toolkit. Q3 (25): matrix products, transposes, a Jacobian and two integrals (one by parts, one improper).`,
  meta: [['Module', 'ECU22031 Mathematical and Statistical Methods A'], ['Sitting', '15 December 2025, 09:30–11:30'], ['Rules', 'Answer all three questions; standard calculator only']],
  questions: [
    /* ------------------------------------------------------------------ Q1 */
    {
      number: 1,
      topic: 'Open-economy national income model',
      parts: [
        {
          id: 'd25-q1a', method: 'parameter-intuition', label: '1(a)', title: 'Why b, t and m are below 1', type: 'essay', marks: 5,
          topics: ['linear-models', 'interpretation'],
          prompt: t`Consider the model ${model} where $Y, C, T, M$ are endogenous and $G_0, I_0, X_0$ are exogenous. The parameters $a, b, t, m$ are positive, with $b, t, m < 1$. **(a)** What is the economic intuition behind imposing that $b$, $t$ and $m$ are all smaller than 1?`,
          approach: 'Name each parameter, give one economic reason per bound, then the mathematical consequence for the multiplier.',
          answer: [
            { heading: 'What each parameter is', list: [
              t`$b$ is the **marginal propensity to consume** out of disposable income: $\partial C/\partial (Y - T)$.`,
              t`$t$ is the **income tax rate**: the share of each euro of income taken in tax.`,
              t`$m$ is the **marginal propensity to import**: $\partial M/\partial Y$.`,
            ] },
            { heading: 'Why each is below 1', list: [
              t`$b < 1$: households spend only part of an extra euro of disposable income and **save** the rest.`,
              t`$t < 1$: the state cannot tax more than the whole of income; otherwise disposable income $Y(1-t)$ would be zero or negative.`,
              t`$m < 1$: only part of each extra euro of income is spent on foreign goods; some goes on domestic goods, saving and taxes.`,
            ] },
            { heading: 'Why it matters for the maths', paras: [t`Together with positivity these bounds make $b(1-t) < 1$, so the denominator $${D}$ is positive. The multiplier $1/(${D})$ is then positive and finite: the equilibrium exists, is unique, and income responds in the expected direction. Saving, taxes and imports are **leakages** from the circular flow, which is what keeps the multiplier finite.`] },
          ],
          tips: ['One reason per parameter plus one line about the multiplier is a full-mark answer.'],
          formulas: ['multiplier'],
        },
        {
          id: 'd25-q1b', method: 'matrix-form', label: '1(b)', title: 'Simplify and write in matrix form', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(b)** Simplify and write the model in matrix form. Call $A$ the 2×2 matrix of coefficients. List the endogenous variables in the order $(Y, C)$.`,
          approach: t`Substitute $T = tY$ and $M = mY$ to leave two equations in $Y$ and $C$, move the unknowns left, then write $A\mathbf{x} = \mathbf{d}$.`,
          working: [
            { title: 'Substitute taxes into consumption', why: t`$T = tY$, so disposable income is $(1-t)Y$.`, math: t`C = a + b(Y - tY) = a + b(1-t)Y` },
            { title: 'Substitute imports into the income identity', why: t`$M = mY$.`, math: t`Y = C + I_0 + G_0 + X_0 - mY` },
            { title: 'Move the endogenous variables to the left', why: 'Unknowns on the left, exogenous terms on the right.', math: [t`(1 + m)Y - C = I_0 + G_0 + X_0`, t`-b(1-t)Y + C = a`] },
            { title: 'Matrix form', why: t`Columns in the order $(Y, C)$.`, math: t`\underbrace{\begin{bmatrix} 1 + m & -1 \\ -b(1-t) & 1 \end{bmatrix}}_{A}\begin{bmatrix} Y \\ C \end{bmatrix} = \begin{bmatrix} I_0 + G_0 + X_0 \\ a \end{bmatrix}` },
          ],
          result: t`$A = \begin{bmatrix} 1 + m & -1 \\ -b(1-t) & 1 \end{bmatrix}$, $\mathbf{x} = (Y, C)^T$, $\mathbf{d} = (I_0 + G_0 + X_0,\ a)^T$`,
          tips: ['Multiplying out row 1 gives back the income identity; row 2 gives the consumption function. Check both.'],
          formulas: ['matrix-form'],
        },
        {
          id: 'd25-q1c', method: 'determinant-meaning', label: '1(c)', title: 'Determinant and what it implies', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(c)** Compute the determinant of $A$ and explain what the determinant value implies for the system of equations. What would happen if the determinant were equal to zero?`,
          working: [
            { title: 'Main diagonal minus the other diagonal', why: '2×2 determinant.', math: t`|A| = (1+m)(1) - (-1)\big(-b(1-t)\big) = 1 + m - b(1-t)` },
            { title: 'Sign it', why: t`$0 < b < 1$ and $0 < t < 1$ give $0 < b(1-t) < 1$, and $m > 0$.`, math: t`|A| = 1 - b(1-t) + m > 0` },
          ],
          result: t`$|A| = 1 - b(1-t) + m > 0$`,
          answer: [
            { heading: 'What it implies', list: [
              t`$|A| \neq 0$, so $A$ is **non-singular**: its rows are linearly independent and $A^{-1}$ exists.`,
              t`The system has a **unique** solution $\mathbf{x}^* = A^{-1}\mathbf{d}$, which we can find with Cramer's rule.`,
              t`$|A|$ is the denominator of the multiplier, so its positive sign also means income rises when autonomous spending rises.`,
            ] },
            { heading: 'If the determinant were zero', list: [
              t`$A$ would be **singular**: the two equations would be linearly dependent (parallel lines).`,
              t`There would be **no unique** equilibrium: either no solution (inconsistent equations) or infinitely many (the same line twice). $A^{-1}$ would not exist and Cramer's rule would fail (division by zero).`,
              t`Economically $|A| = 0$ would need $b(1-t) = 1 + m$, which the restrictions rule out.`,
            ] },
          ],
          formulas: ['determinant'],
        },
        {
          id: 'd25-q1d', method: 'cramers-rule', label: '1(d)', title: "Equilibrium Y* and C* by Cramer's rule", type: 'calc', marks: 5,
          topics: ['cramer', 'linear-models'],
          prompt: t`**(d)** Find the equilibrium quantities $Y^*$ and $C^*$ using Cramer's rule starting from the system in 1(b).`,
          working: [
            { title: 'Replace column 1 with the constants', why: t`For $Y^*$.`, math: t`|A_Y| = \begin{vmatrix} I_0 + G_0 + X_0 & -1 \\ a & 1 \end{vmatrix} = I_0 + G_0 + X_0 + a` },
            { title: 'Divide by the determinant', why: t`$|A| = ${D}$.`, math: t`Y^* = \frac{a + I_0 + G_0 + X_0}{1 - b(1-t) + m}` },
            { title: 'Replace column 2 with the constants', why: t`For $C^*$.`, math: t`|A_C| = \begin{vmatrix} 1 + m & I_0 + G_0 + X_0 \\ -b(1-t) & a \end{vmatrix} = (1+m)a + b(1-t)(I_0 + G_0 + X_0)` },
            { title: 'Divide by the determinant', why: '', math: t`C^* = \frac{(1+m)a + b(1-t)(I_0 + G_0 + X_0)}{1 - b(1-t) + m}` },
          ],
          result: t`$Y^* = \dfrac{a + I_0 + G_0 + X_0}{1 - b(1-t) + m}$, $\quad C^* = \dfrac{(1+m)a + b(1-t)(I_0 + G_0 + X_0)}{1 - b(1-t) + m}$`,
          answer: [{ heading: 'Check', paras: [t`$C^* = a + b(1-t)Y^*$: put $Y^*$ over the common denominator and you get the same numerator. Both values are positive because every term is positive.`] }],
          tips: [t`Read $Y^*$ as (autonomous spending) × (multiplier $1/(${D})$).`],
          formulas: ['cramer', 'multiplier'],
        },
        {
          id: 'd25-q1e', method: 'derived-endogenous', label: '1(e)', title: 'Equilibrium T* and M*', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(e)** Find the equilibrium quantities $T^*$ and $M^*$.`,
          working: [
            { title: 'Taxes', why: t`$T = tY$, evaluated at $Y^*$.`, math: t`T^* = tY^* = \frac{t\,(a + I_0 + G_0 + X_0)}{1 - b(1-t) + m}` },
            { title: 'Imports', why: t`$M = mY$, evaluated at $Y^*$.`, math: t`M^* = mY^* = \frac{m\,(a + I_0 + G_0 + X_0)}{1 - b(1-t) + m}` },
          ],
          result: t`$T^* = tY^*$ and $M^* = mY^*$ as above; both positive and proportional to equilibrium income.`,
          formulas: ['multiplier'],
        },
        {
          id: 'd25-q1f', method: 'comparative-statics-linear', label: '1(f)', title: 'Effect of a rise in exports', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(f)** Find the impact of a rise in exports on equilibrium income $Y^*$ and consumption $C^*$. Interpret your results.`,
          working: [
            { title: 'Differentiate Y*', why: t`$X_0$ only appears in the numerator with coefficient 1.`, math: t`\frac{\partial Y^*}{\partial X_0} = \frac{1}{1 - b(1-t) + m} > 0` },
            { title: 'Differentiate C*', why: t`$X_0$ appears with coefficient $b(1-t)$.`, math: t`\frac{\partial C^*}{\partial X_0} = \frac{b(1-t)}{1 - b(1-t) + m} > 0` },
          ],
          result: t`$\partial Y^*/\partial X_0 = 1/(${D}) > 0$ and $\partial C^*/\partial X_0 = b(1-t)/(${D}) > 0$`,
          answer: [{ heading: 'Interpretation', list: [
            t`Exports are an injection of demand: income rises by the **open-economy multiplier** $1/(${D})$ for every extra euro of exports.`,
            t`Higher income raises disposable income, so consumption rises by $b(1-t)$ times the rise in income.`,
            t`Because saving, taxes and imports leak out of each round of spending, the multiplier is smaller than in a closed economy without tax ($1/(1-b)$). It is greater than 1 only if $b(1-t) > m$.`,
          ] }],
          formulas: ['multiplier', 'comparative-statics'],
        },
        {
          id: 'd25-q1g', method: 'comparative-statics-linear', label: '1(g)', title: 'More import-sensitive economy', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** If imports become more sensitive to income (they grow more when income increases), what parameter is likely to change? How will this affect equilibrium income $Y^*$? Interpret your result.`,
          approach: t`The parameter is $m$, which sits in the **denominator**, so use the quotient (or chain) rule.`,
          working: [
            { title: 'Identify the parameter', why: t`$m = \partial M/\partial Y$ measures how much imports rise per euro of income.`, math: t`m \uparrow` },
            { title: 'Differentiate', why: t`Write $Y^* = (a + I_0 + G_0 + X_0)\,(${D})^{-1}$.`, math: t`\frac{\partial Y^*}{\partial m} = -\frac{a + I_0 + G_0 + X_0}{\big(1 - b(1-t) + m\big)^2} < 0` },
          ],
          result: t`$m$ rises, and $\partial Y^*/\partial m = -\dfrac{Y^*}{${D}} < 0$: equilibrium income falls.`,
          answer: [{ heading: 'Interpretation', paras: [t`A larger share of each extra euro is spent on foreign goods, so less of it becomes income for domestic producers. Imports are a bigger **leakage**, the multiplier $1/(${D})$ shrinks, and the same autonomous spending supports a lower equilibrium income. Consumption, taxes and imports at the new equilibrium all adjust accordingly.`] }],
          formulas: ['multiplier', 'comparative-statics'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q2 */
    {
      number: 2,
      topic: 'Utility maximisation with log Cobb-Douglas utility',
      parts: [
        {
          id: 'd25-q2a', method: 'marginal-products', label: '2(a)', title: 'Marginal utilities', type: 'calc', marks: 5,
          topics: ['derivatives', 'interpretation'],
          prompt: t`A consumer has utility $U(x_1, x_2) = \tfrac13\ln(x_1) + \tfrac23\ln(x_2)$. Each unit of $x_1$ costs $p_1$, each unit of $x_2$ costs 10, and income is $M$. **(a)** Find the marginal utility of each good. Interpret your results.`,
          working: [
            { title: 'Differentiate', why: t`$\frac{d}{dx}\ln x = \frac{1}{x}$.`, math: t`MU_1 = \frac{\partial U}{\partial x_1} = \frac{1}{3x_1},\qquad MU_2 = \frac{\partial U}{\partial x_2} = \frac{2}{3x_2}` },
            { title: 'Second derivatives', why: 'To show diminishing marginal utility.', math: t`\frac{\partial^2 U}{\partial x_1^2} = -\frac{1}{3x_1^2} < 0,\qquad \frac{\partial^2 U}{\partial x_2^2} = -\frac{2}{3x_2^2} < 0` },
          ],
          result: t`$MU_1 = \dfrac{1}{3x_1} > 0$, $MU_2 = \dfrac{2}{3x_2} > 0$, both falling as consumption rises`,
          answer: [{ heading: 'Interpretation', list: [
            'Both marginal utilities are positive: more of either good always raises utility (non-satiation).',
            'Both fall as the quantity rises: **diminishing marginal utility**, so each extra unit adds less than the previous one.',
            t`Each MU depends only on its own good (the utility is additively separable), and $x_2$ has twice the weight of $x_1$.`,
          ] }],
          formulas: ['differentiation-rules'],
        },
        {
          id: 'd25-q2b', method: 'lagrangian-setup', label: '2(b)', title: 'Problem and Lagrangian', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(b)** Write down the optimisation problem for an individual who wants to maximise utility from $x_1$ and $x_2$ under the relevant budget constraint. Write down the corresponding Lagrangian function.`,
          working: [
            { title: 'The problem', why: 'Maximise utility subject to spending equal to income.', math: t`\max_{x_1, x_2}\ \tfrac13\ln x_1 + \tfrac23\ln x_2\quad\text{s.t.}\quad p_1x_1 + 10x_2 = M` },
            { title: 'The Lagrangian', why: 'Objective plus $\\lambda$ times (income minus spending).', math: t`\mathcal{L}(x_1, x_2, \lambda) = \tfrac13\ln x_1 + \tfrac23\ln x_2 + \lambda\,(M - p_1x_1 - 10x_2)` },
          ],
          result: t`$\mathcal{L} = \tfrac13\ln x_1 + \tfrac23\ln x_2 + \lambda(M - p_1x_1 - 10x_2)$`,
          formulas: ['lagrangian'],
        },
        {
          id: 'd25-q2c', method: 'optimum-graph', label: '2(c)', title: 'Graph of the optimum', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(c)** Sketch a graphical representation of the constraint and the indifference curves. Describe, referring to the graph, the properties of the solution.`,
          answer: [
            { heading: 'What to draw', list: [
              t`Axes $x_1$ (horizontal) and $x_2$ (vertical).`,
              t`Budget line from $(0,\ M/10)$ to $(M/p_1,\ 0)$, slope $-p_1/10$.`,
              'Three convex indifference curves; the highest attainable one just touches the budget line.',
              t`The tangency point $E = (x_1^*, x_2^*)$ marked on the line.`,
            ] },
            { heading: 'Properties of the solution', list: [
              t`**Tangency:** at $E$, $MRS = \dfrac{MU_1}{MU_2} = \dfrac{p_1}{10}$: the rate at which the consumer will trade goods equals the market rate.`,
              t`**Interior:** log utility tends to $-\infty$ as either good goes to 0, so indifference curves never touch the axes and both $x_1^*, x_2^* > 0$.`,
              '**On the budget line:** non-satiation means all income is spent (the constraint binds).',
              '**Unique maximum:** strictly convex indifference curves and a straight budget line touch at one point only.',
            ] },
          ],
          formulas: ['lagrangian'],
        },
        {
          id: 'd25-q2d', method: 'lagrange-foc', label: '2(d)', title: 'FOCs and the solution', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(d)** Write down the first-order conditions for this problem and find $x_1^*$, $x_2^*$ and $\lambda^*$.`,
          working: [
            { title: 'First-order conditions', why: 'Differentiate $\\mathcal{L}$ with respect to $x_1$, $x_2$ and $\\lambda$.', math: [t`\mathcal{L}_{x_1} = \frac{1}{3x_1} - \lambda p_1 = 0`, t`\mathcal{L}_{x_2} = \frac{2}{3x_2} - 10\lambda = 0`, t`\mathcal{L}_{\lambda} = M - p_1x_1 - 10x_2 = 0`] },
            { title: 'Express each good in terms of λ', why: 'Rearrange the first two.', math: t`x_1 = \frac{1}{3\lambda p_1},\qquad x_2 = \frac{2}{30\lambda} = \frac{1}{15\lambda}` },
            { title: 'Substitute into the budget', why: 'One equation in $\\lambda$.', math: [t`p_1\cdot\frac{1}{3\lambda p_1} + 10\cdot\frac{1}{15\lambda} = \frac{1}{3\lambda} + \frac{2}{3\lambda} = \frac{1}{\lambda} = M`, t`\lambda^* = \frac{1}{M}`] },
            { title: 'Back out the quantities', why: t`Plug $\lambda^* = 1/M$ in.`, math: t`x_1^* = \frac{M}{3p_1},\qquad x_2^* = \frac{M}{15}` },
          ],
          result: t`$x_1^* = \dfrac{M}{3p_1}$, $\quad x_2^* = \dfrac{M}{15}$, $\quad \lambda^* = \dfrac{1}{M}$`,
          answer: [{ heading: 'Check', paras: [t`$p_1\cdot\frac{M}{3p_1} + 10\cdot\frac{M}{15} = \frac{M}{3} + \frac{2M}{3} = M$ ✓. One third of income goes on good 1 and two thirds on good 2, matching the utility weights.`] }],
          formulas: ['lagrangian', 'cobb-douglas-solutions'],
        },
        {
          id: 'd25-q2e', method: 'lagrange-multiplier', label: '2(e)', title: 'Meaning of λ and the assumptions', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(e)** What is the Lagrange multiplier? What information does it provide? Is there any assumption you need to make about $M$ and $p_1$ to make the optimal values of $x_1$ and $x_2$ economically meaningful?`,
          answer: [
            { heading: 'What it is', paras: [t`$\lambda$ is the variable attached to the constraint in the Lagrangian. At the optimum, $\lambda^*$ is the **shadow price** of the constraint: the increase in maximum utility from relaxing the budget by one euro.`] },
            { heading: 'Here', formula: t`\lambda^* = \frac{1}{M} = \frac{\partial V}{\partial M}`, paras: [t`It is the **marginal utility of income**. It falls as $M$ rises: each extra euro adds less utility to a richer consumer (diminishing marginal utility of income).`] },
            { heading: 'Assumptions', list: [t`$M > 0$: otherwise both quantities are zero or negative and $\ln x_i$ is undefined.`, t`$p_1 > 0$: a zero price would make $x_1^*$ infinite and a negative price is meaningless.`] },
          ],
          formulas: ['multiplier-lagrange'],
        },
        {
          id: 'd25-q2f', method: 'bordered-hessian', label: '2(f)', title: 'Bordered Hessian', type: 'calc', marks: 5,
          topics: ['second-order'],
          prompt: t`**(f)** Write down the bordered Hessian and check the second-order conditions for the candidate point to be a maximum. Is it a global or a local optimum? Why?`,
          working: [
            { title: 'Ingredients', why: t`Constraint $g = p_1x_1 + 10x_2$; second derivatives of $\mathcal{L}$.`, math: t`g_1 = p_1,\ g_2 = 10,\quad \mathcal{L}_{11} = -\frac{1}{3x_1^2},\ \mathcal{L}_{22} = -\frac{2}{3x_2^2},\ \mathcal{L}_{12} = 0` },
            { title: 'Bordered Hessian', why: 'Border of constraint derivatives, Hessian of the Lagrangian inside.', math: t`\bar{H} = \begin{bmatrix} 0 & p_1 & 10 \\ p_1 & -\frac{1}{3x_1^2} & 0 \\ 10 & 0 & -\frac{2}{3x_2^2} \end{bmatrix}` },
            { title: 'Determinant', why: 'Expand along the first row.', math: [t`|\bar{H}| = -p_1\left(p_1\cdot\left(-\tfrac{2}{3x_2^2}\right) - 0\right) + 10\left(0 - \left(-\tfrac{1}{3x_1^2}\right)10\right)`, t`|\bar{H}| = \frac{2p_1^2}{3x_2^2} + \frac{100}{3x_1^2} > 0`] },
            { title: 'At the candidate point', why: t`$x_1^* = M/(3p_1)$, $x_2^* = M/15$.`, math: t`|\bar{H}| = \frac{150p_1^2}{M^2} + \frac{300p_1^2}{M^2} = \frac{450\,p_1^2}{M^2} > 0` },
          ],
          result: t`$|\bar{H}| = 450p_1^2/M^2 > 0$: the SOC for a **maximum** holds.`,
          answer: [{ heading: 'Global or local?', paras: [t`It is a **global** maximum. The sign is positive for every $x_1, x_2 > 0$, not just at the candidate. More fundamentally, log Cobb-Douglas utility is strictly (quasi-)concave and the budget set is convex (a straight line), so there is only one stationary point and it must be the global maximum.`] }],
          formulas: ['bordered-hessian'],
        },
        {
          id: 'd25-q2g', method: 'comparative-statics-optimum', label: '2(g)', title: 'Effects of p₁ and M', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** How do $x_1^*$ and $x_2^*$ change when $p_1$ increases? And when income $M$ increases? Interpret.`,
          working: [
            { title: 'Price of good 1', why: t`Differentiate $x_1^* = M/(3p_1)$ and $x_2^* = M/15$.`, math: t`\frac{\partial x_1^*}{\partial p_1} = -\frac{M}{3p_1^2} < 0,\qquad \frac{\partial x_2^*}{\partial p_1} = 0` },
            { title: 'Income', why: '', math: t`\frac{\partial x_1^*}{\partial M} = \frac{1}{3p_1} > 0,\qquad \frac{\partial x_2^*}{\partial M} = \frac{1}{15} > 0` },
          ],
          result: t`$x_1^*$ falls with $p_1$; $x_2^*$ is unaffected by $p_1$; both rise with $M$.`,
          answer: [{ heading: 'Interpretation', list: [
            t`**Law of demand:** good 1 becomes dearer, so the consumer buys less of it.`,
            t`**No cross-price effect:** with Cobb-Douglas preferences the consumer always spends a fixed share (two thirds) of income on good 2, so its demand ignores $p_1$; the income and substitution effects on $x_2$ exactly cancel.`,
            '**Normal goods:** demand for both rises with income, proportionally (constant budget shares).',
          ] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'd25-q2h', method: 'value-function', label: '2(h)', title: 'Value function', type: 'calc', marks: 5,
          topics: ['value-function'],
          prompt: t`**(h)** Write down the value function for this problem. What does it represent? Compute how it changes when $M$ increases, and when $p_1$ increases. Interpret.`,
          working: [
            { title: 'Substitute the optimum into utility', why: 'The indirect utility function.', math: t`V(p_1, M) = \tfrac13\ln\!\left(\frac{M}{3p_1}\right) + \tfrac23\ln\!\left(\frac{M}{15}\right)` },
            { title: 'Effect of income', why: t`$\frac{d}{dM}\ln(kM) = \frac1M$.`, math: t`\frac{\partial V}{\partial M} = \frac{1}{3M} + \frac{2}{3M} = \frac{1}{M} = \lambda^*` },
            { title: 'Effect of price', why: t`Only the first term contains $p_1$.`, math: t`\frac{\partial V}{\partial p_1} = -\frac{1}{3p_1} = -\lambda^*x_1^*` },
          ],
          result: t`$V = \tfrac13\ln\frac{M}{3p_1} + \tfrac23\ln\frac{M}{15}$; $\ \partial V/\partial M = 1/M > 0$; $\ \partial V/\partial p_1 = -1/(3p_1) < 0$`,
          answer: [{ heading: 'Interpretation', list: [
            'The value function is the **maximum utility** the consumer can reach for given prices and income (indirect utility).',
            t`Extra income raises maximum utility by exactly $\lambda^*$: the **envelope theorem**, confirming $\lambda$ is the marginal utility of income.`,
            t`A higher $p_1$ lowers maximum utility; $\partial V/\partial p_1 = -\lambda^* x_1^*$ (Roy's identity: the loss equals the extra cost of the current purchases, valued at the marginal utility of income).`,
          ] }],
          formulas: ['envelope'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q3 */
    {
      number: 3,
      topic: 'Matrices, Jacobian and integrals',
      parts: [
        {
          id: 'd25-q3a', method: 'matrix-multiplication', label: '3(a)', title: 'Compute AB and BA', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(a)** Given $A = \begin{bmatrix} 0 & -1 \\ 1 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 6 & -2 & 2 \\ -1 & 1 & 3 \end{bmatrix}$, compute $C = AB$ and $D = BA$.`,
          working: [
            { title: 'Check dimensions', why: t`$A$ is 2×2, $B$ is 2×3.`, math: t`AB: (2\times\underline{2})(\underline{2}\times 3) = 2\times 3\ ✓\qquad BA: (2\times\underline{3})(\underline{2}\times 2)\ ✗` },
            { title: 'Row 1 of A times each column of B', why: t`Row 1 of $A$ is $(0, -1)$.`, math: t`(0)(6) + (-1)(-1) = 1,\quad (0)(-2) + (-1)(1) = -1,\quad (0)(2) + (-1)(3) = -3` },
            { title: 'Row 2 of A times each column of B', why: t`Row 2 is $(1, 4)$.`, math: t`6 - 4 = 2,\quad -2 + 4 = 2,\quad 2 + 12 = 14` },
          ],
          result: t`$C = AB = \begin{bmatrix} 1 & -1 & -3 \\ 2 & 2 & 14 \end{bmatrix}$; $\ D = BA$ is **not defined**`,
          answer: [{ heading: 'Why BA does not exist', paras: [t`$B$ has 3 columns but $A$ has only 2 rows, so a row of $B$ (three entries) cannot be multiplied by a column of $A$ (two entries). The matrices are not conformable in that order. This also shows matrix multiplication is **not commutative**.`] }],
          tips: ['This was the trap of the paper: write "not conformable" and give the dimension reason, rather than inventing a product.'],
          formulas: ['matrix-product'],
        },
        {
          id: 'd25-q3b', method: 'transpose', label: '3(b)', title: 'Transposes', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(b)** Using $A$ and $B$ from 3(a), give the definition of a transpose matrix and compute $E = A^T$ and $F = B^T$.`,
          working: [
            { title: 'Definition', why: 'Rows and columns swap.', math: t`(A^T)_{ij} = a_{ji};\quad m\times n\ \to\ n\times m` },
            { title: 'Transpose A', why: 'Row 1 becomes column 1.', math: t`E = A^T = \begin{bmatrix} 0 & 1 \\ -1 & 4 \end{bmatrix}` },
            { title: 'Transpose B', why: '2×3 becomes 3×2.', math: t`F = B^T = \begin{bmatrix} 6 & -1 \\ -2 & 1 \\ 2 & 3 \end{bmatrix}` },
          ],
          result: t`$E = \begin{bmatrix} 0 & 1 \\ -1 & 4 \end{bmatrix}$, $\ F = \begin{bmatrix} 6 & -1 \\ -2 & 1 \\ 2 & 3 \end{bmatrix}$`,
          answer: [{ heading: 'Worth adding', paras: [t`Now $F E = B^TA^T = (AB)^T$ is defined (3×2 times 2×2), which is a neat link to part (a).`] }],
          formulas: ['matrix-product'],
        },
        {
          id: 'd25-q3c', method: 'jacobian', label: '3(c)', title: 'Jacobian of three functions', type: 'calc', marks: 5,
          topics: ['derivatives'],
          prompt: t`**(c)** Compute the Jacobian matrix for the system $f(x,y,w) = wx^2 + 5\sqrt{y} - 3$, $\ g(x,y,w) = 2x^{1/3} - \ln(2y^2) + 3w^3$, $\ h(x,y,w) = \dfrac{3y}{x^3} - 6x\sqrt{w} + 12w^2$.`,
          working: [
            { title: 'Row for f', why: t`$\sqrt{y} = y^{1/2}$.`, math: t`f_x = 2wx,\quad f_y = \frac{5}{2\sqrt{y}},\quad f_w = x^2` },
            { title: 'Row for g', why: t`$\ln(2y^2) = \ln 2 + 2\ln y$.`, math: t`g_x = \tfrac23 x^{-2/3},\quad g_y = -\frac{2}{y},\quad g_w = 9w^2` },
            { title: 'Row for h', why: t`$\frac{3y}{x^3} = 3yx^{-3}$ and $\sqrt{w} = w^{1/2}$.`, math: t`h_x = -\frac{9y}{x^4} - 6\sqrt{w},\quad h_y = \frac{3}{x^3},\quad h_w = -\frac{3x}{\sqrt{w}} + 24w` },
          ],
          result: t`$J = \begin{bmatrix} 2wx & \frac{5}{2\sqrt{y}} & x^2 \\ \frac{2}{3}x^{-2/3} & -\frac{2}{y} & 9w^2 \\ -\frac{9y}{x^4} - 6\sqrt{w} & \frac{3}{x^3} & -\frac{3x}{\sqrt{w}} + 24w \end{bmatrix}$`,
          tips: [t`$\frac{d}{dw}\big(6x\sqrt w\big) = 6x\cdot\frac{1}{2\sqrt w} = \frac{3x}{\sqrt w}$.`],
          formulas: ['jacobian', 'differentiation-rules'],
        },
        {
          id: 'd25-q3d', method: 'integration-by-parts', label: '3(d)', title: 'Definite integral by parts', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(d)** Compute $\displaystyle\int_0^2 3x^2e^{-x}\,dx$.`,
          working: [
            { title: 'First round', why: t`$u = x^2$, $dv = e^{-x}dx$, so $du = 2x\,dx$, $v = -e^{-x}$.`, math: t`\int x^2e^{-x}dx = -x^2e^{-x} + \int 2xe^{-x}dx` },
            { title: 'Second round', why: t`$u = 2x$, $dv = e^{-x}dx$.`, math: t`\int 2xe^{-x}dx = -2xe^{-x} + \int 2e^{-x}dx = -2xe^{-x} - 2e^{-x}` },
            { title: 'Combine', why: '', math: t`\int x^2e^{-x}dx = -e^{-x}(x^2 + 2x + 2) + C` },
            { title: 'Evaluate from 0 to 2 and multiply by 3', why: t`At 2: $-e^{-2}(10)$. At 0: $-1\cdot 2 = -2$.`, math: t`3\Big[-e^{-x}(x^2+2x+2)\Big]_0^2 = 3\big(-10e^{-2} + 2\big) = 6 - 30e^{-2}` },
          ],
          result: t`$6 - 30e^{-2} \approx 1.940$`,
          tips: ['Check: differentiate $-e^{-x}(x^2+2x+2)$ to get $x^2e^{-x}$.'],
          formulas: ['integration-rules'],
        },
        {
          id: 'd25-q3e', method: ['integration-substitution', 'improper-integral'], label: '3(e)', title: 'Improper integral', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(e)** Compute $\displaystyle\int_3^\infty \frac{2x^2}{x^3 - 2}\,dx$ and discuss its convergence.`,
          working: [
            { title: 'Substitute', why: t`The numerator is a multiple of the derivative of the denominator: $u = x^3 - 2$, $du = 3x^2dx$.`, math: t`\int \frac{2x^2}{x^3-2}dx = \frac23\int\frac{du}{u} = \frac23\ln|x^3 - 2| + C` },
            { title: 'Write as a limit', why: 'The upper limit is infinite.', math: t`\int_3^\infty \frac{2x^2}{x^3-2}dx = \lim_{b\to\infty}\frac23\Big[\ln(b^3 - 2) - \ln 25\Big]` },
            { title: 'Take the limit', why: t`$\ln(b^3 - 2) \to \infty$ as $b \to \infty$.`, math: t`= +\infty` },
          ],
          result: 'The integral **diverges** (to $+\\infty$).',
          answer: [{ heading: 'Why, intuitively', paras: [t`For large $x$ the integrand behaves like $\frac{2}{x}$, and $\int^\infty \frac{dx}{x^p}$ only converges for $p > 1$. Here $p = 1$, so the area under the curve is infinite.`] }],
          formulas: ['integration-rules', 'improper'],
        },
      ],
    },
  ],
};
