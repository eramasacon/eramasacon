import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ServicesPage } from "@/components/services/services-page";

export const metadata: Metadata = pageMetadata({ title: "Services", description: "Explore Eram Asacon services: HVAC contracting, electrical and instrumentation, MEP design, firefighting, duct fabrication and specialist cleaning.", path: "/services", image: "/images/site/banner-chilled-water-pipework.webp" });

export default function Page() {
  return <ServicesPage />;
}
