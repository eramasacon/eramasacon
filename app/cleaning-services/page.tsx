import type { Metadata } from "next";
import { CleaningServicesPage } from "@/components/cleaning-services/cleaning-services-page";

export const metadata: Metadata = { title: "Cleaning services" };

export default function Page() {
  return <CleaningServicesPage />;
}
