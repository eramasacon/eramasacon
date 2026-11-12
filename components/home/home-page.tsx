// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Clients } from "./sections/clients";
import { Hero } from "./sections/hero";
import { Introduction } from "./sections/introduction";
import { Services } from "./sections/services";
import { Testimonials } from "./sections/testimonials";
import { Values } from "./sections/values";
import { WhyUs } from "./sections/why-us";

/** WordPress page 45 (/home/), section by section. */
export function HomePage() {
  return (
    <WordPressPage pageId={45} stylesheet="/legacy/css/page-home.css">
      <Hero />
      <Introduction />
      <Services />
      <Clients />
      <Values />
      <WhyUs />
      <Testimonials />
    </WordPressPage>
  );
}
