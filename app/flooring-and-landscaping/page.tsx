import type { Metadata } from "next";
import { FlooringAndLandscapingPage } from "@/components/flooring-and-landscaping/flooring-and-landscaping-page";

export const metadata: Metadata = { title: "Flooring and landscaping" };

export default function Page() {
  return <FlooringAndLandscapingPage />;
}
