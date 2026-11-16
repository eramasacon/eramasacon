import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ElectricalAndInstrumentationPage } from "@/components/electrical-and-instrumentation/electrical-and-instrumentation-page";

export const metadata: Metadata = pageMetadata({ title: "Electrical and Instrumentation", description: "Electrical and instrumentation services: testing, switchgear, transformer works, startup and automation solutions for industrial and commercial projects.", path: "/electrical-and-instrumentation" });

export default function Page() {
  return <ElectricalAndInstrumentationPage />;
}
