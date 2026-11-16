import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    // Pre-launch/staging: keep crawlers out entirely.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    // Do not block /_next/: Google needs the JS/CSS to render pages.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
