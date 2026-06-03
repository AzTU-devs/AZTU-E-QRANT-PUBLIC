import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsClient from "@/components/ProjectsClient";
import { getProjects } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layihələr",
  description:
    "AzTU daxili qrant müsabiqəsi çərçivəsində təsdiqlənmiş layihələrin illər üzrə siyahısı. Hər layihənin adı, qısa təsviri, rəhbəri və icraçıları.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Layihələr | AzTU E-Qrant",
    description:
      "AzTU daxili qrant müsabiqəsi çərçivəsində təsdiqlənmiş layihələrin illər üzrə siyahısı.",
    url: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Layihələr",
    url: `${siteConfig.url}/projects`,
    inLanguage: "az",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.slice(0, 50).map((p, i) => ({
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
        title="Layihələr"
        subtitle="Təsdiqlənmiş qrant layihələri illər üzrə qruplaşdırılıb. Ətraflı məlumat üçün layihəni seçin — rəhbər və icraçılar görünəcək."
      />
      <ProjectsClient projects={projects} />
    </>
  );
}
