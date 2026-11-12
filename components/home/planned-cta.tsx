import type { ReactNode } from "react";
import styles from "./home.module.css";

/** Source CTA retained but not navigable until its planned destination exists. */
export function PlannedCta({
  children, destination, sourceId, variant = "outline", label,
}: {
  children: ReactNode;
  destination: string;
  sourceId: string;
  variant?: "outline" | "solid" | "service";
  label?: string;
}) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={label}
      data-planned-href={destination}
      data-source-widget={sourceId}
      className={`${styles.cta} ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
