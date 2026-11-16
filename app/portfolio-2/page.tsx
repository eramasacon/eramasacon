import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { ProjectsPage } from "@/components/projects/projects-page";

export const metadata: Metadata = pageMetadata({ title: "Projects", description: "Eram Asacon projects for Saudi Aramco, SWCC, SEC, Sipchem, Hadeed and more: HVAC, desalination plant, substation and electrical works across Saudi Arabia.", path: "/portfolio-2", image: "/images/site/banner-chilled-water-plant.webp" });

export default function Projects() { return <ProjectsPage />; }
