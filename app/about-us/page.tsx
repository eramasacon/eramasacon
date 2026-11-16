import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = pageMetadata({ title: "About Us", description: "Learn about Eram Asacon, part of Eram Holdings: an engineering contractor delivering MEP, HVAC and construction solutions across Saudi Arabia since the 1990s.", path: "/about-us", image: "/images/site/banner-chiller-yard.webp" });

export default function AboutUs() {
  return <AboutPage />;
}
