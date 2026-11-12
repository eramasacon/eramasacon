import { Clients } from "./sections/clients";
import { Hero } from "./sections/hero";
import { Introduction } from "./sections/introduction";
import { Services } from "./sections/services";
import { Testimonials } from "./sections/testimonials";
import { Values } from "./sections/values";
import { WhyUs } from "./sections/why-us";

/**
 * WordPress page 45 ("Home", /home/) ported section by section. The wrappers
 * reproduce Astra's page-builder template markup the Elementor CSS expects.
 */
export function HomePage() {
  return (
    <div className="site-content" id="content">
      {/* Page-specific Elementor CSS for page 45. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/legacy/css/page-home.css" precedence="wordpress-page" />
      <div className="ast-container">
        <div className="content-area primary" id="primary">
          <main className="site-main" id="main">
            <article className="post-45 page type-page status-publish ast-article-single" id="post-45">
              <header className="entry-header ast-no-thumbnail ast-no-title ast-header-without-markup" />
              <div className="entry-content clear">
                <div className="elementor elementor-45" data-elementor-type="wp-page" data-elementor-id="45">
                  <Hero />
                  <Introduction />
                  <Services />
                  <Clients />
                  <Values />
                  <WhyUs />
                  <Testimonials />
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
