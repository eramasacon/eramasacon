// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ServiceOverview } from "./sections/service-overview";

/** WordPress page 50 (/services/), section by section. */
export function ServicesPage() {
  return (
    <WordPressPage pageId={50} stylesheet="/legacy/css/page-services.css">
      <Banner />
      <ServiceOverview />
    </WordPressPage>
  );
}
