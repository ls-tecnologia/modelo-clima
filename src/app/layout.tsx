import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://jjsistema-de-seguranca.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "JJ Sistema de Segurança Tramandaí | CFTV, Alarmes, Cerca Elétrica e Portão Eletrônico",
  description:
    "JJ Sistema de Segurança em Tramandaí, RS: instalação e manutenção técnica de CFTV, portão eletrônico, alarme residencial e cerca elétrica para residências e comércios.",
  keywords: [
    "JJ Sistema de Segurança",
    "CFTV Tramandaí",
    "instalação de câmeras",
    "manutenção de câmeras",
    "portão eletrônico",
    "alarme residencial",
    "cerca elétrica",
    "segurança residencial",
    "segurança comercial",
    "instalação e manutenção de segurança",
    "CFTV Rio Grande do Sul",
    "segurança Tramandaí",
    "alarme Tramandaí",
    "cerca elétrica Tramandaí",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JJ Sistema de Segurança | Instalação e Manutenção Técnica",
    description:
      "Proteção residencial e comercial em Tramandaí, RS com instalação e manutenção de CFTV, portão eletrônico, alarme e cerca elétrica.",
    url: "/",
    siteName: "JJ Sistema de Segurança",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JJ Sistema de Segurança",
  image: [`${siteUrl}/og-image.png`],
  url: siteUrl,
  telephone: "+55 51 99304-3810",
  email: "jhonatangreselle09@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tramandaí",
    addressLocality: "Tramandaí",
    addressRegion: "RS",
    postalCode: "95590-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-29.9848",
    longitude: "-50.1341",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Tramandaí",
    },
    {
      "@type": "State",
      name: "Rio Grande do Sul",
    },
    {
      "@type": "Country",
      name: "Brasil",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://instagram.com/jj.instalacoes_",
    "https://instagram.com/stvseguranca",
  ],
  serviceType: [
    "Instalação de CFTV",
    "Manutenção de CFTV",
    "Instalação de Portão Eletrônico",
    "Manutenção de Portão Eletrônico",
    "Instalação de Alarme Residencial",
    "Manutenção de Alarme Residencial",
    "Instalação de Cerca Elétrica",
    "Manutenção de Cerca Elétrica",
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
