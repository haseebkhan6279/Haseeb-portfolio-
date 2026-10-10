import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import PortfolioJsonLd from "@/components/seo/PortfolioJsonLd";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = rootMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0d0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <PortfolioJsonLd />
      </head>
      <body className="min-h-screen overflow-x-clip antialiased" suppressHydrationWarning>
        <AppProviders>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
