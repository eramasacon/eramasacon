/* eslint-disable @next/next/no-img-element -- original local service imagery */
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
    "title": "Flooring and landscaping",
    "href": "/flooring-and-landscaping",
    "image": "/wp-content/uploads/2025/02/xcxcxcv.webp",
    "description": "Expert flooring and landscaping solutions that blend durability with aesthetics."
  },
  {
    "title": "Civil and mechanical construction",
    "href": "/civil-and-mechanical-construction",
    "image": "/wp-content/uploads/2025/02/jkhj.webp",
    "description": "Civil and mechanical construction, including steel structures, equipment erection, and temporary facilities."
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
    "title": "Testing and air balancing",
    "href": "/testing-and-air-balancing",
    "image": "/wp-content/uploads/2025/03/9125.webp",
    "description": "Eram Asacon provides expert testing and air balancing services, improving HVAC efficiency and comfort."
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
                <div className={styles.cardFooter}><span>Explore service</span><span className={styles.arrow} aria-hidden="true">↗</span></div>
              </div>
            </Link>
          ))}
        </div>
        <aside className={styles.contact}>
          <div><h3>Let’s find the right solution.</h3><p>Tell us about your project. Our team is ready to help.</p></div>
          <Link href="/contact-us">Discuss your project <span aria-hidden="true">↗</span></Link>
        </aside>
      </div>
    </section>
  );
}
