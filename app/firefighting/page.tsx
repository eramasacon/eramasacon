import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { FirefightingPage } from "@/components/firefighting/firefighting-page";

export const metadata: Metadata = pageMetadata({ title: "Firefighting", description: "Firefighting systems by Eram Asacon: fire detection, suppression and sprinkler design, installation, testing and ongoing support.", path: "/firefighting" });

export default function Page() {
  return <FirefightingPage />;
}
