// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { GlobalPresence } from "./sections/global-presence";
import { Introduction } from "./sections/introduction";
import { MissionVision } from "./sections/mission-vision";
import { Values } from "./sections/values";

/** WordPress page 48 (/about-us/), section by section. */
export function AboutPage() {
  return (
    <WordPressPage pageId={48} stylesheet="/legacy/css/page-about.css">
      <Banner />
      <Introduction />
      <GlobalPresence />
      <Values />
      <MissionVision />
    </WordPressPage>
  );
}
