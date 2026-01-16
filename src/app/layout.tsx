import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/GilroyRegular.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/GilroyMedium.ttf',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../public/fonts/gilroy-extrabold.woff2',
      weight: '600',
      style: 'bold'
    }
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

// Базовый URL вашего сайта
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bughuy-prod.ru/';

export const metadata: Metadata = {
  // Основные метаданные
  title: {
    default: "Буржуй | Искусство событий",
    template: "%s | Буржуй"
  },
  description: "БУРЖУЙ - организация уникальных событий и мероприятий. Искусство создания незабываемых моментов.",
  keywords: ["события", "мероприятия", "организация мероприятий", "ивенты", "Буржуй", "искусство событий"],
  authors: [{ name: "Буржуй" }],
  creator: "Буржуй",
  publisher: "Буржуй",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph для соцсетей
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: baseUrl,
    title: "Буржуй | Искусство событий",
    description: "БУРЖУЙ - организация уникальных событий и мероприятий. Искусство создания незабываемых моментов.",
    siteName: "Буржуй",
    images: [
      {
        url: `./og-image.png`, // Путь к изображению для соцсетей
        width: 1200,
        height: 630,
        alt: "Буржуй - Искусство событий",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Буржуй | Искусство событий",
    description: "БУРЖУЙ - организация уникальных событий и мероприятий",
    images: [`./og-image.png`],
    creator: "@буржуй",
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },

  // Другие важные метатеги
  manifest: `./manifest.json`,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  // Robots.txt и индексация
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Альтернативные языки
  alternates: {
    canonical: baseUrl,
    languages: {
      'ru-RU': baseUrl,
    },
  },

  // Категория (если есть)
  category: 'events',

  // Verification для поисковых систем (добавьте свои ключи)
  // verification: {
  //   google: 'google-site-verification-code', // Замените на свой
  //   yandex: 'yandex-verification-code', // Замените на свой
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="copyright" content="Буржуй" />
        <meta name="robots" content="all" />
      </head>
      <body className={`${gilroy.variable}`}>
        {children}
      </body>
    </html>
  );
}