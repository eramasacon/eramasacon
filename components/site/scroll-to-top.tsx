// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.

export function ScrollToTop() {
  return (
  <button type="button" id="ast-scroll-top" className="ast-scroll-top-icon ast-scroll-to-top-right" data-on-devices="both">
    <span className="ast-icon icon-arrow">
      <svg className="ast-arrow-svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enableBackground="new 57 35.171 26 16.043" xmlSpace="preserve">
        <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z" />
      </svg>
    </span>
    {" "}
    <span className="screen-reader-text">
      Scroll to Top
    </span>
  </button>
  );
}
