// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ServiceDetails } from "./sections/service-details";

/** WordPress page 1220 (/flooring-and-landscaping/), section by section. */
export function FlooringAndLandscapingPage() {
  return (
    <WordPressPage pageId={1220} stylesheet="/legacy/css/page-flooring-and-landscaping.css">
      <Banner />
      <ServiceDetails />
    </WordPressPage>
  );
}
