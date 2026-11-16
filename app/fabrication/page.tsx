import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { FabricationPage } from "@/components/fabrication/fabrication-page";

export const metadata: Metadata = pageMetadata({ title: "Fabrication", description: "Duct fabrication, turnery products and steel structures produced in Eram Asacon's own factory for HVAC and industrial projects.", path: "/fabrication", image: "/images/services/duct-fabrication-line.webp" });

export default function Page() {
  return <FabricationPage />;
}
