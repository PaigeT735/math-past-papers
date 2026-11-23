/** Fallback for unknown routes. */
export default {
  key: () => 'not-found',
  match: () => ({}),
  render() {
    return {
      title: 'Not found',
      crumbs: [{ label: 'Not found' }],
      nav: null,
      html: `
      <div class="page"><div class="page__inner">
        <div class="notfound">
          <div class="eyebrow">404</div>
          <h1>That page doesn’t exist.</h1>
          <p>The link may be out of date. Every paper is still here.</p>
          <a class="btn btn--primary" href="#/papers">Browse all papers</a>
        </div>
      </div></div>`,
    };
  },
};
