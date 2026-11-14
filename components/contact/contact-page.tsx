/* eslint-disable @next/next/no-img-element -- existing local presence map */
import { Banner } from "./sections/banner";
import { ContactForm } from "./contact-form";
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
          <img src="/wp-content/uploads/2025/01/325051862_fa899d86-37bf-46b5-88eb-abe693907fc5-3-1.png" alt="Map of our international presence" width="1234" height="633" loading="lazy" />
          <h3>International presence</h3>
          <p className={styles.countries}>Saudi Arabia · UAE · India · Ireland · Oman · Qatar · Bahrain · Kuwait · UK · Italy · Spain · South Korea · Thailand · Sri Lanka</p>
        </aside>
      </section>
    </main>
  );
}
