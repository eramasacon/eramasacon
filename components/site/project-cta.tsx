import { ArrowIcon } from "@/components/site/arrow-icon";
import Link from "next/link";
import styles from "./site.module.css";

export function ProjectCta() {
  return (
    <section className={styles.cta} aria-labelledby="project-cta-title">
      <div><p className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT</p><h2 id="project-cta-title">Your project.<br />Our expertise.</h2></div>
      <div><p>Tell us what you’re planning.<br />Our team is ready to help.</p><Link href="/contact-us">Talk to our team <span aria-hidden="true"><ArrowIcon /></span></Link></div>
    </section>
  );
}
