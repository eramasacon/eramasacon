"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "./in-view";

/** Rebind the shared scroll control after client-side navigation. */
export function ElementorRuntime() {
  // Re-bind after client-side navigations.
  const pathname = usePathname();

  useEffect(() => {
    return initScrollToTop();
  }, [pathname]);

  return null;
}

function initScrollToTop() {
  const button = document.getElementById("ast-scroll-top");
  if (!button) return () => {};
  // Astra shows the button once the page is scrolled more than 300px.
  const update = () => {
    button.style.display = window.scrollY > 300 ? "block" : "none";
  };
  const toTop = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key !== "Enter") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  button.addEventListener("click", toTop);

  return () => {
    window.removeEventListener("scroll", update);
    button.removeEventListener("click", toTop);

  };
}
