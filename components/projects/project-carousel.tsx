"use client";

import { Children, useRef, useState, type ReactNode } from "react";

/** One image per card, looping arrows and drag gestures, as in WordPress. */
export function ProjectCarousel({ id, children }: { id: string; children: ReactNode }) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const origin = useRef<number | null>(null);
  const move = (delta: number) => setIndex((current) => (current + delta + slides.length) % slides.length);
  return (
    <div id={id} className="uc_carousel owl-carousel uc-items-wrapper owl-loaded owl-drag" role="region" aria-label="Project images" aria-roledescription="carousel"
      onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
      <div className="owl-stage-outer" style={{ touchAction: "pan-y" }}
        onPointerDown={(event) => { origin.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerUp={(event) => { if (origin.current !== null && Math.abs(event.clientX - origin.current) > 40) move(event.clientX < origin.current ? 1 : -1); origin.current = null; }}
        onPointerCancel={() => { origin.current = null; }}
        onDragStart={(event) => event.preventDefault()}
        onClick={(event) => { if ((event.target as HTMLElement).closest('a[href="#"]')) event.preventDefault(); }}>
        <div className="owl-stage">
          <div className="owl-item active" style={{ width: "100%" }} role="group" aria-label={`${index + 1} of ${slides.length}`}>{slides[index]}</div>
        </div>
      </div>
      <div className={`owl-nav${slides.length < 2 ? " disabled" : ""}`}>
        <button type="button" className="owl-prev" aria-label="Previous project image" onClick={() => move(-1)}><i className="fas fa-chevron-left" aria-hidden="true" /></button>
        <button type="button" className="owl-next" aria-label="Next project image" onClick={() => move(1)}><i className="fas fa-chevron-right" aria-hidden="true" /></button>
      </div>
    </div>
  );
}
