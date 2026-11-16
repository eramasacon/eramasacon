import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = pageMetadata({ description: "Eram Asacon delivers complete MEP and HVAC contracting in Saudi Arabia, from design and duct fabrication to installation, testing and long-term maintenance.", path: "/" });

export default function Home() {
  return <HomePage />;
}
