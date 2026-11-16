import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = pageMetadata({ title: "Contact Us", description: "Contact Eram Asacon in Al Khobar to discuss your MEP, HVAC or contracting project. Call +966 138656686 or email info@eramasacon.com.", path: "/contact-us", image: "/images/site/banner-eram-asacon-factory.webp" });

export default function ContactUs() {
  return <ContactPage />;
}
