export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls `callback` once, the first time `element` enters the viewport. */
export function onFirstView(element: Element | null, callback: () => void) {
  if (!element) return () => {};
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(element);
  return () => observer.disconnect();
}
