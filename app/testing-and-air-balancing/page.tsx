import type { Metadata } from "next";
import { TestingAndAirBalancingPage } from "@/components/testing-and-air-balancing/testing-and-air-balancing-page";

export const metadata: Metadata = { title: "Testing and air balancing" };

export default function Page() {
  return <TestingAndAirBalancingPage />;
}
