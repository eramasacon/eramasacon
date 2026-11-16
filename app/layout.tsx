import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | MEP & HVAC Contracting in Saudi Arabia`, template: `%s – ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Indexing is off unless SITE_INDEXING=true is set on the live deployment.
  robots: SITE_INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: "/", title: SITE_NAME, description: SITE_DESCRIPTION, images: [SITE_IMAGE] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: [SITE_IMAGE.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#c5352d" };

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/wp-content/uploads/2025/02/lkjdfldfhg-1024x272.png`,
  image: `${SITE_URL}${SITE_IMAGE.url}`,
  description: SITE_DESCRIPTION,
  telephone: "+966138656686",
  email: "info@eramasacon.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#353, 2nd floor, Khobar Mall, King Fahd Road",
    addressLocality: "Al Khobar",
    addressCountry: "SA",
  },
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        <ScrollToTop />
        <ElementorRuntime />
      </body>
    </html>
  );
}
