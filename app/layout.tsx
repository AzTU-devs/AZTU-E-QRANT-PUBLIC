import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.organization}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.organization, url: "https://aztu.edu.az" }],
  creator: siteConfig.organization,
  publisher: siteConfig.organization,
  applicationName: siteConfig.shortName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.organization}`,
    description: siteConfig.description,
    images: [
      {
        url: "/e-grant-logo-dark.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.organization}`,
    description: siteConfig.description,
    images: ["/e-grant-logo-dark.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#141e4f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.organization,
    alternateName: "AzTU",
    url: "https://aztu.edu.az",
    logo: `${siteConfig.url}/aztu-logo-light.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "H.Cavid prospekti 25",
      addressLocality: "Bakı",
      postalCode: "AZ 1073",
      addressCountry: "AZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contacts.grantPhone,
      contactType: "Qrant müsabiqəsi",
      email: siteConfig.contacts.email,
    },
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html lang="az" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
