import type { Metadata } from "next";
import { MepDesignConsultancyPage } from "@/components/mep-design-consultancy/mep-design-consultancy-page";

export const metadata: Metadata = { title: "MEP Design" };

export default function Page() {
  return <MepDesignConsultancyPage />;
}
