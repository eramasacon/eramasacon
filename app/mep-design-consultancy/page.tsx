import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { MepDesignConsultancyPage } from "@/components/mep-design-consultancy/mep-design-consultancy-page";

export const metadata: Metadata = pageMetadata({ title: "MEP Design Consultancy", description: "MEP design consultancy: integrated mechanical, electrical and plumbing design with detailed shop drawings, from planning through installation.", path: "/mep-design-consultancy" });

export default function Page() {
  return <MepDesignConsultancyPage />;
}
