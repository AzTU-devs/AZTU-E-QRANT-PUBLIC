import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  // Home shares the root segment with the layout, so the title template does
  // not apply here — use an explicit, keyword-rich absolute title.
  title: {
    absolute: `${siteConfig.name} | ${siteConfig.organization}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "az",
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.organization,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
