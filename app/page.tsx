import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = { title: "MEP & HVAC Contracting", description: "Explore Eram Asacon contracting services, from MEP and HVAC design to fabrication, installation, and maintenance." };

export default function Home() {
  return <HomePage />;
}
