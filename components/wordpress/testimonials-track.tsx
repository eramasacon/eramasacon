"use client";

import { Children, cloneElement, isValidElement, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "./in-view";

type Breakpoint = { items: number | ""; margin: number | ""; breakpoint: number };

export type SliderSettings = {
  autoplay?: boolean;
  autoplay_speed?: number;
  autoplay_hover_pause?: boolean;
  responsive?: Record<string, Breakpoint>;
};

const SPEED = 300; // tiny-slider default transition, used by Jeg Kit

function layoutFor(width: number, breakpoints: Breakpoint[]) {
  let items = 1;
  let gutter = 0;
  for (const bp of breakpoints) {
    if (width < bp.breakpoint) continue;
    if (bp.items !== "") items = Number(bp.items);
    if (bp.margin !== "") gutter = Number(bp.margin);
  }
  return { items: Math.max(1, items), gutter };
}

/**
 * Jeg Kit testimonials carousel (tiny-slider with loop + autoplay). Renders the
 * original `.testimonials-track` with tiny-slider's classes; items are cloned
 * once so the loop can wrap seamlessly.
 */
export function TestimonialsTrack({ settings, children }: { settings: SliderSettings; children: ReactNode }) {
  const slides = Children.toArray(children);
  const breakpoints = Object.values(settings.responsive ?? {}).sort((a, b) => a.breakpoint - b.breakpoint);
  const [layout, setLayout] = useState(() => layoutFor(1440, breakpoints));
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => setLayout(layoutFor(window.innerWidth, breakpoints));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // breakpoints derive from static settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSlide = slides.length > layout.items;
  useEffect(() => {
    if (!settings.autoplay || !canSlide || paused || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setAnimate(true);
      setIndex((i) => i + 1);
    }, (settings.autoplay_speed ?? 5000) + SPEED);
    return () => window.clearInterval(timer);
  }, [settings.autoplay, settings.autoplay_speed, canSlide, paused]);

  // After sliding onto the clones, jump back to the matching original slide.
  useEffect(() => {
    if (index < slides.length) return;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, SPEED);
    return () => window.clearTimeout(timer);
  }, [index, slides.length]);

  const trackStyle: CSSProperties = {
    display: "flex",
    transform: `translateX(-${(index * 100) / layout.items}%)`,
    transition: animate ? `transform ${SPEED}ms ease` : "none",
  };
  // tiny-slider sizes each item inline: width per visible item, gutter as padding-right.
  const slideStyle: CSSProperties = {
    flex: `0 0 ${100 / layout.items}%`,
    paddingRight: layout.gutter,
    boxSizing: "border-box",
  };
  const withSlideProps = (slide: ReactNode, key: string, clone: boolean) =>
    isValidElement<{ className?: string; style?: CSSProperties }>(slide)
      ? cloneElement(slide, {
          key,
          className: `${slide.props.className ?? ""} tns-item${clone ? " tns-slide-cloned" : ""}`.trim(),
          style: { ...slide.props.style, ...slideStyle },
          ...(clone ? { "aria-hidden": true, inert: true } : {}),
        })
      : slide;

  return (
    <div
      className="tns-ovh"
      style={{ overflow: "hidden" }}
      onMouseEnter={() => settings.autoplay_hover_pause && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-track tns-slider tns-carousel tns-horizontal" style={trackStyle}>
        {slides.map((slide, i) => withSlideProps(slide, `slide-${i}`, false))}
        {canSlide && slides.map((slide, i) => withSlideProps(slide, `clone-${i}`, true))}
      </div>
    </div>
  );
}
