import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WinnersClient from "@/components/WinnersClient";
import { getWinners } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Qalib layihələr",
  description:
    "AzTU daxili qrant müsabiqəsinin qalib layihələri — illər üzrə seçilmiş layihələr, rəhbərləri və icraçıları.",
  alternates: { canonical: "/winners" },
  openGraph: {
    title: "Qalib layihələr | AzTU E-Qrant",
    description:
      "AzTU daxili qrant müsabiqəsinin qalib layihələri illər üzrə.",
    url: `${siteConfig.url}/winners`,
  },
};

export default async function WinnersPage() {
  const winners = await getWinners();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Qalib layihələr",
    url: `${siteConfig.url}/winners`,
    inLanguage: "az",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: winners.length,
      itemListElement: winners.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.project_name,
        url: `${siteConfig.url}/projects/${p.project_code}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="AzTU Daxili Qrant Müsabiqəsi"
        title="Qalib layihələr"
        subtitle="Müsabiqə çərçivəsində seçilmiş qalib layihələr illər üzrə. Ətraflı məlumat üçün layihəni seçin."
      />
      <WinnersClient winners={winners} />
    </>
  );
}
