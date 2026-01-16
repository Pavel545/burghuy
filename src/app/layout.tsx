import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gilroy = localFont({
  src: [
    { path: "../../public/fonts/GilroyRegular.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/GilroyMedium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/gilroy-extrabold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

// ВАЖНО: без ./ и лучше без хвостового /
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://bughuy-prod.ru").replace(/\/+$/, "");

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
        url: "/og-image.png", // <-- обязательно от корня
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
    images: ["/og-image.png"], // <-- от корня
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },

  manifest: "/manifest.json", // <-- от корня

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
      <body className={gilroy.variable}>{children}</body>
    </html>
  );
}
