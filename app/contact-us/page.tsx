import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Eram Asacon to discuss your contracting requirements and project enquiries.",
};

export default function ContactUs() {
  return <ContactPage />;
}
