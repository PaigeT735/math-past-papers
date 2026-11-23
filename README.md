# Maths Past Papers

Revision site for **ECU22031 Mathematical and Statistical Methods A** at Trinity College Dublin. The top bar has a **Trends** tab (what comes up every year, what alternates, predictions), one tab per paper (**Dec 2025**, **Dec 2024**, **Mock A**, **Mock B**) and a **Formula Sheet**. Every question part opens into a **Solution** tab (full working) and a **Standard steps** tab (the general recipe for that type of question).

Same design and engine as the Econ and Finance past-paper sites: plain HTML, CSS and JavaScript (ES modules), no build step, KaTeX and fonts bundled in `assets/`. Light mode by default, dark mode toggle.

## Run locally

```bash
python3 -m http.server 5173
# open http://localhost:5173
```

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Maths past papers v1"
git branch -M main
gh repo create PaigeT735/math-past-papers --public --source=. --remote=origin --push
gh api -X POST repos/PaigeT735/math-past-papers/pages -f "source[branch]=main" -f "source[path]=/"
```

Live at `https://paiget735.github.io/math-past-papers/`.

## Adding a paper

1. Copy `src/content/papers/2025-12.js` to a new file (e.g. `2026-12.js`).
2. Change `id`, `title`, `short` (the tab label) and `summary`, then replace the questions.
   - Each part needs a unique `id`, a `label` (`1(a)`…), `type` (`essay` or `calc`) and the `prompt`. `marks` is optional.
   - Optional: `title`, `working`, `result`, `answer`, `tips`, `topics`, `formulas`.
   - **Required:** `method`, the id of a standard method in `src/content/methods.js` (or an array of ids). It fills the **Standard steps** tab.
   - Mocks keep `practice: true`.
3. Import it in `src/content/index.js` and add it to `PAPERS` (newest first).
4. `npm install` once, then `npm run check`.

## Trends page

`src/content/guide.js` holds the paper-by-paper map, the patterns and the predictions. Update it after each new paper.
