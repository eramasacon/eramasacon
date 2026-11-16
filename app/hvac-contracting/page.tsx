import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { HvacContractingPage } from "@/components/hvac-contracting/hvac-contracting-page";

export const metadata: Metadata = pageMetadata({ title: "HVAC Contracting", description: "HVAC contracting in Saudi Arabia: design, LSTK projects, installation, startup, testing and maintenance of chillers, AHUs and ductwork by Eram Asacon.", path: "/hvac-contracting" });

export default function Page() {
  return <HvacContractingPage />;
}
