import { Banner } from "./sections/banner";
import { ContactForm } from "./contact-form";
import { PresenceMap } from "@/components/about/presence-map";
import styles from "@/components/site/interior.module.css";

export function ContactPage() {
  return (
    <main id="content" tabIndex={-1} className={`${styles.page} interior-page`}>
      <link rel="stylesheet" href="/legacy/css/page-contact.css" precedence="wordpress-page" />
      <Banner />
      <section className={`${styles.split} ${styles.contact}`} aria-labelledby="contact-form-title">
        <div><p className={styles.eyebrow}>LET’S TALK</p><h2 id="contact-form-title">How can we help?</h2><p className={styles.contactIntro}>Share your requirements below. Fields marked * are required.</p><ContactForm /></div>
        <aside className={styles.contactDetails} aria-label="Contact details and global presence">
          <h3>Get in touch</h3>
          <address>#353, 2nd floor, Khobar mall,<br />King Fahd Road, Al Khobar</address>
          <a href="tel:+966138656686">+966 138656686</a>
          <a href="mailto:info@eramasacon.com">info@eramasacon.com</a>
          <h3 className={styles.presenceTitle}>International presence</h3>
          <PresenceMap />
        </aside>
      </section>
    </main>
  );
}
