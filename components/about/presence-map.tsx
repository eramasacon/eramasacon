/* eslint-disable @next/next/no-img-element -- existing local imagery */
import styles from "./presence-map.module.css";

type Role = "hq" | "office" | "presence";

/**
 * Countries from the original WordPress map (14 markers). Positions are % of the
 * map image, computed from each country's coordinates for this map's Miller
 * projection (the original hand-placed pins sat off-target).
 */
const locations: { name: string; x: number; y: number; role: Role }[] = [
  { name: "Saudi Arabia", x: 60.03, y: 48.84, role: "hq" },
  { name: "India", x: 69.67, y: 50.02, role: "office" },
  { name: "UAE", x: 62.77, y: 49.08, role: "office" },
  { name: "Kuwait", x: 60.78, y: 45.65, role: "presence" },
  { name: "Bahrain", x: 61.63, y: 47.62, role: "presence" },
  { name: "Qatar", x: 61.82, y: 48.07, role: "presence" },
  { name: "Oman", x: 63.49, y: 50.61, role: "presence" },
  { name: "United Kingdom", x: 46.65, y: 30.06, role: "presence" },
  { name: "Ireland", x: 44.78, y: 29.53, role: "presence" },
  { name: "Spain", x: 46.02, y: 38.73, role: "presence" },
  { name: "Italy", x: 50.68, y: 36.98, role: "presence" },
  { name: "South Korea", x: 83.86, y: 41.27, role: "presence" },
  { name: "Thailand", x: 76.15, y: 53.8, role: "presence" },
  { name: "Sri Lanka", x: 70.31, y: 58.18, role: "presence" },
];

const groups: { role: Role; label: string }[] = [
  { role: "hq", label: "Headquarters" },
  { role: "office", label: "Regional offices" },
  { role: "presence", label: "Also operating in" },
];

// Large markers last so they draw on top of the small Gulf markers around them.
const drawOrder = [...locations].sort((a, b) => Number(a.role !== "presence") - Number(b.role !== "presence"));

export function PresenceMap() {
  return (
    <figure className={styles.map}>
      <div className={styles.canvas}>
        <img
          src="/wp-content/uploads/2025/01/325051862_fa899d86-37bf-46b5-88eb-abe693907fc5-3-1.png"
          alt=""
          width="1234"
          height="633"
          loading="lazy"
        />
        {drawOrder.map(({ name, x, y, role }) => (
          <span
            key={name}
            className={`${styles.marker} ${styles[role]}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            data-label={name}
            aria-hidden="true"
          >
            <span className={styles.dot} />
          </span>
        ))}
      </div>
      <figcaption className={styles.legend}>
        <span className={styles.srOnly}>Eram Holdings’ international presence: </span>
        {groups.map(({ role, label }) => (
          <div key={role} className={styles.group}>
            <span className={`${styles.key} ${styles[role]}`} aria-hidden="true" />
            <div>
              <span className={styles.groupLabel}>{label}</span>
              <ul>
                {locations.filter((l) => l.role === role).map(({ name }) => <li key={name}>{name}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
