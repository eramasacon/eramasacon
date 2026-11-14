import styles from "./why-us.module.css";

const reasons = [
  {
    title: "Complete MEP solutions",
    description: "Design, fabrication, installation, and maintenance from one team.",
  },
  {
    title: "Expert support",
    description: "Practical training and technical help to keep your systems running smoothly.",
  },
  {
    title: "Long-term partnership",
    description: "Ongoing care and optimization to reduce downtime as your needs evolve.",
  },
  {
    title: "Quality & performance",
    description: "A focus on efficiency and compliance, from installation through daily operation.",
  },
];

export function WhyUs() {
  return (
    <section className={styles.section} aria-labelledby="why-us-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>04 / WHY US</p>
        <h2 id="why-us-title">Built on expertise.<br /><span>Backed by support.</span></h2>
        <p className={styles.summary}>One engineering partner, with you from the first drawing to everyday operation.</p>
      </div>
      <ul className={styles.reasons}>
        {reasons.map((reason, index) => (
          <li className={styles.reason} key={reason.title}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
