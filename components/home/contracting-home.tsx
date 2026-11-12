import { homeContent as content } from "@/content/home";
import { homeMedia } from "@/content/home-media";
import { OriginalImage } from "./original-image";
import { plannedMainRoutes, plannedServices } from "@/content/routes";
import { ContentCards } from "./content-cards";
import { PlannedCta } from "./planned-cta";
import { SourceRegion } from "./source-region";
import styles from "./home.module.css";

const previewButtons = [
  { sourceId: "bae4880", serviceId: 1121 },
  { sourceId: "a572ad7", serviceId: 1211 },
  { sourceId: "1220b18", serviceId: 1216 },
  { sourceId: "bbd3430", serviceId: 1220 },
] as const;

export function ContractingHome() {
  return (
    <main id="main-content" data-source-page="45" className={styles.home}>
      {/* Original desktop hero recovered. Alternate visibility remains unverified. */}
      <SourceRegion sourceId="fc5da28" order={1} fidelity="partial" className={styles.leadingImage}>
        <OriginalImage asset={homeMedia.hero} mask={homeMedia.heroMask} sourceId="17aa5f8" alt="Industrial facility with rooftop equipment" className={styles.heroImage} eager />
      </SourceRegion>
      <SourceRegion sourceId="9d527f3" order={2} fidelity="blocked" />
      <SourceRegion sourceId="92f0964" order={3} fidelity="blocked" />
      <SourceRegion sourceId="c79b068" order={4} fidelity="blocked" />

      <SourceRegion sourceId="3344d06" order={5} fidelity="partial" labelledBy="hero-heading" className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroMessage} data-source-element="b05cf9b">
            <h1 id="hero-heading" data-source-widget="0047dc5">{content.hero.heading}</h1>
            <p data-source-widget="5643d39">{content.hero.body}</p>
            <PlannedCta sourceId="76c11a4" destination={plannedMainRoutes.about}>Learn More</PlannedCta>
          </div>
        </div>
      </SourceRegion>

      <SourceRegion sourceId="e64adbd" order={6} fidelity="partial" labelledBy="engineering-heading" className={styles.introduction}>
        <div className={`${styles.container} ${styles.introductionLayout}`}>
          <div>
            <h2 id="engineering-heading" data-source-widget="2ecf2aa">{content.introduction.heading}</h2>
            <p data-source-widget="c60a484">{content.introduction.body}</p>
            <div className={styles.actions}>
              <PlannedCta sourceId="f08958d" destination={plannedMainRoutes.about} variant="solid">More About Us</PlannedCta>
              <PlannedCta sourceId="1e20ad9" destination={plannedMainRoutes.services}>View All Services</PlannedCta>
            </div>
          </div>
          <OriginalImage asset={homeMedia.about} mask={homeMedia.aboutMask} sourceId="1e25d96" alt="Technician working on building services equipment" className={styles.aboutImage} />
        </div>
      </SourceRegion>

      <SourceRegion sourceId="7a24bee" order={7} fidelity="partial" labelledBy="services-heading" className={styles.services}>
        <div className={styles.container}>
          <h2 id="services-heading" data-source-widget="2d0f90c">{content.servicesHeading}</h2>
          <PlannedCta sourceId="ece4903" destination={plannedMainRoutes.services}>View All Services</PlannedCta>
          {/* Only source buttons survive: no fabricated addon card headings or illustrations. */}
          <div className={styles.serviceActions}>
            {previewButtons.map((button) => {
              const service = plannedServices.find((entry) => entry.sourceId === button.serviceId)!;
              return (
                <PlannedCta key={button.sourceId} sourceId={button.sourceId} destination={service.href} variant="service" label={`Know More: ${service.title}`}>
                  Know More
                </PlannedCta>
              );
            })}
          </div>
        </div>
      </SourceRegion>

      <SourceRegion sourceId="58749c8" order={8} fidelity="partial" labelledBy="clients-heading" className={styles.clients}>
        <div className={styles.container}>
          <h2 id="clients-heading" data-source-widget="d39d430">{content.clientsHeading}</h2>
        </div>
      </SourceRegion>

      <SourceRegion sourceId="b80c63d" order={9} fidelity="partial" labelledBy="values-heading" className={styles.values}>
        <div className={styles.valuesPanel} data-source-element="3007b6f">
          <div className={styles.container}>
            <h2 id="values-heading" data-source-widget="1ba98df">{content.values.heading}</h2>
            <p data-source-widget="0240245" className={styles.valuesIntro}>{content.values.body}</p>
            <ContentCards items={content.values.items} variant="values" />
          </div>
        </div>
      </SourceRegion>

      <SourceRegion sourceId="121f708" order={10} fidelity="partial" labelledBy="why-heading" className={styles.whyUs}>
        <div className={styles.whyPanel} data-source-element="186b49f">
          <div className={`${styles.container} ${styles.whyLayout}`}>
            <OriginalImage asset={homeMedia.whyUs} mask={homeMedia.whyUsMask} sourceId="833a41d" alt="Engineers reviewing plans at a construction site" className={styles.whyImage} />
            <div>
              <h2 id="why-heading" data-source-widget="77eda8c">{content.whyUs.heading}</h2>
              <ContentCards items={content.whyUs.items} variant="reasons" />
            </div>
          </div>
        </div>
      </SourceRegion>

      <SourceRegion sourceId="59490c0" order={11} fidelity="partial" labelledBy="testimonials-heading" className={styles.testimonials}>
        <div className={styles.testimonialPanel} data-source-element="df408fc">
          <div className={styles.container}>
            <h2 id="testimonials-heading" data-source-widget="c8a203e">{content.testimonialsHeading}</h2>
          </div>
        </div>
      </SourceRegion>
      <SourceRegion sourceId="1bdd178" order={12} fidelity="blocked" />
    </main>
  );
}
