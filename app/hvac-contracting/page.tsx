import type { Metadata } from "next";
import { HvacContractingPage } from "@/components/hvac-contracting/hvac-contracting-page";

export const metadata: Metadata = { title: "HVAC Contracting" };

export default function Page() {
  return <HvacContractingPage />;
}
