import type { Metadata } from "next";
import { ProfileRequestProvider } from "@/components/site/profile-request";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { SiteFooter } from "@/components/site/site-footer";
import { StickyHeader } from "@/components/site/sticky-header";
import { SiteHeader } from "@/components/site/site-header";
import { ElementorRuntime } from "@/components/wordpress/elementor-runtime";
import { fontVariables } from "./fonts";
import "./globals.css";
import "./consistency.css";

export const metadata: Metadata = {
  title: { default: "Eram Asacon", template: "%s – Eram Asacon" },
  // Local migration build; enable indexing when the site goes live.
  robots: { index: false, follow: false },
};

// Body classes WordPress (Astra + Elementor) rendered on every page. The
// ported stylesheets depend on them.
const wordpressBodyClasses = [
  "wp-singular page-template-default page wp-theme-astra",
  "ehf-header ehf-footer ehf-template-astra ehf-stylesheet-astra jkit-color-scheme",
  "ast-desktop ast-page-builder-template ast-no-sidebar astra-4.10.1 ast-single-post",
  "ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-6 elementor-page",
].join(" ");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={fontVariables}>
      <body className={wordpressBodyClasses} itemScope itemType="https://schema.org/WebPage">
        {/* Original Astra/Elementor CSS, bundled in source order by scripts/wp-port/port_page.py.
            Served from public/ so the plugin CSS is shipped byte-for-byte rather than re-processed. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/legacy/css/site.css" precedence="wordpress-site" />
        <a className="skip-link screen-reader-text" href="#content" title="Skip to content">
          Skip to content
        </a>
        <ProfileRequestProvider>
          <div className="hfeed site" id="page">
            <StickyHeader><SiteHeader /></StickyHeader>
            {children}
            <SiteFooter />
          </div>
        </ProfileRequestProvider>
        <ScrollToTop />
        <ElementorRuntime />
      </body>
    </html>
  );
}
