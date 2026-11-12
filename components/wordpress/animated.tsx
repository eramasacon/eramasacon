"use client";

import { useEffect, useState, type HTMLAttributes } from "react";
import { onFirstView, prefersReducedMotion } from "./in-view";

type AnimatedProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "span";
  /** Elementor entrance animation name, e.g. "fadeInDown". */
  animation: string;
  /** Delay in ms (Elementor "Animation Delay"). */
  delay?: number;
};

/**
 * Elementor entrance animation. The element starts with `elementor-invisible`
 * (as rendered by WordPress) and gets `animated <animation>` once in view.
 */
export function Animated({ as: Tag = "div", animation, delay = 0, className = "", ...rest }: AnimatedProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [state, setState] = useState<"hidden" | "visible" | "animated">("hidden");

  useEffect(() => {
    let timer: number | undefined;
    const disconnect = onFirstView(node, () => {
      const show = () => setState(prefersReducedMotion() ? "visible" : "animated");
      if (delay) timer = window.setTimeout(show, delay);
      else show();
    });
    return () => {
      disconnect();
      window.clearTimeout(timer);
    };
  }, [node, delay]);

  const classes = className.split(" ").filter((c) => c && c !== "elementor-invisible");
  if (state === "hidden") classes.push("elementor-invisible");
  if (state === "animated") classes.push("animated", animation);
  return <Tag {...rest} ref={setNode} className={classes.join(" ")} />;
}
