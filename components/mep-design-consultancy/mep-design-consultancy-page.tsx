// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ServiceDetails } from "./sections/service-details";

/** WordPress page 1216 (/mep-design-consultancy/), section by section. */
export function MepDesignConsultancyPage() {
  return (
    <WordPressPage pageId={1216} stylesheet="/legacy/css/page-mep-design-consultancy.css">
      <Banner />
      <ServiceDetails />
    </WordPressPage>
  );
}
