/* eslint-disable @next/next/no-img-element -- local company logo */
import Link from "next/link";
import { mainNavigation, serviceNavigation } from "@/content/site-navigation";
import styles from "./site.module.css";

export function SiteFooter() {
  return (
    <footer id="colophon" className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerIntro}>
          <Link href="/" aria-label="Eram Asacon home"><img src="/wp-content/uploads/2025/02/lkjdfldfhg-1024x272.png" alt="Eram Asacon" width="204" height="54" loading="lazy" /></Link>
          <p>Complete MEP, HVAC, and construction solutions. Engineered for efficiency and reliable performance.</p>
        </div>
        <nav aria-label="Footer navigation"><h2>Explore</h2><ul>{mainNavigation.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <nav aria-label="Our services"><h2>Our services</h2><ul>{serviceNavigation.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav>
        <div><h2>Get in touch</h2><address>#353, 2nd floor, Khobar mall,<br />King Fahd Road, Al Khobar</address><a href="tel:+966138656686">+966 138656686</a><a href="mailto:info@eramasacon.com">info@eramasacon.com</a></div>
      </div>
      <div className={styles.footerBottom}><p>© 2026 Eram Asacon. All rights reserved.</p><span>ENGINEERED FOR PERFORMANCE</span></div>
    </footer>
  );
}
