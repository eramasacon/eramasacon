import type { Metadata } from "next";
import { CivilAndMechanicalConstructionPage } from "@/components/civil-and-mechanical-construction/civil-and-mechanical-construction-page";

export const metadata: Metadata = { title: "Civil and mechanical construction" };

export default function Page() {
  return <CivilAndMechanicalConstructionPage />;
}
