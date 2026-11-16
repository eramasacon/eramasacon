import type { MetadataRoute } from "next";
import { SITE_URL, sitePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
