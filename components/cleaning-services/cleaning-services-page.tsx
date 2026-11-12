// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ServiceDetails } from "./sections/service-details";

/** WordPress page 2408 (/cleaning-services/), section by section. */
export function CleaningServicesPage() {
  return (
    <WordPressPage pageId={2408} stylesheet="/legacy/css/page-cleaning-services.css">
      <Banner />
      <ServiceDetails />
    </WordPressPage>
  );
}
