import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoreHydration } from "@/components/StoreHydration";
// import { NewsletterPopup } from "@/components/NewsletterPopup";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Loom & Knot — crocheted goods, made in small batches",
  description:
    "Bags, dried flowers, amigurumi and keychains, crocheted by hand in Bristol. Demo storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StoreHydration />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* <NewsletterPopup /> */}

        <Script
          id="klaviyo-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,
          }}
        />
        <Script
          src="https://static.klaviyo.com/onsite/js/UBMpFE/klaviyo.js?company_id=UBMpFE"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
