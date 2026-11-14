/* eslint-disable @next/next/no-img-element -- existing local imagery */
import { ArrowIcon } from "@/components/site/arrow-icon";
import Link from "next/link";
import { Banner } from "./sections/banner";
import { ProjectCta } from "@/components/site/project-cta";
import { KeyMetrics } from "@/components/home/sections/key-metrics";
import styles from "@/components/site/interior.module.css";

export function AboutPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Banner />
      <section className={styles.split} aria-labelledby="about-intro-title">
        <div><p className={styles.eyebrow}>WHO WE ARE</p><h2 id="about-intro-title">Engineering excellence.<br />Complete solutions.</h2><p>Eram Asacon delivers expert construction, MEP, and HVAC solutions, ensuring efficiency, compliance, and long-term reliability. From design to maintenance, we provide seamless, high-performance systems designed to meet industry standards and evolving client needs.</p>
          <ul><li>Integrated MEP solutions ensuring efficiency, safety, and compliance.</li><li>Innovative HVAC and duct systems for superior performance.</li></ul>
          <Link className={styles.button} href="/services">Explore our services <span aria-hidden="true"><ArrowIcon /></span></Link>
        </div>
        <img src="/wp-content/uploads/2025/02/freepik__enhance__89235-1-1024x620.png" alt="Engineer inspecting industrial pipework" width="1024" height="620" />
      </section>
      <KeyMetrics />
      <section className={`${styles.split} ${styles.global}`} aria-labelledby="global-title">
        <img src="/wp-content/uploads/2025/01/325051862_fa899d86-37bf-46b5-88eb-abe693907fc5-3-1.png" alt="Map showing Eram Holdings’ international presence" width="1234" height="633" loading="lazy" />
        <div><p className={styles.eyebrow}>ERAM HOLDINGS</p><h2 id="global-title">Global presence.<br />Shared expertise.</h2><p>Eram Holdings, since its humble beginning in the 1990s, has experienced significant growth under the charismatic leadership team. Today, we have expanded into a business conglomerate operating nine business verticals with headquarters in Saudi Arabia, regional offices in India and the UAE, and over 150 offices spread across 16 countries in Asia and Europe.</p><p>We have state of art manufacturing units with a dedicated research and development team focused on customising and developing new products. As a preferred technology and engineering partner for our clients, we integrate the latest technologies into our products and pioneer industry and regional initiatives in the countries we operate.</p>
          <dl className={styles.groupMetrics}><div><dt>Workers employed</dt><dd>6k+</dd></div><div><dt>Projects completed</dt><dd>20k+</dd></div><div><dt>Global locations</dt><dd>14+</dd></div></dl>
        </div>
      </section>
      <section className={styles.principles} aria-label="Our mission and vision">
        <article><p className={styles.eyebrow}>OUR PURPOSE</p><h2>Mission</h2><p>Delivering comprehensive MEP and HVAC solutions worldwide, including design, fabrication, compliance, and maintenance. Our global presence ensures industry-compliant, efficient, and reliable services, tailored to meet the diverse needs of our clients.</p></article>
        <article><p className={styles.eyebrow}>OUR AMBITION</p><h2>Vision</h2><p>To be a global leader in innovative, efficient, and sustainable MEP and HVAC solutions, enhancing infrastructure, optimizing performance, and meeting evolving client and community needs with excellence.</p></article>
      </section>
      <ProjectCta />
    </main>
  );
}
