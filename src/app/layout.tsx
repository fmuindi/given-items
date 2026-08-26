import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://givenitems.org"),
  title: {
    default: "GivenItems.org — Verified free items, given freely",
    template: "%s | GivenItems.org",
  },
  description:
    "GivenItems.org is a non-profit connecting verified donors with people who need them. Every item is $0 — staff verify condition and ownership before anything is listed.",
  openGraph: {
    title: "GivenItems.org — Verified free items, given freely",
    description:
      "A non-profit connecting verified donors with people who need them. Every item is $0.",
    siteName: "GivenItems.org",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14283D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-page text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
