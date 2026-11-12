import { DM_Sans, Open_Sans, Poppins, Questrial, Roboto, Roboto_Slab, Space_Grotesk } from "next/font/google";

// The Google font families the WordPress page loaded through Elementor. The
// ported stylesheets reference them as var(--font-*) (see scripts/wp-port).
const dmSans = DM_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-dm-sans" });
// Body font set by the home page's sticky-button template (Open Sans 400, 400i, 700).
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  preload: false,
});
const questrial = Questrial({ subsets: ["latin"], weight: "400", variable: "--font-questrial", preload: false });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", preload: false });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto-slab", preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", preload: false });

export const fontVariables = [dmSans, openSans, poppins, questrial, roboto, robotoSlab, spaceGrotesk]
  .map((font) => font.variable)
  .join(" ");
