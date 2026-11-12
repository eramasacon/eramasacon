import type { Metadata } from "next";
import { FirefightingPage } from "@/components/firefighting/firefighting-page";

export const metadata: Metadata = { title: "Firefighting" };

export default function Page() {
  return <FirefightingPage />;
}
