import { homeMetrics } from "@/content/home-metrics";
import styles from "./key-metrics.module.css";

export function KeyMetrics() {
  return (
    <section className={styles.section} aria-label="Eram Asacon in numbers">
      <p className={styles.eyebrow}>ERAM ASACON IN NUMBERS</p>
      <dl className={styles.metrics}>
        {homeMetrics.map(({ value, label }) => (
          <div className={styles.metric} key={label}>
            <dt>{label}</dt>
            <dd>{value}<span>+</span></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
