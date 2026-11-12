import type { Metadata } from "next";
import { ElectricalAndInstrumentationPage } from "@/components/electrical-and-instrumentation/electrical-and-instrumentation-page";

export const metadata: Metadata = { title: "Electrical and instrumentation" };

export default function Page() {
  return <ElectricalAndInstrumentationPage />;
}
