import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/content/site";
import { seo } from "@/content/seo";
import { businessLd, JsonLd } from "@/lib/jsonld";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "600"], display: "swap", variable: "--ff-cinzel" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--ff-cormorant",
});
const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  display: "swap",
  variable: "--ff-cormorant-italic",
  preload: false,
});
// Inter is a variable font: one file covers 400/500/600, smaller than three static weights.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--ff-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.home.title,
  description: seo.home.description,
  applicationName: site.name,
  openGraph: { type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0F0F0F" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={cn(cinzel.variable, cormorant.variable, cormorantItalic.variable, inter.variable)}
    >
      <body>
        <JsonLd data={businessLd()} />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
