import { DM_Sans } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import PortfolioJsonLd from "@/components/seo/PortfolioJsonLd";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = rootMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <PortfolioJsonLd />
      </head>
      <body className="noise-overlay min-h-screen antialiased" suppressHydrationWarning>
        <AppProviders>
          <SiteHeader />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
