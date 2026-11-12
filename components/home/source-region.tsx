import type { ReactNode } from "react";

type SourceRegionProps = {
  sourceId: string;
  order: number;
  className?: string;
  children?: ReactNode;
  labelledBy?: string;
  fidelity: "partial" | "blocked";
};

/** Stable source markers preserve all regions without presenting invented filler. */
export function SourceRegion({
  sourceId, order, className, children, labelledBy, fidelity,
}: SourceRegionProps) {
  const source = {
    "data-source-region": sourceId,
    "data-source-order": order,
    "data-fidelity": fidelity,
  };
  if (fidelity === "blocked") return <div {...source} hidden />;
  return (
    <section {...source} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
