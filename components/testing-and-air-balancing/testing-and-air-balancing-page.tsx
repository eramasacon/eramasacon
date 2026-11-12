// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ServiceDetails } from "./sections/service-details";

/** WordPress page 2406 (/testing-and-air-balancing/), section by section. */
export function TestingAndAirBalancingPage() {
  return (
    <WordPressPage pageId={2406} stylesheet="/legacy/css/page-testing-and-air-balancing.css">
      <Banner />
      <ServiceDetails />
    </WordPressPage>
  );
}
