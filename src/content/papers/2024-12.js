import { t } from '../../lib/tag.js';

/**
 * ECU22031 Mathematical and Statistical Methods A — December 2024
 * Monday 9 December 2024, 09:30–11:30, Professor Nicola Fontana. Answer ALL three questions.
 */
const model = t`$$Q^D = a - bP + cG,\qquad Q^S = d + eP - fN,\qquad Q^D = Q^S$$`;

export default {
  kind: 'paper',
  id: '2024-12',
  title: 'December 2024',
  short: 'Dec 2024',
  accent: 'oligopoly',
  summary: t`9 December 2024, 2 hours, answer **all three** questions (each part 5 marks). Q1: a linear supply-and-demand model for the "Dublinia" car, in 3×3 and 2×2 matrix form, solved by Cramer's rule with comparative statics. Q2: cost minimisation with $y = K^{3/4}L^{1/4}$. Q3: a 3×3 inverse, a total differential, the geometry of derivatives and two integrals (one secretly improper).`,
  meta: [['Module', 'ECU22031 Mathematical and Statistical Methods A'], ['Sitting', '9 December 2024, 09:30–11:30'], ['Rules', 'Answer all three questions; standard calculator permitted']],
  questions: [
    /* ------------------------------------------------------------------ Q1 */
    {
      number: 1,
      topic: 'Linear demand and supply for the "Dublinia"',
      parts: [
        {
          id: 'd24-q1a', method: 'matrix-form', label: '1(a)', title: 'Unsimplified 3×3 matrix form', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`Consider the model ${model} where $P$, $Q^D$ and $Q^S$ are endogenous and $G$ (price of substitute cars) and $N$ (price of inputs) are exogenous. All parameters $a, b, c, d, e, f$ are positive. **(a)** Do not simplify the model and set it up in matrix form. Call $A$ the 3×3 matrix of coefficients. List the endogenous variables in the order $(Q^D, P, Q^S)$.`,
          working: [
            { title: 'Move endogenous variables left', why: 'Keep all three equations, including the equilibrium condition.', math: [t`Q^D + bP = a + cG`, t`-eP + Q^S = d - fN`, t`Q^D - Q^S = 0`] },
            { title: 'Write the coefficients in the order (Q^D, P, Q^S)', why: 'Zeros where a variable is missing.', math: t`\underbrace{\begin{bmatrix} 1 & b & 0 \\ 0 & -e & 1 \\ 1 & 0 & -1 \end{bmatrix}}_{A}\begin{bmatrix} Q^D \\ P \\ Q^S \end{bmatrix} = \begin{bmatrix} a + cG \\ d - fN \\ 0 \end{bmatrix}` },
          ],
          result: t`$A = \begin{bmatrix} 1 & b & 0 \\ 0 & -e & 1 \\ 1 & 0 & -1 \end{bmatrix}$, with $|A| = b + e$`,
          answer: [{ heading: 'Optional extra', paras: [t`Expanding along row 1: $|A| = 1\big((-e)(-1) - (1)(0)\big) - b\big((0)(-1) - (1)(1)\big) = e + b > 0$, so even the unsimplified system has a unique solution.`] }],
          formulas: ['matrix-form'],
        },
        {
          id: 'd24-q1b', method: ['matrix-form', 'determinant-meaning'], label: '1(b)', title: 'Simplified 2×2 form and determinant', type: 'calc', marks: 5,
          topics: ['linear-models'],
          prompt: t`**(b)** Simplify the model and set it up in matrix form. Call $B$ the 2×2 matrix of coefficients, with the endogenous variables in the order $(Q, P)$. Compute the determinant of $B$ and explain what it implies for the system.`,
          working: [
            { title: 'Use Q^D = Q^S = Q', why: 'The equilibrium condition removes one variable.', math: [t`Q + bP = a + cG`, t`Q - eP = d - fN`] },
            { title: 'Matrix form', why: t`Columns $(Q, P)$.`, math: t`\underbrace{\begin{bmatrix} 1 & b \\ 1 & -e \end{bmatrix}}_{B}\begin{bmatrix} Q \\ P \end{bmatrix} = \begin{bmatrix} a + cG \\ d - fN \end{bmatrix}` },
            { title: 'Determinant', why: 'Main diagonal minus the other diagonal.', math: t`|B| = (1)(-e) - (b)(1) = -(b + e)` },
          ],
          result: t`$|B| = -(b+e) < 0$`,
          answer: [{ heading: 'What it implies', list: [
            t`Because $b, e > 0$, $|B| \neq 0$: $B$ is **non-singular**, the two equations are linearly independent (the demand and supply lines are not parallel) and there is a **unique** equilibrium.`,
            t`$B^{-1}$ exists and Cramer's rule can be used.`,
            'If it were zero the lines would be parallel: no equilibrium, or infinitely many if they coincided.',
          ] }],
          formulas: ['determinant'],
        },
        {
          id: 'd24-q1c', method: 'sketch-linear', label: '1(c)', title: 'Sketch the model', type: 'essay', marks: 5,
          topics: ['linear-models', 'interpretation'],
          prompt: t`**(c)** Sketch a graph of the equations from 1(b). Place $P$ on the x-axis and $Q$ on the y-axis.`,
          answer: [
            { heading: 'The two lines', formula: t`\text{Demand: } Q = (a + cG) - bP\qquad \text{Supply: } Q = (d - fN) + eP` },
            { heading: 'What to draw', list: [
              t`Horizontal axis $P$, vertical axis $Q$ (note: the reverse of the usual economics diagram).`,
              t`**Demand:** vertical intercept $a + cG$, downward slope $-b$, hitting the $P$-axis at $(a + cG)/b$.`,
              t`**Supply:** vertical intercept $d - fN$ (could be below zero if input prices are high), upward slope $e$.`,
              t`**Equilibrium** where they cross, at $(P^*, Q^*)$. For it to make sense we need $a + cG > d - fN$, i.e. the demand intercept above the supply intercept.`,
            ] },
            { heading: 'Read-offs to use later', list: [t`A change in $G$ or $N$ **shifts** a line vertically.`, t`A change in $b$ or $e$ **rotates** a line around its intercept.`] },
          ],
        },
        {
          id: 'd24-q1d', method: 'cramers-rule', label: '1(d)', title: "P* and Q* by Cramer's rule", type: 'calc', marks: 5,
          topics: ['cramer'],
          prompt: t`**(d)** Find the equilibrium $P^*$ and $Q^*$ using Cramer's rule from the system in 1(b).`,
          working: [
            { title: 'Q*: replace column 1', why: t`$|B| = -(b+e)$.`, math: t`Q^* = \frac{\begin{vmatrix} a + cG & b \\ d - fN & -e \end{vmatrix}}{-(b+e)} = \frac{-e(a + cG) - b(d - fN)}{-(b+e)} = \frac{e(a + cG) + b(d - fN)}{b + e}` },
            { title: 'P*: replace column 2', why: '', math: t`P^* = \frac{\begin{vmatrix} 1 & a + cG \\ 1 & d - fN \end{vmatrix}}{-(b+e)} = \frac{(d - fN) - (a + cG)}{-(b+e)} = \frac{a + cG - d + fN}{b + e}` },
          ],
          result: t`$P^* = \dfrac{a + cG - d + fN}{b+e}$, $\quad Q^* = \dfrac{e(a + cG) + b(d - fN)}{b+e}$`,
          answer: [{ heading: 'Meaningful if', paras: [t`$P^* > 0$ requires $a + cG + fN > d$, and $Q^* > 0$ requires $e(a+cG) + b(d - fN) > 0$. Check: $Q^* = (a + cG) - bP^*$ gives the same expression.`] }],
          formulas: ['cramer'],
        },
        {
          id: 'd24-q1e', method: 'comparative-statics-linear', label: '1(e)', title: 'A rise in the price of substitutes', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(e)** Find the impact of a rise in the price of substitute cars on $P^*$ and $Q^*$. Interpret, using the graph from 1(c).`,
          working: [
            { title: 'Differentiate P*', why: t`$G$ appears in the numerator with coefficient $c$.`, math: t`\frac{\partial P^*}{\partial G} = \frac{c}{b+e} > 0` },
            { title: 'Differentiate Q*', why: t`Coefficient $ec$ in the numerator.`, math: t`\frac{\partial Q^*}{\partial G} = \frac{ec}{b+e} > 0` },
          ],
          result: t`Both rise: $\partial P^*/\partial G = c/(b+e) > 0$, $\ \partial Q^*/\partial G = ec/(b+e) > 0$`,
          answer: [{ heading: 'Interpretation', list: [
            t`Substitute cars become dearer, so more buyers want the Dublinia: **demand shifts up** by $c$ at every price (its intercept rises from $a + cG$).`,
            'Along the unchanged supply line, the new crossing is further right and higher: a **higher price and higher quantity**.',
            t`The price rises by less than the demand shift ($c/(b+e)$ per unit of $G$) because supply responds; the steeper (more responsive) supply is, the more of the shift goes into quantity.`,
          ] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'd24-q1f', method: 'comparative-statics-linear', label: '1(f)', title: 'A steeper supply curve', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(f)** Find the impact of a rise in the slope of the supply function on $P^*$ and $Q^*$. Interpret, using the graph from 1(c).`,
          approach: t`The slope of supply is $e$, which appears in numerator and denominator: use the quotient rule.`,
          working: [
            { title: 'P*', why: t`Numerator does not contain $e$.`, math: t`\frac{\partial P^*}{\partial e} = -\frac{a + cG - d + fN}{(b+e)^2} = -\frac{P^*}{b+e} < 0` },
            { title: 'Q*', why: 'Quotient rule.', math: [t`\frac{\partial Q^*}{\partial e} = \frac{(a+cG)(b+e) - \big[e(a+cG) + b(d - fN)\big]}{(b+e)^2}`, t`= \frac{b\,(a + cG - d + fN)}{(b+e)^2} = \frac{b\,P^*}{b+e} > 0`] },
          ],
          result: t`$\partial P^*/\partial e < 0$ and $\partial Q^*/\partial e > 0$`,
          answer: [{ heading: 'Interpretation', list: [
            t`A larger $e$ means producers supply more at every price above zero: with $Q$ on the vertical axis the supply line **rotates upward (steeper)** around its intercept $d - fN$.`,
            'It now crosses demand further down the demand line: the market clears at a **lower price** and a **higher quantity**.',
            t`Both results need $P^* > 0$, which we assumed in (d).`,
          ] }],
          tips: ['"Slope of the supply function" here is $e$, the slope on the $Q$-against-$P$ graph you drew.'],
          formulas: ['comparative-statics'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q2 */
    {
      number: 2,
      topic: 'Cost minimisation with Cobb-Douglas production',
      parts: [
        {
          id: 'd24-q2a', method: 'marginal-products', label: '2(a)', title: 'Marginal products', type: 'calc', marks: 5,
          topics: ['derivatives', 'interpretation'],
          prompt: t`A firm produces $y = K^{3/4}L^{1/4}$. Each unit of capital costs $p_K$ and each unit of labour costs 5. The firm wants the cheapest way to produce $\bar{Y}$ units. **(a)** Compute and describe the marginal productivity of each input.`,
          working: [
            { title: 'Marginal product of capital', why: 'Differentiate with respect to $K$.', math: t`MP_K = \tfrac34K^{-1/4}L^{1/4} = \tfrac34\left(\frac{L}{K}\right)^{1/4}` },
            { title: 'Marginal product of labour', why: '', math: t`MP_L = \tfrac14K^{3/4}L^{-3/4} = \tfrac14\left(\frac{K}{L}\right)^{3/4}` },
            { title: 'Second and cross derivatives', why: 'For diminishing returns and complementarity.', math: t`\frac{\partial MP_K}{\partial K} = -\tfrac{3}{16}K^{-5/4}L^{1/4} < 0,\quad \frac{\partial MP_L}{\partial L} = -\tfrac{3}{16}K^{3/4}L^{-7/4} < 0,\quad \frac{\partial MP_K}{\partial L} = \tfrac{3}{16}K^{-1/4}L^{-3/4} > 0` },
          ],
          result: 'Both marginal products are positive and diminishing; each input raises the productivity of the other.',
          answer: [{ heading: 'Description', list: [
            '**Positive:** extra capital or labour always raises output.',
            '**Diminishing:** each extra unit of an input (holding the other fixed) adds less output than the last.',
            t`**Depend on the input ratio:** $MP_K$ rises with $L/K$. Exponents sum to 1, so **constant returns to scale**; capital has the larger output share (3/4).`,
          ] }],
          formulas: ['differentiation-rules'],
        },
        {
          id: 'd24-q2b', method: 'lagrangian-setup', label: '2(b)', title: 'Problem and Lagrangian', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(b)** Write down the optimisation problem for the firm and the corresponding Lagrangian function.`,
          working: [
            { title: 'Problem', why: 'Minimise cost subject to producing the target.', math: t`\min_{K, L}\ p_KK + 5L\quad\text{s.t.}\quad K^{3/4}L^{1/4} = \bar{Y}` },
            { title: 'Lagrangian', why: '', math: t`\mathcal{L} = p_KK + 5L + \lambda\big(\bar{Y} - K^{3/4}L^{1/4}\big)` },
          ],
          result: t`$\mathcal{L} = p_KK + 5L + \lambda(\bar{Y} - K^{3/4}L^{1/4})$`,
          formulas: ['lagrangian'],
        },
        {
          id: 'd24-q2c', method: 'optimum-graph', label: '2(c)', title: 'Graph of the cost-minimising choice', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(c)** Sketch a graphical representation of the problem. Describe, using the graph, the properties of the solution.`,
          answer: [
            { heading: 'What to draw', list: [
              t`Axes $L$ (horizontal) and $K$ (vertical), or the other way round: label clearly.`,
              t`The **isoquant** $K^{3/4}L^{1/4} = \bar{Y}$: downward sloping and convex, never touching the axes.`,
              t`Several parallel **isocost lines** $p_KK + 5L = C$ with slope $-5/p_K$ (in $K$–$L$ space); lower lines mean lower cost.`,
              'The optimum $E$ where the lowest isocost line just touches the isoquant.',
            ] },
            { heading: 'Properties', list: [
              t`**Tangency:** $MRTS = \dfrac{MP_L}{MP_K} = \dfrac{5}{p_K}$: the rate at which the firm can swap inputs technically equals the rate the market charges.`,
              '**Interior:** Cobb-Douglas needs both inputs, so $K^*, L^* > 0$.',
              '**The constraint binds:** the firm produces exactly $\\bar{Y}$.',
              '**Unique minimum:** a convex isoquant and straight isocost lines touch once.',
            ] },
          ],
        },
        {
          id: 'd24-q2d', method: 'lagrange-foc', label: '2(d)', title: 'FOCs, K*, L* and λ*', type: 'calc', marks: 5,
          topics: ['lagrange'],
          prompt: t`**(d)** Write down the first-order conditions and find $K^*$, $L^*$ and $\lambda^*$.`,
          working: [
            { title: 'First-order conditions', why: '', math: [t`\mathcal{L}_K = p_K - \tfrac34\lambda K^{-1/4}L^{1/4} = 0`, t`\mathcal{L}_L = 5 - \tfrac14\lambda K^{3/4}L^{-3/4} = 0`, t`\mathcal{L}_\lambda = \bar{Y} - K^{3/4}L^{1/4} = 0`] },
            { title: 'Divide the first two', why: '$\\lambda$ cancels.', math: [t`\frac{p_K}{5} = \frac{\tfrac34K^{-1/4}L^{1/4}}{\tfrac14K^{3/4}L^{-3/4}} = \frac{3L}{K}`, t`L = \frac{p_K}{15}K`] },
            { title: 'Substitute into the constraint', why: '', math: [t`K^{3/4}\left(\frac{p_K}{15}K\right)^{1/4} = K\left(\frac{p_K}{15}\right)^{1/4} = \bar{Y}`, t`K^* = \bar{Y}\left(\frac{15}{p_K}\right)^{1/4}`] },
            { title: 'Labour', why: t`$L = \frac{p_K}{15}K$.`, math: t`L^* = \frac{p_K}{15}\,\bar{Y}\left(\frac{15}{p_K}\right)^{1/4} = \bar{Y}\left(\frac{p_K}{15}\right)^{3/4}` },
            { title: 'Multiplier', why: t`From $\mathcal{L}_K = 0$: $\lambda = \frac{4p_K}{3}\left(\frac{K}{L}\right)^{1/4}$ with $K/L = 15/p_K$.`, math: t`\lambda^* = \frac{4p_K}{3}\left(\frac{15}{p_K}\right)^{1/4} = \tfrac43\,15^{1/4}\,p_K^{3/4} \approx 2.62\,p_K^{3/4}` },
          ],
          result: t`$K^* = \bar{Y}(15/p_K)^{1/4}$, $\ L^* = \bar{Y}(p_K/15)^{3/4}$, $\ \lambda^* = \tfrac43\,15^{1/4}p_K^{3/4}$`,
          formulas: ['lagrangian', 'cobb-douglas-solutions'],
        },
        {
          id: 'd24-q2e', method: 'lagrange-multiplier', label: '2(e)', title: 'Meaning of λ and assumptions', type: 'essay', marks: 5,
          topics: ['lagrange', 'interpretation'],
          prompt: t`**(e)** What is the Lagrange multiplier? What information does it provide? Is there any assumption you need about $\bar{Y}$ and $p_K$ for $K^*$ and $L^*$ to be economically meaningful?`,
          answer: [
            { heading: 'What it is', paras: [t`$\lambda^*$ is the shadow price of the output constraint: how much **minimum cost** rises if the firm must produce one more unit. It is the firm's **marginal cost**.`] },
            { heading: 'Here', formula: t`\lambda^* = \frac{\partial C^*}{\partial \bar{Y}} = \tfrac43\,15^{1/4}p_K^{3/4}`, paras: ['It does not depend on output (constant returns to scale give constant marginal cost) and rises with the price of capital.'] },
            { heading: 'Assumptions', list: [t`$\bar{Y} > 0$: a positive output target, so positive inputs.`, t`$p_K > 0$: otherwise $(15/p_K)^{1/4}$ is undefined or infinite.`] },
          ],
          formulas: ['multiplier-lagrange'],
        },
        {
          id: 'd24-q2f', method: 'bordered-hessian', label: '2(f)', title: 'Bordered Hessian for a minimum', type: 'calc', marks: 5,
          topics: ['second-order'],
          prompt: t`**(f)** Write down the bordered Hessian and check the second-order conditions for the candidate point to be a minimum. Is it a global or a local optimum? Why?`,
          working: [
            { title: 'Border', why: t`Derivatives of the constraint $g = K^{3/4}L^{1/4}$.`, math: t`g_K = \tfrac34K^{-1/4}L^{1/4},\qquad g_L = \tfrac14K^{3/4}L^{-3/4}` },
            { title: 'Second derivatives of the Lagrangian', why: t`$\mathcal{L}_{ij} = -\lambda g_{ij}$ (cost is linear).`, math: t`\mathcal{L}_{KK} = \tfrac{3}{16}\lambda K^{-5/4}L^{1/4},\quad \mathcal{L}_{LL} = \tfrac{3}{16}\lambda K^{3/4}L^{-7/4},\quad \mathcal{L}_{KL} = -\tfrac{3}{16}\lambda K^{-1/4}L^{-3/4}` },
            { title: 'Bordered Hessian', why: '', math: t`\bar{H} = \begin{bmatrix} 0 & g_K & g_L \\ g_K & \mathcal{L}_{KK} & \mathcal{L}_{KL} \\ g_L & \mathcal{L}_{KL} & \mathcal{L}_{LL} \end{bmatrix}` },
            { title: 'Determinant', why: t`$|\bar{H}| = -g_K^2\mathcal{L}_{LL} + 2g_Kg_L\mathcal{L}_{KL} - g_L^2\mathcal{L}_{KK}$; every term is negative.`, math: t`|\bar{H}| = -\frac{27\lambda}{256}\Phi - \frac{18\lambda}{256}\Phi - \frac{3\lambda}{256}\Phi = -\frac{3\lambda}{16}K^{1/4}L^{-5/4} < 0,\quad \Phi = K^{1/4}L^{-5/4}` },
          ],
          result: t`$|\bar{H}| < 0$ (since $\lambda^* > 0$): the SOC for a **minimum** holds.`,
          answer: [{ heading: 'Global or local?', paras: [t`**Global.** The sign is negative for all $K, L > 0$. Cobb-Douglas production is quasi-concave, so the set of input combinations producing at least $\bar{Y}$ is convex, and the cost function is linear. The tangency is therefore the unique cost-minimising point.`] }],
          formulas: ['bordered-hessian'],
        },
        {
          id: 'd24-q2g', method: 'comparative-statics-optimum', label: '2(g)', title: 'Effects of p_K and Ȳ', type: 'calc', marks: 5,
          topics: ['comparative-statics', 'interpretation'],
          prompt: t`**(g)** How do $L^*$ and $K^*$ change when $p_K$ increases? And when $\bar{Y}$ increases? Interpret.`,
          working: [
            { title: 'Price of capital', why: t`$K^* = 15^{1/4}\bar{Y}p_K^{-1/4}$, $L^* = 15^{-3/4}\bar{Y}p_K^{3/4}$.`, math: t`\frac{\partial K^*}{\partial p_K} = -\tfrac14\,15^{1/4}\,\bar{Y}p_K^{-5/4} < 0,\qquad \frac{\partial L^*}{\partial p_K} = \tfrac34\,15^{-3/4}\,\bar{Y}p_K^{-1/4} > 0` },
            { title: 'Output', why: 'Both are linear in $\\bar{Y}$.', math: t`\frac{\partial K^*}{\partial \bar{Y}} = \left(\frac{15}{p_K}\right)^{1/4} > 0,\qquad \frac{\partial L^*}{\partial \bar{Y}} = \left(\frac{p_K}{15}\right)^{3/4} > 0` },
          ],
          result: t`Dearer capital: less $K$, more $L$. More output: more of both, in proportion.`,
          answer: [{ heading: 'Interpretation', list: [
            '**Substitution:** when capital becomes dearer the firm swaps towards the relatively cheaper input, labour, keeping output at $\\bar{Y}$. These are conditional (output-constant) demands, so there is no output effect.',
            '**Scale:** with constant returns, doubling output doubles both inputs; the capital-labour ratio $15/p_K$ depends only on prices.',
          ] }],
          formulas: ['comparative-statics'],
        },
        {
          id: 'd24-q2h', method: 'value-function', label: '2(h)', title: 'Cost function', type: 'calc', marks: 5,
          topics: ['value-function'],
          prompt: t`**(h)** Write down the value function. Compute how it changes when $\bar{Y}$ increases, and when $p_K$ increases. Interpret.`,
          working: [
            { title: 'Substitute the optimum into cost', why: '', math: [t`C^* = p_K\bar{Y}\left(\frac{15}{p_K}\right)^{1/4} + 5\bar{Y}\left(\frac{p_K}{15}\right)^{3/4} = \bar{Y}p_K^{3/4}\big(15^{1/4} + 5\cdot 15^{-3/4}\big)`, t`C^*(p_K, \bar{Y}) = \tfrac43\,15^{1/4}\,p_K^{3/4}\,\bar{Y} \approx 2.62\,p_K^{3/4}\bar{Y}`] },
            { title: 'Effect of output', why: '', math: t`\frac{\partial C^*}{\partial \bar{Y}} = \tfrac43\,15^{1/4}p_K^{3/4} = \lambda^*` },
            { title: 'Effect of the price of capital', why: '', math: t`\frac{\partial C^*}{\partial p_K} = 15^{1/4}p_K^{-1/4}\bar{Y} = K^*` },
          ],
          result: t`$C^* = \tfrac43\,15^{1/4}p_K^{3/4}\bar{Y}$; $\ \partial C^*/\partial\bar{Y} = \lambda^* = MC$; $\ \partial C^*/\partial p_K = K^*$`,
          answer: [{ heading: 'Interpretation', list: [
            t`The value function is the **minimum cost** of producing $\bar{Y}$ at given input prices.`,
            t`It rises with output at a constant rate, marginal cost $= \lambda^*$ (envelope theorem).`,
            t`It rises with $p_K$ by the amount of capital used, $K^*$: **Shephard's lemma**. It rises less than proportionally ($p_K^{3/4}$) because the firm substitutes towards labour.`,
          ] }],
          formulas: ['envelope'],
        },
      ],
    },
    /* ------------------------------------------------------------------ Q3 */
    {
      number: 3,
      topic: 'Inverse, differentials and integrals',
      parts: [
        {
          id: 'd24-q3a', method: 'matrix-inverse', label: '3(a)', title: 'Inverse of a 3×3 matrix', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(a)** Given $A = \begin{bmatrix} -2 & 4 & -3 \\ 1 & -1 & 3 \\ 0 & 1 & 2 \end{bmatrix}$, compute the inverse of $A$. Call it $B = A^{-1}$.`,
          working: [
            { title: 'Determinant (expand along row 3, which has a zero)', why: '', math: t`|A| = 0 - 1\begin{vmatrix} -2 & -3 \\ 1 & 3 \end{vmatrix} + 2\begin{vmatrix} -2 & 4 \\ 1 & -1 \end{vmatrix} = -1(-6 + 3) + 2(2 - 4) = 3 - 4 = -1` },
            { title: 'Cofactors', why: t`$C_{ij} = (-1)^{i+j}|M_{ij}|$.`, math: [t`C_{11} = (-1)(2) - (3)(1) = -5,\quad C_{12} = -(2 - 0) = -2,\quad C_{13} = 1 - 0 = 1`, t`C_{21} = -(8 + 3) = -11,\quad C_{22} = -4 - 0 = -4,\quad C_{23} = -(-2 - 0) = 2`, t`C_{31} = 12 - 3 = 9,\quad C_{32} = -(-6 + 3) = 3,\quad C_{33} = 2 - 4 = -2`] },
            { title: 'Adjoint (transpose of cofactors)', why: '', math: t`\operatorname{adj}A = \begin{bmatrix} -5 & -11 & 9 \\ -2 & -4 & 3 \\ 1 & 2 & -2 \end{bmatrix}` },
            { title: 'Divide by |A| = −1', why: 'Every sign flips.', math: t`B = A^{-1} = \begin{bmatrix} 5 & 11 & -9 \\ 2 & 4 & -3 \\ -1 & -2 & 2 \end{bmatrix}` },
          ],
          result: t`$B = A^{-1} = \begin{bmatrix} 5 & 11 & -9 \\ 2 & 4 & -3 \\ -1 & -2 & 2 \end{bmatrix}$`,
          tips: ['Integer entries are a good sign when $|A| = \\pm 1$. Part (b) is your check.'],
          formulas: ['inverse', 'determinant'],
        },
        {
          id: 'd24-q3b', method: 'matrix-multiplication', label: '3(b)', title: 'Compute AB', type: 'calc', marks: 5,
          topics: ['matrix-algebra'],
          prompt: t`**(b)** Using $A$ and $B$ from 3(a), compute $C = AB$.`,
          working: [
            { title: 'Row 1 of A', why: t`$(-2, 4, -3)$ times each column of $B$.`, math: t`-10 + 8 + 3 = 1,\quad -22 + 16 + 6 = 0,\quad 18 - 12 - 6 = 0` },
            { title: 'Row 2 of A', why: t`$(1, -1, 3)$.`, math: t`5 - 2 - 3 = 0,\quad 11 - 4 - 6 = 1,\quad -9 + 3 + 6 = 0` },
            { title: 'Row 3 of A', why: t`$(0, 1, 2)$.`, math: t`0 + 2 - 2 = 0,\quad 0 + 4 - 4 = 0,\quad 0 - 3 + 4 = 1` },
          ],
          result: t`$C = AB = I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$`,
          answer: [{ heading: 'Why', paras: [t`By definition $AA^{-1} = I$, so this confirms part (a). Multiplying by the identity leaves any conformable matrix unchanged.`] }],
          formulas: ['matrix-product', 'inverse'],
        },
        {
          id: 'd24-q3c', method: 'total-differential', label: '3(c)', title: 'Total differential', type: 'calc', marks: 5,
          topics: ['derivatives'],
          prompt: t`**(c)** Compute the total differential $dy$ for $y = 6x_1x_3^{-2/3} - \dfrac{2x_1^2x_2}{\sqrt{x_3}} + e^{2x_2x_3}$.`,
          working: [
            { title: 'Rewrite as powers', why: '', math: t`y = 6x_1x_3^{-2/3} - 2x_1^2x_2x_3^{-1/2} + e^{2x_2x_3}` },
            { title: 'Partial derivatives', why: 'Chain rule on the exponential.', math: [t`y_1 = 6x_3^{-2/3} - 4x_1x_2x_3^{-1/2}`, t`y_2 = -2x_1^2x_3^{-1/2} + 2x_3e^{2x_2x_3}`, t`y_3 = -4x_1x_3^{-5/3} + x_1^2x_2x_3^{-3/2} + 2x_2e^{2x_2x_3}`] },
          ],
          result: t`$dy = \big(6x_3^{-2/3} - 4x_1x_2x_3^{-1/2}\big)dx_1 + \big(-2x_1^2x_3^{-1/2} + 2x_3e^{2x_2x_3}\big)dx_2 + \big(-4x_1x_3^{-5/3} + x_1^2x_2x_3^{-3/2} + 2x_2e^{2x_2x_3}\big)dx_3$`,
          tips: [t`$\frac{\partial}{\partial x_3}\big(-2x_1^2x_2x_3^{-1/2}\big) = (-2)(-\tfrac12)x_1^2x_2x_3^{-3/2} = +x_1^2x_2x_3^{-3/2}$.`],
          formulas: ['total-differential', 'differentiation-rules'],
        },
        {
          id: 'd24-q3d', method: 'derivative-geometry', label: '3(d)', title: 'Geometry of first and second derivatives', type: 'essay', marks: 5,
          topics: ['derivatives', 'interpretation'],
          prompt: t`**(d)** Provide the geometric interpretation of the first and second order derivative.`,
          answer: [
            { heading: 'First derivative', formula: t`f'(x_0) = \lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}`, list: [t`The **slope of the tangent line** to the curve at $x_0$: the limit of the slopes of secant lines.`, t`$f' > 0$: the function is increasing; $f' < 0$: decreasing; $f' = 0$: a horizontal tangent (stationary point).`] },
            { heading: 'Second derivative', list: [t`The **rate of change of the slope**: it measures **curvature**.`, t`$f'' > 0$: slope rising, curve **convex** (lies above its tangents, U-shaped); $f'' < 0$: **concave** (lies below its tangents).`, t`Where $f''$ changes sign: an **inflection point**.`] },
            { heading: 'Why it matters', list: [t`At a stationary point, $f'' < 0$ means a local maximum and $f'' > 0$ a local minimum.`, t`Economics: diminishing marginal utility or returns means $f' > 0$ and $f'' < 0$ (increasing at a decreasing rate).`] },
          ],
        },
        {
          id: 'd24-q3e', method: 'integration-substitution', label: '3(e)', title: 'Integral by substitution', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(e)** Compute $\displaystyle\int_0^1 5x\sqrt{1 + x^2}\,dx$.`,
          working: [
            { title: 'Substitute', why: t`$u = 1 + x^2$, $du = 2x\,dx$, so $5x\,dx = \tfrac52du$; limits $0 \to 1$, $1 \to 2$.`, math: t`\int_0^1 5x\sqrt{1+x^2}\,dx = \frac52\int_1^2 u^{1/2}\,du` },
            { title: 'Integrate', why: '', math: t`\frac52\cdot\frac23\Big[u^{3/2}\Big]_1^2 = \frac53\big(2^{3/2} - 1\big) = \frac53\big(2\sqrt2 - 1\big)` },
          ],
          result: t`$\dfrac53(2\sqrt2 - 1) \approx 3.047$`,
          formulas: ['integration-rules'],
        },
        {
          id: 'd24-q3f', method: 'improper-integral', label: '3(f)', title: 'A disguised improper integral', type: 'calc', marks: 5,
          topics: ['integration'],
          prompt: t`**(f)** Compute $\displaystyle\int_0^1 \frac{3x - 3}{(x-1)^2}\,dx$.`,
          approach: t`Simplify first: the integrand is $\frac{3}{x-1}$, which is undefined at $x = 1$, the upper limit. So the integral is **improper**.`,
          working: [
            { title: 'Simplify', why: t`$3x - 3 = 3(x - 1)$.`, math: t`\frac{3(x-1)}{(x-1)^2} = \frac{3}{x-1}\quad (x \neq 1)` },
            { title: 'Write as a limit', why: t`The integrand blows up as $x \to 1^-$.`, math: t`\int_0^1 \frac{3}{x-1}dx = \lim_{b\to1^-}\Big[3\ln|x-1|\Big]_0^b = \lim_{b\to1^-}3\ln(1-b) - 3\ln 1` },
            { title: 'Take the limit', why: t`$\ln(1-b) \to -\infty$.`, math: t`= -\infty` },
          ],
          result: 'The integral **diverges** (to $-\\infty$); it has no finite value.',
          tips: ['Writing $3\\ln|x-1|$ from 0 to 1 and getting "$3\\ln 0$" is the cue: say it is improper and diverges, rather than giving a number.'],
          formulas: ['improper'],
        },
      ],
    },
  ],
};
