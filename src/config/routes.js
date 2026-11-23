/**
 * Route registry. Routes are hash-based (#/...), so the site works on
 * GitHub Pages with no server configuration.
 *
 * A view is an object with:
 *   match(segments) -> params | null
 *   key(params)     -> string   (same key on navigation = call update, no re-render)
 *   render(params)  -> { title, crumbs, nav, accent?, html }
 *   mount?(root, params, ctx)
 *   update?(root, params, ctx)
 *
 * Future areas (past papers, practice questions, quizzes) are added here.
 */
import library from '../views/library.js';
import notFound from '../views/not-found.js';

export const ROUTES = [library];
export const NOT_FOUND = notFound;
