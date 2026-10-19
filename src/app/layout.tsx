import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CharlyProvider } from "@/components/Charly";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd, businessLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SPORTHESIA — Posture, mouvement et bien-être à Paris 7e",
    template: "%s · SPORTHESIA Paris 7e",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["bilan postural Paris 7e", "cours petit groupe Paris 7e", "massage bien-être Paris 7e", "cryolipolyse Paris 7e", "luminothérapie Paris", "PhysioGym", "SPORTHESIA"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: "SPORTHESIA — Votre corps, votre équilibre.",
    description: site.description,
    images: [{ url: "/images/hero.jpg", width: 2000, height: 3000, alt: "Posture d'équilibre dans un studio lumineux" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-ivoire text-nuit antialiased">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-nuit focus:px-4 focus:py-2 focus:text-ivoire">
          Aller au contenu
        </a>
        <CharlyProvider>
          <SmoothScroll />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </CharlyProvider>
        <JsonLd data={businessLd()} />
      </body>
    </html>
  );
}
