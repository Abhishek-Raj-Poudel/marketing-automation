import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoreHydration } from "@/components/StoreHydration";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Loom & Knot — crocheted goods, made in small batches",
  description:
    "Bags, flowers, amigurumi and keychains, crocheted by hand. Demo storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StoreHydration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterPopup />
      </body>
    </html>
  );
}
