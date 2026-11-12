import Image from "next/image";

/** Exact recovered file; masks use original alpha channels, never replacement artwork. */
export function OriginalImage({ asset, mask, alt, sourceId, className, eager = false }: {
  asset: { readonly src: string; readonly width: number; readonly height: number };
  mask?: { readonly src: string };
  alt: string;
  sourceId: string;
  className?: string;
  eager?: boolean;
}) {
  const imageMask = mask ? `url("${mask.src}")` : undefined;
  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      data-source-widget={sourceId}
      className={className}
      style={mask ? {
        maskImage: imageMask, WebkitMaskImage: imageMask,
        maskSize: "contain", WebkitMaskSize: "contain",
        maskPosition: "center", WebkitMaskPosition: "center",
        maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
      } : undefined}
    />
  );
}
