import { Bricolage_Grotesque, Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import PortfolioJsonLd from "@/components/seo/PortfolioJsonLd";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], axes: ["opsz", "wdth"] });
const body = Manrope({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-serif-i", subsets: ["latin"], style: ["italic"], axes: ["SOFT", "WONK", "opsz"] });

export const metadata = rootMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07060d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
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
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
