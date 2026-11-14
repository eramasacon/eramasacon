"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Keep navigation above legacy page layouts and reserve its actual height. */
export function StickyHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = header.current;
    if (!element) return;
    const update = () => {
      const measured = element.getBoundingClientRect().height;
      setHeight(measured);
      document.documentElement.style.setProperty("--navigation-height", `${measured}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--navigation-height");
    };
  }, []);

  return (
    <div style={{ height: height ?? undefined, flexShrink: 0 }}>
      <div ref={header} style={{ position: height === null ? "relative" : "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 1000, background: "#fff", boxShadow: "0 3px 18px rgb(32 39 37 / 8%)" }}>
        {children}
      </div>
    </div>
  );
}
