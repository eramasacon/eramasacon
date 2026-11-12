import type { Metadata } from "next";
import { FabricationPage } from "@/components/fabrication/fabrication-page";

export const metadata: Metadata = { title: "Fabrication" };

export default function Page() {
  return <FabricationPage />;
}
