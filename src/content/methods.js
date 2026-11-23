import { t } from '../lib/tag.js';

/**
 * Standard methods: the same recipe for every question of a given type,
 * written with letters instead of numbers so it works for any version of
 * the question. Every question part points at one or more of these with
 *   method: 'cramers-rule'            or
 *   method: ['lagrange-foc', 'lagrange-multiplier']
 *
 * Method fields
 *   title      short name
 *   when       how to recognise the question (rich text)
 *   setup      optional notation line
 *   steps      [{ title, how, math }]  how = one line saying what to do; math = LaTeX string or array
 *   shortcut   optional closed-form result to check against (LaTeX, display)
 *   check      optional sense check (rich text)
 *   traps      optional list of common mistakes (rich text)
 */
export const METHODS = [
  /* ------------------------------------------------------------ Linear models */
  {
    id: 'parameter-intuition',
    title: 'Explain the restrictions on parameters',
    when: t`The question asks **why** parameters are positive, or less than 1 ("what is the economic intuition behind…").`,
    steps: [
      { title: 'Say what each parameter measures', how: 'Name it as a marginal propensity, rate, slope or sensitivity.', math: t`b = \frac{\partial C}{\partial Y_d}\ \text{(MPC)},\quad t = \frac{T}{Y}\ \text{(tax rate)},\quad m = \frac{\partial M}{\partial Y}\ \text{(MPI)}` },
      { title: 'Explain the lower bound (> 0)', how: 'A positive value gives the expected direction: consumption, taxes and imports rise with income; demand falls with price.', math: [] },
      { title: 'Explain the upper bound (< 1)', how: 'A fraction of each extra euro: people save part of extra income, the state cannot tax more than all of it, not every extra euro is spent on imports.', math: [] },
      { title: 'Link to the model working', how: 'The bounds make the denominator (the determinant) positive, so the multiplier is positive and finite and the equilibrium exists and is stable.', math: t`1 - b(1-t) + m > 0` },
    ],
    traps: ['Do not just restate the inequality. Give one economic reason per parameter and one mathematical consequence.'],
  },
  {
    id: 'matrix-form',
    title: 'Write a linear model in matrix form $A\\mathbf{x} = \\mathbf{d}$',
    when: t`"Set up the model in matrix form", "call $A$ the matrix of coefficients", "list the endogenous variables in the order…".`,
    setup: t`Endogenous variables (unknowns) go in $\mathbf{x}$; exogenous variables and constants go in $\mathbf{d}$.`,
    steps: [
      { title: 'Simplify only if asked', how: 'If told "do not simplify", keep every equation (including the equilibrium condition). If told to simplify, substitute definitions in first.', math: [] },
      { title: 'Move every endogenous variable to the left', how: 'Each equation becomes (coefficients × unknowns) = (exogenous terms).', math: t`a_{11}x_1 + a_{12}x_2 = d_1` },
      { title: 'Order the columns exactly as the question lists the variables', how: 'Column 1 holds the coefficients of the first listed variable, and so on. Write a 0 where a variable is missing.', math: [] },
      { title: 'Write the three objects', how: 'Coefficient matrix, vector of unknowns, vector of constants.', math: t`\underbrace{\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}}_{A}\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} d_1 \\ d_2 \end{bmatrix}` },
    ],
    check: 'Multiply out $A\\mathbf{x}$ row by row: you should get back each equation.',
    traps: ['A variable on the right-hand side changes sign when it moves left (e.g. $C = a + bY_d$ becomes $-b(1-t)Y + C = a$).', 'Wrong column order is the most common lost mark.'],
  },
  {
    id: 'determinant-meaning',
    title: 'Compute a determinant and say what it means',
    when: t`"Compute the determinant of $A$ and explain what it implies for the system." "What if the determinant were zero?"`,
    steps: [
      { title: '2×2 determinant', how: 'Main diagonal minus the other diagonal.', math: t`|A| = a_{11}a_{22} - a_{12}a_{21}` },
      { title: '3×3 determinant (cofactor expansion)', how: 'Expand along the row or column with most zeros; alternate signs $+ - +$.', math: t`|A| = a_{11}|M_{11}| - a_{12}|M_{12}| + a_{13}|M_{13}|` },
      { title: 'Sign it using the parameter restrictions', how: 'Use $b, t, m < 1$ or "all parameters positive" to show it cannot be zero.', math: [] },
      { title: 'Interpret', how: 'Non-zero: $A$ is non-singular, its rows are linearly independent, $A^{-1}$ exists and there is a **unique** solution. Zero: singular, rows linearly dependent, either **no** solution or **infinitely many**; Cramer\'s rule cannot be used.', math: t`|A| \neq 0 \iff A^{-1}\ \text{exists} \iff \text{unique } \mathbf{x}^* = A^{-1}\mathbf{d}` },
    ],
    traps: ['Saying "the determinant is non-zero so it is solvable" is only half the marks: name **unique** solution, **non-singular**, **linearly independent**, and what zero would mean.'],
  },
  {
    id: 'cramers-rule',
    title: "Cramer's rule",
    when: t`"Find the equilibrium using Cramer's rule."`,
    setup: t`System $A\mathbf{x} = \mathbf{d}$ with $|A| \neq 0$. $A_j$ is $A$ with column $j$ replaced by $\mathbf{d}$.`,
    steps: [
      { title: 'Compute $|A|$', how: 'You usually have it from the previous part.', math: [] },
      { title: 'Build $A_j$ for the variable you want', how: 'Replace the column of that variable with the right-hand-side vector.', math: t`A_1 = \begin{bmatrix} d_1 & a_{12} \\ d_2 & a_{22} \end{bmatrix},\quad A_2 = \begin{bmatrix} a_{11} & d_1 \\ a_{21} & d_2 \end{bmatrix}` },
      { title: 'Divide the determinants', how: 'One ratio per unknown.', math: t`x_j^* = \frac{|A_j|}{|A|}` },
      { title: 'Tidy signs and state conditions', how: 'If $|A| < 0$, multiply top and bottom by $-1$. Say what must hold for the answer to be positive (economically meaningful).', math: [] },
    ],
    check: 'Plug $x^*$ back into one original equation.',
    traps: ['Replace the column of the variable you want, not the row.', 'Keep the variable order fixed from the matrix-form part.'],
  },
  {
    id: 'derived-endogenous',
    title: 'Find the remaining endogenous variables',
    when: t`Once $Y^*$ (or $P^*$) is known, find variables defined by it ($T^* = tY^*$, $M^* = mY^*$, $Q^*$ from either curve).`,
    steps: [
      { title: 'Use the defining equation', how: 'Substitute the solved variable into the behavioural equation.', math: t`T^* = tY^*,\qquad M^* = mY^*` },
      { title: 'Write it out in parameters', how: 'Replace $Y^*$ by its full expression.', math: [] },
    ],
    check: 'Sense check signs: each should be positive if the parameters are.',
  },
  {
    id: 'comparative-statics-linear',
    title: 'Comparative statics in a linear model',
    when: t`"Find the impact of a rise in $X$ on $Y^*$." "How does the equilibrium change if a parameter increases?"`,
    steps: [
      { title: 'Start from the reduced form', how: 'The equilibrium expression from Cramer\'s rule.', math: t`Y^* = \frac{N}{D}` },
      { title: 'Differentiate with respect to the exogenous variable', how: 'If it only appears in the numerator, the derivative is simple.', math: t`\frac{\partial Y^*}{\partial X_0} = \frac{\partial N/\partial X_0}{D}` },
      { title: 'For a parameter in the denominator use the quotient rule', how: 'Or write $Y^* = N\,D^{-1}$ and use the chain rule.', math: t`\frac{\partial Y^*}{\partial m} = -\frac{N}{D^2}\frac{\partial D}{\partial m}` },
      { title: 'Sign it and interpret', how: 'State whether it is positive or negative using the parameter restrictions, then give the economic story (multiplier, leakage, shift of a curve).', math: [] },
    ],
    traps: ['Always say **why** in words: e.g. imports are a leakage, so a higher $m$ lowers the multiplier.', 'A "rise in the slope" means differentiate with respect to that slope parameter.'],
  },
  {
    id: 'sketch-linear',
    title: 'Sketch a linear model',
    when: '"Sketch a graph of the equations." Usually supply and demand, or two lines meeting at an equilibrium.',
    steps: [
      { title: 'Put the variables on the axes as instructed', how: 'Read carefully: 2024 asked for $P$ on the x-axis and $Q$ on the y-axis (the opposite of the usual economics diagram).', math: [] },
      { title: 'Write each line as y = intercept + slope × x', how: 'Intercepts contain the exogenous variables; slopes are the parameters.', math: t`Q^D = (a + cG) - bP,\qquad Q^S = (d - fN) + eP` },
      { title: 'Draw and label', how: 'Downward-sloping demand, upward-sloping supply, intercepts on the vertical axis, equilibrium $(P^*, Q^*)$ marked.', math: [] },
      { title: 'Use the graph later', how: 'A change in an exogenous variable **shifts** a line; a change in a slope parameter **rotates** it.', math: [] },
    ],
  },

  /* ------------------------------------------------------------ Constrained optimisation */
  {
    id: 'marginal-products',
    title: 'Marginal utility or marginal product',
    when: '"Find the marginal utility of each good" or "compute the marginal productivity of each input. Interpret."',
    steps: [
      { title: 'Differentiate partially', how: 'Hold the other variable constant.', math: t`MU_1 = \frac{\partial U}{\partial x_1},\qquad MP_K = \frac{\partial y}{\partial K}` },
      { title: 'Sign the first derivative', how: 'Positive: more of the good or input raises utility or output.', math: [] },
      { title: 'Sign the second derivative', how: 'Negative: diminishing marginal utility or diminishing marginal returns.', math: t`\frac{\partial^2 U}{\partial x_1^2} < 0` },
      { title: 'Cross effect (Cobb-Douglas production)', how: 'Each input makes the other more productive.', math: t`\frac{\partial MP_K}{\partial L} > 0` },
    ],
    traps: ['For $\\ln$ utility, $MU_1 = \\alpha / x_1$: it does not depend on $x_2$.', 'Interpret in words: "each extra unit adds less than the one before".'],
  },
  {
    id: 'lagrangian-setup',
    title: 'Write the optimisation problem and the Lagrangian',
    when: '"Write down the optimisation problem and the corresponding Lagrangian function."',
    steps: [
      { title: 'Name objective and constraint', how: 'Consumer: maximise utility subject to the budget. Firm: minimise cost subject to producing the target output.', math: [t`\max_{x_1,x_2} U(x_1,x_2)\ \text{s.t.}\ p_1x_1 + p_2x_2 = M`, t`\min_{K,L}\ rK + wL\ \text{s.t.}\ f(K,L) = \bar{Y}`] },
      { title: 'Write the constraint as (constant − function) = 0', how: 'This keeps $\\lambda$ positive and easy to interpret.', math: [] },
      { title: 'Form the Lagrangian', how: 'Objective plus $\\lambda$ times the constraint.', math: [t`\mathcal{L} = U(x_1,x_2) + \lambda\,(M - p_1x_1 - p_2x_2)`, t`\mathcal{L} = rK + wL + \lambda\,(\bar{Y} - f(K,L))`] },
    ],
    traps: ['Use the numbers given (e.g. $p_2 = 10$, $w = 5$) and keep the unknown price as a letter.'],
  },
  {
    id: 'optimum-graph',
    title: 'Sketch the constrained optimum',
    when: '"Sketch a graphical representation… describe the properties of the solution."',
    steps: [
      { title: 'Consumer: budget line and indifference curves', how: 'Straight budget line with intercepts $M/p_1$ and $M/p_2$, slope $-p_1/p_2$; convex indifference curves; higher curves are better.', math: [] },
      { title: 'Firm: isoquant and isocost lines', how: 'Convex isoquant for $\\bar{Y}$; parallel isocost lines with slope $-r/w$; lower lines are cheaper.', math: [] },
      { title: 'Mark the tangency', how: 'The optimum is where the highest indifference curve touches the budget line (or the lowest isocost touches the isoquant).', math: t`MRS = \frac{MU_1}{MU_2} = \frac{p_1}{p_2}\qquad MRTS = \frac{MP_K}{MP_L} = \frac{r}{w}` },
      { title: 'State the properties', how: 'Interior solution (both quantities positive, because the log or Cobb-Douglas curves never touch the axes), unique, on the constraint (it binds), and a maximum or minimum because the curves are convex.', math: [] },
    ],
  },
  {
    id: 'lagrange-foc',
    title: 'First-order conditions and solving',
    when: t`"Write down the first-order conditions and find $x_1^*, x_2^*$ and $\lambda^*$."`,
    steps: [
      { title: 'Differentiate the Lagrangian with respect to each choice variable and $\\lambda$', how: 'Set each derivative to zero: three equations, three unknowns.', math: t`\mathcal{L}_{x_1} = 0,\quad \mathcal{L}_{x_2} = 0,\quad \mathcal{L}_{\lambda} = 0` },
      { title: 'Divide the first two conditions', how: '$\\lambda$ cancels and you get the tangency condition.', math: t`\frac{MU_1}{MU_2} = \frac{p_1}{p_2}\quad\text{or}\quad \frac{MP_K}{MP_L} = \frac{r}{w}` },
      { title: 'Express one variable in terms of the other', how: 'Rearrange the tangency condition.', math: [] },
      { title: 'Substitute into the constraint', how: 'Solve for one variable, then the other.', math: [] },
      { title: 'Find $\\lambda^*$', how: 'Plug back into either of the first two conditions.', math: [] },
    ],
    shortcut: t`\text{Cobb-Douglas utility } \alpha\ln x_1 + \beta\ln x_2:\quad x_i^* = \frac{\alpha_i}{\alpha+\beta}\cdot\frac{M}{p_i},\qquad \lambda^* = \frac{\alpha+\beta}{M}`,
    check: 'Spending (or output) should equal the constraint exactly.',
    traps: ['Keep exponents as fractions; write $15^{1/4}$ rather than a rounded decimal unless asked.'],
  },
  {
    id: 'lagrange-multiplier',
    title: 'Interpret the Lagrange multiplier and the assumptions',
    when: t`"What is the Lagrange multiplier? What information does it provide? Is there any assumption you need about $M$ and $p_1$?"`,
    steps: [
      { title: 'Define it', how: '$\\lambda^*$ measures how much the optimal value of the objective changes when the constraint is relaxed by one unit (a shadow price).', math: t`\lambda^* = \frac{\partial V}{\partial (\text{constraint constant})}` },
      { title: 'Consumer', how: '$\\lambda^*$ is the **marginal utility of income**: extra utility from one more euro.', math: t`\lambda^* = \frac{\partial V}{\partial M}` },
      { title: 'Firm (cost minimisation)', how: '$\\lambda^*$ is **marginal cost**: the extra cost of producing one more unit.', math: t`\lambda^* = \frac{\partial C^*}{\partial \bar{Y}} = MC` },
      { title: 'State the assumptions', how: 'Prices and income (or output) must be strictly positive so quantities are positive and finite, and logs and fractional powers are defined.', math: t`M > 0,\ p_1 > 0\qquad\text{or}\qquad \bar{Y} > 0,\ p_K > 0` },
    ],
  },
  {
    id: 'bordered-hessian',
    title: 'Bordered Hessian: second-order conditions',
    when: '"Write down the bordered Hessian and check the second-order conditions. Is it a global or a local optimum?"',
    setup: t`Two choice variables, one constraint $g(x_1, x_2) = c$.`,
    steps: [
      { title: 'Collect the derivatives', how: 'First derivatives of the constraint for the border; second derivatives of the Lagrangian inside.', math: t`\bar{H} = \begin{bmatrix} 0 & g_1 & g_2 \\ g_1 & \mathcal{L}_{11} & \mathcal{L}_{12} \\ g_2 & \mathcal{L}_{21} & \mathcal{L}_{22} \end{bmatrix}` },
      { title: 'Compute the determinant', how: 'Expand along the first row.', math: t`|\bar{H}| = -g_1(g_1\mathcal{L}_{22} - g_2\mathcal{L}_{12}) + g_2(g_1\mathcal{L}_{21} - g_2\mathcal{L}_{11})` },
      { title: 'Apply the sign rule (2 variables, 1 constraint)', how: 'Positive means a maximum; negative means a minimum.', math: t`|\bar{H}| > 0 \Rightarrow \text{max},\qquad |\bar{H}| < 0 \Rightarrow \text{min}` },
      { title: 'Global or local?', how: 'Global if the objective is quasi-concave (max) or the constraint set is convex with a linear objective (min), so the stationary point is unique. Cobb-Douglas and log utility are strictly quasi-concave, and budget and isocost lines are linear.', math: [] },
    ],
    traps: ['The sign rule flips with more variables: for $n$ variables the last leading minor has sign $(-1)^n$ for a maximum.', 'Evaluate at the candidate point, or show the sign holds for all positive values.'],
  },
  {
    id: 'comparative-statics-optimum',
    title: 'Comparative statics of the optimum',
    when: t`"How do $x_1^*$ and $x_2^*$ change when $p_1$ increases? And when income $M$ increases?"`,
    steps: [
      { title: 'Differentiate the solution', how: 'Partial derivative of each optimal quantity with respect to the parameter.', math: t`\frac{\partial x_1^*}{\partial p_1},\quad \frac{\partial x_1^*}{\partial M}` },
      { title: 'Sign each derivative', how: 'Use positive prices and income.', math: [] },
      { title: 'Interpret', how: 'Own-price effect negative (law of demand); income effect positive (normal good); a zero cross-price effect means constant budget shares (Cobb-Douglas). For a firm: when an input becomes dearer, use less of it and more of the other (substitution); more output needs more of both.', math: [] },
    ],
  },
  {
    id: 'value-function',
    title: 'Value function and the envelope theorem',
    when: '"Write down the value function. What does it represent? How does it change when $M$ (or $p_1$) increases?"',
    steps: [
      { title: 'Substitute the optimum into the objective', how: 'The result is a function of the parameters only.', math: t`V(p_1, M) = U(x_1^*(p_1,M), x_2^*(p_1,M))\qquad C^*(r, w, \bar{Y}) = rK^* + wL^*` },
      { title: 'Say what it represents', how: 'Maximum utility attainable (indirect utility) or minimum cost of producing $\\bar{Y}$ (cost function).', math: [] },
      { title: 'Differentiate with respect to the parameters', how: 'Then check the result with the envelope theorem: the derivative equals the partial of the Lagrangian with respect to that parameter at the optimum.', math: t`\frac{\partial V}{\partial \theta} = \frac{\partial \mathcal{L}}{\partial \theta}\Big|_{*}` },
      { title: 'Interpret', how: 'Consumer: $\\partial V/\\partial M = \\lambda^*$; $\\partial V/\\partial p_1 = -\\lambda^* x_1^*$ (Roy). Firm: $\\partial C^*/\\partial \\bar{Y} = \\lambda^* = MC$; $\\partial C^*/\\partial r = K^*$ (Shephard\'s lemma).', math: [] },
    ],
  },

  /* ------------------------------------------------------------ Matrix algebra and calculus */
  {
    id: 'matrix-multiplication',
    title: 'Matrix multiplication',
    when: t`"Compute $C = AB$ and $D = BA$."`,
    steps: [
      { title: 'Check dimensions first', how: 'An $(m\\times n)$ times an $(n\\times p)$ gives $(m\\times p)$. The inner numbers must match; otherwise the product is **not defined**.', math: t`(m \times \underline{n})(\underline{n} \times p) = (m \times p)` },
      { title: 'Row times column', how: 'Entry $(i, j)$ is row $i$ of the first matrix times column $j$ of the second.', math: t`c_{ij} = \sum_k a_{ik}b_{kj}` },
      { title: 'Comment', how: 'In general $AB \\neq BA$ (matrix multiplication is not commutative); one may exist while the other does not.', math: [] },
    ],
    traps: ['2025 trap: $B$ was 2×3 and $A$ 2×2, so $BA$ is **not conformable**. Say so and explain why rather than forcing a calculation.'],
  },
  {
    id: 'transpose',
    title: 'Transpose of a matrix',
    when: '"Provide the definition of a transpose and compute $A^T$."',
    steps: [
      { title: 'Definition', how: 'Rows become columns: the $(i, j)$ entry of $A^T$ is the $(j, i)$ entry of $A$; an $m\\times n$ matrix becomes $n\\times m$.', math: t`(A^T)_{ij} = a_{ji}` },
      { title: 'Write it out', how: 'Copy row 1 of $A$ as column 1 of $A^T$, and so on.', math: [] },
      { title: 'Useful properties', how: 'Worth one line for full marks.', math: t`(A^T)^T = A,\quad (AB)^T = B^TA^T,\quad |A^T| = |A|` },
    ],
  },
  {
    id: 'matrix-inverse',
    title: 'Inverse of a matrix (adjoint method)',
    when: t`"Compute the inverse of $A$." Then often "compute $AB$" to check you get the identity.`,
    steps: [
      { title: 'Compute $|A|$', how: 'If it is zero, there is no inverse.', math: [] },
      { title: 'Matrix of cofactors', how: 'For each entry: delete its row and column, take the 2×2 determinant (minor), apply the sign pattern.', math: t`C_{ij} = (-1)^{i+j}|M_{ij}|,\qquad \begin{bmatrix} + & - & + \\ - & + & - \\ + & - & + \end{bmatrix}` },
      { title: 'Transpose to get the adjoint', how: 'The adjugate is the transposed cofactor matrix.', math: t`\operatorname{adj}A = C^T` },
      { title: 'Divide by the determinant', how: 'Every entry of the adjoint is divided by $|A|$.', math: t`A^{-1} = \frac{1}{|A|}\operatorname{adj}A` },
    ],
    shortcut: t`2\times2:\ \begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}`,
    check: t`$AA^{-1} = I$. That is exactly what 2024 Q3(b) asked you to show.`,
    traps: ['Forgetting to transpose the cofactor matrix.', 'Dividing by $|A|$ when $|A|$ is negative: every sign flips.'],
  },
  {
    id: 'jacobian',
    title: 'Jacobian matrix',
    when: t`"Compute the Jacobian matrix for the system of equations $f, g, h$."`,
    steps: [
      { title: 'One row per function, one column per variable', how: 'Keep the variable order the question uses.', math: t`J = \begin{bmatrix} f_x & f_y & f_w \\ g_x & g_y & g_w \\ h_x & h_y & h_w \end{bmatrix}` },
      { title: 'Differentiate each entry', how: 'Power rule, chain rule for roots and logs, quotient written as a negative power.', math: t`\frac{d}{dy}\sqrt{y} = \frac{1}{2\sqrt{y}},\quad \frac{d}{dy}\ln(2y^2) = \frac{2}{y},\quad \frac{d}{dx}\frac{1}{x^3} = -\frac{3}{x^4}` },
      { title: 'If asked about dependence', how: 'A Jacobian determinant identically zero means the functions are functionally dependent.', math: t`|J| \equiv 0 \iff \text{functional dependence}` },
    ],
    traps: ['Simplify $\\ln(2y^2) = \\ln 2 + 2\\ln y$ before differentiating.'],
  },
  {
    id: 'total-differential',
    title: 'Total differential',
    when: t`"Compute the total differential $dy$."`,
    steps: [
      { title: 'Partial derivative with respect to each variable', how: 'Hold the others constant.', math: t`\frac{\partial y}{\partial x_1},\ \frac{\partial y}{\partial x_2},\ \frac{\partial y}{\partial x_3}` },
      { title: 'Combine', how: 'Each partial multiplies the small change in its variable.', math: t`dy = \frac{\partial y}{\partial x_1}dx_1 + \frac{\partial y}{\partial x_2}dx_2 + \frac{\partial y}{\partial x_3}dx_3` },
    ],
    traps: ['Rewrite roots and fractions as powers first: $\\frac{x_1^2x_2}{\\sqrt{x_3}} = x_1^2x_2x_3^{-1/2}$.', 'Chain rule on exponentials: $\\frac{\\partial}{\\partial x_2}e^{2x_2x_3} = 2x_3e^{2x_2x_3}$.'],
  },
  {
    id: 'derivative-geometry',
    title: 'Geometric meaning of the first and second derivatives',
    when: '"Provide the geometric interpretation of the first and second order derivative."',
    steps: [
      { title: 'First derivative', how: 'The slope of the tangent line at a point; positive means increasing, negative decreasing, zero a stationary point.', math: t`f'(x_0) = \lim_{h\to 0}\frac{f(x_0+h) - f(x_0)}{h}` },
      { title: 'Second derivative', how: 'The rate of change of the slope: curvature. Positive means convex (slope rising, U-shaped); negative means concave (slope falling).', math: t`f''(x) > 0\ \text{convex},\qquad f''(x) < 0\ \text{concave}` },
      { title: 'Use in optimisation', how: 'At a stationary point $f\'=0$: $f\'\'<0$ is a maximum, $f\'\'>0$ a minimum; an inflection point is where concavity changes.', math: [] },
      { title: 'Economic example', how: 'Diminishing marginal utility: $U\' > 0$, $U\'\' < 0$.', math: [] },
    ],
  },
  {
    id: 'implicit-differentiation',
    title: 'Implicit differentiation',
    when: t`An equation $F(x, y) = c$ defines $y$ as a function of $x$; find $dy/dx$.`,
    steps: [
      { title: 'Use the implicit function rule', how: 'Partial derivatives of $F$.', math: t`\frac{dy}{dx} = -\frac{F_x}{F_y}\qquad (F_y \neq 0)` },
      { title: 'Or differentiate both sides', how: 'Treat $y$ as $y(x)$ and use the chain rule, then solve for $dy/dx$.', math: [] },
      { title: 'Evaluate at the point if asked', how: 'Check the point satisfies the equation first.', math: [] },
    ],
    traps: ['Do not forget the minus sign in $-F_x/F_y$.'],
  },
  {
    id: 'unconstrained-hessian',
    title: 'Unconstrained optimisation with the Hessian',
    when: t`"Find and classify the stationary points of $f(x, y)$."`,
    steps: [
      { title: 'First-order conditions', how: 'Set both partial derivatives to zero and solve.', math: t`f_x = 0,\quad f_y = 0` },
      { title: 'Hessian', how: 'Matrix of second derivatives.', math: t`H = \begin{bmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{bmatrix}` },
      { title: 'Classify each point with the leading principal minors', how: 'Evaluate at each stationary point.', math: t`|H_1| = f_{xx},\quad |H_2| = f_{xx}f_{yy} - f_{xy}^2` },
      { title: 'Sign rule', how: '$|H_1| > 0, |H_2| > 0$: minimum (positive definite). $|H_1| < 0, |H_2| > 0$: maximum (negative definite). $|H_2| < 0$: saddle point.', math: [] },
    ],
  },
  {
    id: 'integration-by-parts',
    title: 'Integration by parts',
    when: t`A product of two different kinds of function: polynomial × exponential, polynomial × log ($x^2e^{-x}$, $x\ln x$).`,
    steps: [
      { title: 'Choose $u$ and $dv$ (LIATE)', how: 'Let $u$ be the Log or the polynomial (it gets simpler when differentiated); $dv$ the exponential (easy to integrate).', math: t`\int u\,dv = uv - \int v\,du` },
      { title: 'Apply the formula', how: 'Repeat if a polynomial is left (an $x^2$ needs two rounds).', math: [] },
      { title: 'Evaluate the limits', how: 'Upper minus lower, carefully with signs.', math: t`\big[uv\big]_a^b - \int_a^b v\,du` },
    ],
    shortcut: t`\int x^2e^{-x}\,dx = -e^{-x}\,(x^2 + 2x + 2) + C,\qquad \int x\ln x\,dx = \tfrac{x^2}{2}\ln x - \tfrac{x^2}{4} + C`,
    check: 'Differentiate your antiderivative: you should get the integrand back.',
  },
  {
    id: 'integration-substitution',
    title: 'Integration by substitution',
    when: t`The integrand contains a function and (a multiple of) its derivative: $x\sqrt{1+x^2}$, $\frac{x^2}{x^3-2}$, $xe^{x^2}$.`,
    steps: [
      { title: 'Let $u$ be the inner function', how: 'Then $du = u\'(x)\,dx$.', math: t`u = 1 + x^2,\quad du = 2x\,dx` },
      { title: 'Rewrite everything in $u$', how: 'Including the limits for a definite integral.', math: t`x = 0 \Rightarrow u = 1,\qquad x = 1 \Rightarrow u = 2` },
      { title: 'Integrate and evaluate', how: 'Use standard results.', math: t`\int u^n\,du = \frac{u^{n+1}}{n+1},\qquad \int \frac{du}{u} = \ln|u|` },
    ],
    traps: ['Change the limits when you change the variable, or substitute back before evaluating.'],
  },
  {
    id: 'improper-integral',
    title: 'Improper integrals and convergence',
    when: 'An infinite limit ($\\int_3^\\infty$), or an integrand that blows up inside or at the end of the interval (e.g. $\\frac{1}{x-1}$ on $[0,1]$).',
    steps: [
      { title: 'Spot why it is improper', how: 'Check the limits and look for zeros in any denominator.', math: [] },
      { title: 'Replace the problem point by a limit', how: 'Integrate up to $b$ (or $1 - \\varepsilon$) and let it tend to the limit.', math: t`\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx` },
      { title: 'Compute and take the limit', how: 'Finite: **converges** (state the value). Infinite or no limit: **diverges**.', math: [] },
    ],
    shortcut: t`\int_1^\infty \frac{dx}{x^p}\ \text{converges iff } p > 1;\qquad \int_0^1 \frac{dx}{x^p}\ \text{converges iff } p < 1`,
    traps: ['2024 Q3(f) looked ordinary but $\\frac{3x-3}{(x-1)^2} = \\frac{3}{x-1}$ blows up at $x = 1$: it diverges.', 'A $\\ln$ that tends to infinity means divergence, however slowly.'],
  },
];

export const methodById = new Map(METHODS.map((m) => [m.id, m]));
