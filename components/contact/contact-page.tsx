// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
import { WordPressPage } from "@/components/wordpress/wordpress-page";
import { Banner } from "./sections/banner";
import { ContactDetails } from "./sections/contact-details";
import { ContactForm } from "./sections/contact-form";

/** WordPress page 54 (/contact-us/), section by section. */
export function ContactPage() {
  return (
    <WordPressPage pageId={54} stylesheet="/legacy/css/page-contact.css">
      <Banner />
      <ContactForm />
      <ContactDetails />
    </WordPressPage>
  );
}
