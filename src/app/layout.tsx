import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://empresa-landing.vercel.app";

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
  title: "Empresa | Ar Condicionado",
  description:
    "Empresa: instalação, assistência técnica, manutenção preventiva e corretiva, higienização, desinfecção e PMOC para ar-condicionado.",
  keywords: [
    "ar condicionado",
    "instalação de ar condicionado",
    "manutenção de ar condicionado SP",
    "assistência técnica ar condicionado",
    "higienização de ar condicionado",
    "PMOC ar condicionado",
    "Empresa climatização",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Empresa | Climatização e Ar Condicionado",
    description:
      "Atendimento ágil com nota 5.0: instalação, manutenção, higienização, desinfecção e PMOC.",
    url: "/",
    siteName: "Empresa",
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
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Empresa",
  image: [`${siteUrl}/og-image.png`],
  url: siteUrl,
  telephone: "+55 81 96000-2151",
  email: "contato@empresa.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Cruz Alta",
    addressLocality: "Barra de jangada",
    addressRegion: "PE",
    postalCode: "54470-270",
    addressCountry: "BR",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Barra de Jangada",
    },
    {
      "@type": "State",
      name: "Pernambuco",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "19:00",
    },
  ],
  sameAs: ["https://instagram.com/empresa"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "94",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
