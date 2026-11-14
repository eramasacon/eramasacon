/* eslint-disable @next/next/no-img-element -- original local WordPress assets */
import Link from "next/link";
import styles from "./redesign.module.css";

const services = [
  ["HVAC Contracting", "hvac-contracting", "Efficient, customized solutions for comfort, air quality, and energy efficiency."],
  ["Electrical & instrumentation", "electrical-and-instrumentation", "Specialized testing, switchgear services, and automation solutions."],
  ["MEP Design", "mep-design-consultancy", "Integrated design and detailed drawings, from planning to installation."],
  ["Firefighting", "firefighting", "Fire detection, suppression, installation, and ongoing support."],
  ["Fabrication", "fabrication", "Duct fabrication, turnery products, and steel structures."],
  ["Cleaning services", "cleaning-services", "Duct cleaning, enzymatic coil cleaning, and probiotic surface cleaning."],
];
const clients = [
  [
    "Saudi Aramco",
    "/wp-content/uploads/2026/02/cdnlogo.com_saudi-aramco-2048x2048-1-e1770540169432.webp"
  ],
  [
    "Royal Commission for Jubail and Yanbu",
    "/wp-content/uploads/2026/02/Logo_Royal_Commission_for_Jubail_Yanbu-e1770540261390.webp"
  ],
  [
    "Client logo 3",
    "/wp-content/uploads/2026/02/download-9.webp"
  ],
  [
    "TAQA",
    "/wp-content/uploads/2026/02/taqa-logo-1-copy.webp"
  ],
  [
    "Client logo 5",
    "/wp-content/uploads/2026/02/GS-Inima-web-scaled.webp"
  ],
  [
    "Client logo 6",
    "/wp-content/uploads/2025/04/Frame-2147226758-e1744886767824.png"
  ],
  [
    "Acciona",
    "/wp-content/uploads/2026/02/acciona-agua-logo-removebg-preview.webp"
  ],
  [
    "Siemens",
    "/wp-content/uploads/2026/02/Siemens_252x126-1.webp"
  ],
  [
    "Client logo 9",
    "/wp-content/uploads/2025/04/images-6-e1744885198560.png"
  ],
  [
    "Client logo 10",
    "/wp-content/uploads/2026/02/PikPng.com_febreze-logo-png_5424021.webp"
  ],
  [
    "Client logo 11",
    "/wp-content/uploads/2026/02/16ef5d64-6fc6-4310-86f1-463b70dfd951.webp"
  ],
  [
    "Sinopec",
    "/wp-content/uploads/2025/03/Sinopec-Logo.wine_.png"
  ],
  [
    "Client logo 13",
    "/wp-content/uploads/2026/02/cdbc6088b3c124acd85ec84e7591f421.webp"
  ],
  [
    "Client logo 14",
    "/wp-content/uploads/2026/02/SWA-1.webp"
  ],
  [
    "Client logo 15",
    "/wp-content/uploads/2026/02/NGRID.webp"
  ],
  [
    "Client logo 16",
    "/wp-content/uploads/2026/02/saudi-electricity-company-logo-png_seeklogo-122931-e1770540306866.webp"
  ],
  [
    "Client logo 17",
    "/wp-content/uploads/2025/04/logo-sipchem.png"
  ],
  [
    "Client logo 18",
    "/wp-content/uploads/2025/03/chemanol_0-removebg-preview.png"
  ],
  [
    "Client logo 19",
    "/wp-content/uploads/2026/02/20231210053721Worley_Logo.webp"
  ],
  [
    "Client logo 20",
    "/wp-content/uploads/2026/02/1184811.jpeg-1.webp"
  ],
  [
    "Client logo 21",
    "/wp-content/uploads/2026/02/ltgrouplogo-removebg-preview.webp"
  ],
  [
    "Client logo 22",
    "/wp-content/uploads/2025/03/a9a596d80212adc4db76719dea5d06d3.png"
  ],
  [
    "Client logo 23",
    "/wp-content/uploads/2025/04/1574965426370-removebg-preview.png"
  ],
  [
    "Client logo 24",
    "/wp-content/uploads/2025/04/McDermott_Technology_Logo.jpg"
  ]
];

export function HomePage() {
  return (
    <main id="content" className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <img className={styles.heroImage} src="/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp" alt="Industrial engineering and construction" fetchPriority="high" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ERAM ASACON · CONTRACTING</p>
          <h1 id="home-title">Building efficiency.<br /><span>From start to finish.</span></h1>
          <p className={styles.lead}>Complete MEP and HVAC solutions, covering design, fabrication, installation, and ongoing maintenance.</p>
          <div className={styles.actions}><Link className={styles.primary} href="/services">Explore our services <span aria-hidden="true">↗</span></Link><Link className={styles.lightLink} href="/portfolio-2">View our projects <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className={styles.heroBottom}><span>ENGINEERED FOR PERFORMANCE</span><a href="#expertise">Discover what we do <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className={styles.clients} aria-label="Our clients">
        <div className={styles.clientIntro}>
          <p>Working with<br /><strong>industry leaders.</strong></p>
        </div>
        <div className={styles.logoViewport} tabIndex={0} role="region" aria-label="Client logos. Focus to pause; scroll horizontally to explore.">
          <div className={styles.logoTrack}>
            {[0, 1].map((copy) => <div className={styles.logoGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {clients.map(([name, src]) => <img key={src} src={src} alt={copy === 0 ? name : ""} width="150" height="80" />)}
            </div>)}
          </div>
        </div>
      </section>
      <section className={styles.intro}>
        <div><p className={styles.eyebrow}>01 / WHO WE ARE</p><h2>Engineering excellence.<br /><span>Complete solutions.</span></h2></div>
        <div><p>Complete MEP and HVAC solutions that bring design, fabrication, installation, and maintenance together. We focus on efficient systems, reliable performance, and long-term support.</p><Link className={styles.textLink} href="/about-us">Get to know Eram Asacon <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section id="expertise" className={styles.services} aria-labelledby="services-title">
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>02 / OUR EXPERTISE</p><h2 id="services-title">One partner.<br />Every essential system.</h2></div><Link className={styles.textLink} href="/services">All services <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.serviceGrid}>{services.map(([title, slug, copy], i) => <Link className={styles.serviceCard} key={slug} href={`/${slug}`}><div className={styles.cardTop}><span>{String(i + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div><h3>{title}</h3><p>{copy}</p></Link>)}</div>
      </section>
      <section className={styles.project}>
        <div className={styles.projectImage}><img src="/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp" alt="Eram Asacon engineering project" loading="lazy" width="1024" height="676" /></div>
        <div className={styles.projectCopy}><p className={styles.eyebrow}>03 / OUR WORK</p><h2>Expertise put<br />into practice.</h2><p>Explore our projects and the engineering services behind them, from construction and fabrication to complete building systems.</p><Link className={styles.primary} href="/portfolio-2">Explore our projects <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className={styles.quote} aria-label="Client testimonial"><p className={styles.eyebrow}>IN OUR CLIENTS’ WORDS</p><blockquote>“From design to installation, Eram Asacon delivered top-tier MEP services. Their proactive support and industry compliance made our project hassle-free.”</blockquote><p><strong>Subin</strong><span>Client</span></p></section>
      <section className={styles.cta}><div><p className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT</p><h2>Your project.<br />Our expertise.</h2></div><div><p>Tell us what you’re planning.<br />Our team is ready to help.</p><Link className={styles.whiteButton} href="/contact-us">Talk to our team <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
