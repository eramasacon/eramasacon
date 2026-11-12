"use client";

import { useEffect, useRef, useState } from "react";
import { onFirstView, prefersReducedMotion } from "./in-view";

type CounterProps = {
  className?: string;
  from: number;
  to: number;
  /** Animation length in ms. */
  duration: number;
  /** Thousands separator. */
  delimiter?: string;
};

const format = (value: number, delimiter: string) =>
  Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

/** Elementor counter widget number: counts from `from` to `to` once in view. */
export function Counter({ className, from, to, duration, delimiter = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    let frame = 0;
    const disconnect = onFirstView(ref.current, () => {
      const length = prefersReducedMotion() ? 0 : duration;
      const start = performance.now();
      const step = (now: number) => {
        const progress = length ? Math.min((now - start) / length, 1) : 1;
        const eased = 0.5 - Math.cos(progress * Math.PI) / 2; // jQuery "swing", as Elementor uses
        setValue(from + (to - from) * eased);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    return () => {
      disconnect();
      cancelAnimationFrame(frame);
    };
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value, delimiter)}
    </span>
  );
}
