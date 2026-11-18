type ArrowDirection = "up-right" | "right" | "down" | "chevron-down";

const paths: Record<ArrowDirection, string> = {
  "up-right": "M6 18 18 6M6 6h12v12",
  right: "M4 12h16m-7-7 7 7-7 7",
  down: "M12 4v16m-7-7 7 7 7-7",
  "chevron-down": "m6 9 6 6 6-6",
};

/** Vector arrows stay consistent across platforms without emoji font fallback. */
export function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", verticalAlign: "-0.125em", flexShrink: 0 }}
    >
      <path d={paths[direction]} />
    </svg>
  );
}
