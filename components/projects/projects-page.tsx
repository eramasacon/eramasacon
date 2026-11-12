// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ProjectGallery } from "./sections/project-gallery";
import { ProjectHeading } from "./sections/project-heading";

/** WordPress page 2739 (/portfolio-2/), section by section. */
export function ProjectsPage() {
  return (
    <WordPressPage pageId={2739} stylesheet="/legacy/css/page-projects.css">
      <Banner />
      <ProjectHeading />
      <ProjectGallery />
    </WordPressPage>
  );
}
