/* eslint-disable @next/next/no-img-element -- original local service imagery */
import { ArrowIcon } from "@/components/site/arrow-icon";
import Link from "next/link";
import styles from "./service-overview.module.css";

const services = [
  {
    "title": "HVAC Contracting",
    "href": "/hvac-contracting",
    "image": "/wp-content/uploads/2025/02/gvvb.webp",
    "description": "Our HVAC services provide efficient, customized solutions that enhance comfort, air quality, and energy efficiency."
  },
  {
    "title": "Electrical and instrumentation",
    "href": "/electrical-and-instrumentation",
    "image": "/wp-content/uploads/2025/02/djhddff.webp",
    "description": "We provide innovative electrical and instrumentation solutions, prioritizing safety, compliance, and energy efficiency."
  },
  {
    "title": "MEP Design consultancy",
    "href": "/mep-design-consultancy",
    "image": "/wp-content/uploads/2025/02/xc-xc-cx.webp",
    "description": "Integrated MEP design solutions that optimize system efficiency and safety."
  },
  {
    "title": "Firefighting",
    "href": "/firefighting",
    "image": "/wp-content/uploads/2025/02/xcccX.webp",
    "description": "Fire detection and suppression systems, from design and installation to maintenance and support."
  },
  {
    "title": "Fabrication",
    "href": "/fabrication",
    "image": "/wp-content/uploads/2025/02/cbxcbx.webp",
    "description": "High-quality fabrication and precision ductwork, with durable, custom-built solutions."
  },
  {
    "title": "Cleaning services",
    "href": "/cleaning-services",
    "image": "/wp-content/uploads/2025/02/jkhj.webp",
    "description": "Eram Asacon offers professional cleaning services, ensuring spotless, eco-friendly, reliable, and customer-focused results."
  }
];

export function ServiceOverview() {
  return (
    <section className={styles.overview} aria-labelledby="service-overview-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div><p className={styles.eyebrow}>OUR EXPERTISE</p><h2 id="service-overview-title">Expertise for every<br /><span>stage of your project.</span></h2></div>
          <p className={styles.intro}>From design and construction to testing and maintenance. Explore the services that keep your projects moving and your systems performing.</p>
        </header>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Link className={styles.card} href={service.href} key={service.href}>
              <div className={styles.imageWrap}>
                <img src={service.image} alt="" loading="lazy" width="924" height="880" />
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className={styles.body}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className={styles.cardFooter}><span>Explore service</span><span className={styles.arrow} aria-hidden="true"><ArrowIcon /></span></div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
