import type { Metadata } from "next";

/** Public origin used for canonical URLs, the sitemap and social previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eramasacon.com").replace(/\/$/, "");

/**
 * Search engines may index the site only when SITE_INDEXING=true.
 * Keep it unset on local/staging builds; set it on the live deployment.
 */
export const SITE_INDEXABLE = process.env.SITE_INDEXING === "true";

export const SITE_NAME = "Eram Asacon";
export const SITE_DESCRIPTION =
  "Eram Asacon delivers complete MEP and HVAC contracting in Saudi Arabia: design, duct fabrication, installation, electrical, firefighting and long-term maintenance.";
export const SITE_IMAGE = { url: "/images/site/hero-chiller-plant.webp", width: 2048, height: 1536, alt: "Eram Asacon chilled water plant installation" };

/** Indexable public pages, used by the sitemap. Redirect-only routes are excluded. */
export const sitePages = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hvac-contracting", priority: 0.8, changeFrequency: "yearly" },
  { path: "/electrical-and-instrumentation", priority: 0.8, changeFrequency: "yearly" },
  { path: "/mep-design-consultancy", priority: 0.8, changeFrequency: "yearly" },
  { path: "/firefighting", priority: 0.8, changeFrequency: "yearly" },
  { path: "/fabrication", priority: 0.8, changeFrequency: "yearly" },
  { path: "/cleaning-services", priority: 0.8, changeFrequency: "yearly" },
  { path: "/portfolio-2", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "yearly" },
] as const;

/** Per-page metadata with canonical URL and matching social preview text. */
export function pageMetadata({ title, description, path, image }: { title?: string; description: string; path: string; image?: string }): Metadata {
  const ogTitle = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} | MEP & HVAC Contracting`;
  const images = image ? [{ url: image }] : [SITE_IMAGE];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description, url: path, images },
    twitter: { title: ogTitle, description, images: images.map((i) => i.url) },
  };
}
