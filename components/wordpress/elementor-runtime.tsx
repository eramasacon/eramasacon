"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "./in-view";

/**
 * Site-wide behaviours the WordPress theme/plugins added with jQuery, for the
 * ported header/footer markup:
 *
 * - ElementsKit nav menu: off-canvas toggle and submenu-arrow clicks
 * - Astra "scroll to top" button
 *
 * It only toggles classes/inline display on static server-rendered nodes, as
 * the original scripts did. Per-widget behaviour (counters, entrance
 * animations, testimonials carousel) lives in dedicated components.
 */
export function ElementorRuntime() {
  // Re-bind after client-side navigations.
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [initNavMenu(), initScrollToTop()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}

function initNavMenu() {
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const toggler = target.closest<HTMLElement>(".elementskit-menu-toggler");
    if (toggler) {
      event.preventDefault();
      const scope = toggler.closest(".elementskit-menu-container")?.parentElement ?? toggler.parentElement;
      scope?.querySelectorAll(".elementskit-menu-offcanvas-elements").forEach((el) => el.classList.toggle("active"));
      return;
    }

    // The menu uses "submenu-click-on-icon": only the arrow opens a submenu.
    if (target.classList.contains("elementskit-submenu-indicator")) {
      const panel = target.closest(".elementskit-dropdown-has")?.querySelector(":scope > .elementskit-dropdown");
      if (!panel) return;
      event.preventDefault();
      panel.querySelectorAll(".elementskit-dropdown-open").forEach((el) => el.classList.remove("elementskit-dropdown-open"));
      panel.classList.toggle("elementskit-dropdown-open");
      return;
    }

    // Close the off-canvas menu after following a link.
    if (target.closest(".elementskit-navbar-nav a")) {
      document.querySelectorAll(".elementskit-menu-offcanvas-elements.active").forEach((el) => el.classList.remove("active"));
    }
  };
  // Capture phase so the submenu arrow inside a <Link> can cancel navigation.
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
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
  button.addEventListener("keydown", toTop);
  return () => {
    window.removeEventListener("scroll", update);
    button.removeEventListener("click", toTop);
    button.removeEventListener("keydown", toTop);
  };
}
