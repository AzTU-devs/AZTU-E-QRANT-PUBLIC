import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadsTreeClient from "@/components/LeadsTreeClient";
import { getLeadsTree, fullName } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rəhbərlər və icraçılar",
  description:
    "AzTU daxili qrant layihələrinin rəhbərləri və onların icraçıları ağac (tree) strukturunda. Hər rəhbərin komandasını bir baxışda görün.",
  alternates: { canonical: "/leads" },
  openGraph: {
    title: "Rəhbərlər və icraçılar | AzTU E-Qrant",
    description:
      "AzTU daxili qrant layihələrinin rəhbərləri və onların icraçıları ağac strukturunda.",
    url: `${siteConfig.url}/leads`,
  },
};

export default async function LeadsPage() {
  const nodes = await getLeadsTree();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Layihə rəhbərləri və icraçıları",
    url: `${siteConfig.url}/leads`,
    inLanguage: "az",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: nodes.length,
      itemListElement: nodes.slice(0, 50).map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: fullName(n.lead),
        url: `${siteConfig.url}/projects/${n.project_code}`,
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
        eyebrow="Komanda strukturu"
        title="Rəhbərlər və icraçılar"
        subtitle="Hər layihə rəhbərini açaraq onun komandasındakı icraçıları ağac strukturunda görə bilərsiniz."
      />
      <LeadsTreeClient nodes={nodes} />
    </>
  );
}
