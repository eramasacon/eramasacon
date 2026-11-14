import { ArrowIcon } from "@/components/site/arrow-icon";
import Link from "next/link";
import { companyProfile } from "@/content/site-navigation";
import styles from "./site.module.css";

export function ServicePanel({ kind, className = "" }: { kind: "profile" | "contact"; className?: string }) {
  return (
    <aside className={`${styles.servicePanel} ${className}`}>
      <h2>{kind === "profile" ? "Company profile" : "Get in touch"}</h2>
      <p>{kind === "profile" ? "Explore our services and engineering expertise." : "Tell us about your project. Our team is ready to help."}</p>
      {kind === "profile" ? <a href={companyProfile} download>Download profile <span aria-hidden="true"><ArrowIcon direction="down" /></span></a> : <Link href="/contact-us">Talk to our team <span aria-hidden="true"><ArrowIcon /></span></Link>}
    </aside>
  );
}
