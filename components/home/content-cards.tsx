import { Fragment } from "react";
import { homeMedia } from "@/content/home-media";
import { OriginalImage } from "./original-image";
import styles from "./home.module.css";

type SourceItem = { readonly id: string; readonly title: string; readonly description: string };

export function ContentCards({ items, variant }: {
  items: readonly SourceItem[];
  variant: "values" | "reasons";
}) {
  return (
    <div className={variant === "values" ? styles.valueCards : styles.reasonCards}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <article data-source-widget={item.id} className={variant === "values" ? styles.valueCard : styles.reasonCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
          {variant === "reasons" && index < items.length - 1 && (
            <OriginalImage asset={homeMedia.line} sourceId={["a964fa4", "95ab819", "a3ff072"][index]} alt="" className={styles.reasonSeparator} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
