import Link from "next/link";
import styles from "./site.module.css";

export function PageHero({ title, description, service = false }: { title: string; description: string; service?: boolean }) {
  return (
    <header className={styles.pageHero}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link href="/">Home</Link></li>
          {service && <li><Link href="/services">Services</Link></li>}
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
