import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

/* шрифты — без изменений */
const gilroy = localFont({
  src: [
    { path: "../../public/fonts/GilroyRegular.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/GilroyMedium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/gilroy-extrabold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://bughuy-prod.acr-agency.ru").replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Буржуй | Искусство событий",
    template: "%s | Буржуй",
  },
  description:
    "БУРЖУЙ - организация уникальных событий и мероприятий. Искусство создания незабываемых моментов.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    title: "Буржуй | Искусство событий",
    description:
      "БУРЖУЙ - организация уникальных событий и мероприятий. Искусство создания незабываемых моментов.",
    siteName: "Буржуй",
    images: [
      {
        url: "/og-image__Universal_OG_1200x630__1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Буржуй - Искусство событий",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Буржуй | Искусство событий",
    description: "БУРЖУЙ - организация уникальных событий и мероприятий",
    images: ["/og-image__Twitter_X_Large_1200x675__1200x675.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Яндекс.Метрика */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
              })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(106349537, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />

        {/* noscript */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106349537"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>

      <body className={gilroy.variable}>{children}</body>
    </html>
  );
}
