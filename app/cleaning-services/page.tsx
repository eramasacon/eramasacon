import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { CleaningServicesPage } from "@/components/cleaning-services/cleaning-services-page";

export const metadata: Metadata = pageMetadata({ title: "Cleaning Services", description: "Duct cleaning, enzymatic coil cleaning and probiotic surface cleaning that improve air quality and HVAC system efficiency.", path: "/cleaning-services" });

export default function Page() {
  return <CleaningServicesPage />;
}
