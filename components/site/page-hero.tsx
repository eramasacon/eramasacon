/* eslint-disable @next/next/no-img-element -- static WordPress uploads, matching the rest of the site */
import Link from "next/link";
import styles from "./site.module.css";

type PageHeroProps = {
  title: string;
  description: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** Decorative photo shown beside the copy. */
  image?: string;
  /** Adds a Services crumb between Home and the page. */
  service?: boolean;
};

export function PageHero({ title, description, eyebrow, image, service = false }: PageHeroProps) {
  return (
    <header className={`${styles.pageHero} ${image ? styles.pageHeroWithImage : ""}`}>
      <div className={styles.pageHeroCopy}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <ol>
            <li><Link href="/">Home</Link></li>
            {service && <li><Link href="/services">Services</Link></li>}
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        {eyebrow && <p className={styles.pageHeroEyebrow}>{eyebrow}</p>}
        <h1>{title}</h1>
        <p className={styles.pageHeroLead}>{description}</p>
      </div>
      {image && (
        <div className={styles.pageHeroMedia}>
          <img src={image} alt="" fetchPriority="high" decoding="async" />
        </div>
      )}
    </header>
  );
}
