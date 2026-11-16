import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Files in public/ are not content-hashed, so Next serves them with max-age=0.
  // Let browsers/CDNs reuse them; rename a file when its content changes.
  async headers() {
    const longCache = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];
    return [
      { source: "/images/:path*", headers: longCache },
      { source: "/wp-content/:path*", headers: longCache },
      { source: "/legacy/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      // The installed Tailwind loader is needed only for the global entry.
      // Leave .module.css resources to Next's native CSS Modules pipeline.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
};

export default nextConfig;
