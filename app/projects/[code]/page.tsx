import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, Calendar, Tag, FileText } from "lucide-react";
import { getProject, fullName, UNKNOWN_YEAR } from "@/lib/api";
import PersonCard from "@/components/PersonCard";
import { siteConfig } from "@/lib/site";

type Params = { code: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const project = await getProject(code);

  if (!project) {
    return { title: "Layihə tapılmadı" };
  }

  const title = project.project_name || `Layihə ${project.project_code}`;
  const description =
    project.description?.slice(0, 200) ||
    "AzTU daxili qrant müsabiqəsi layihəsi.";

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.project_code}` },
    openGraph: {
      title: `${title} | AzTU E-Qrant`,
      description,
      url: `${siteConfig.url}/projects/${project.project_code}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const project = await getProject(code);

  if (!project) {
    notFound();
  }

  const yearLabel = project.year ? String(project.year) : UNKNOWN_YEAR;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: project.project_name,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.project_code}`,
    inLanguage: "az",
    funder: {
      "@type": "EducationalOrganization",
      name: siteConfig.organization,
    },
    ...(project.lead && {
      member: {
        "@type": "Person",
        name: fullName(project.lead),
      },
    }),
  };

  return (
    <article className="bg-gray-50/50 min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="bg-brand text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Bütün layihələr
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Calendar size={14} /> {yearLabel}
            </span>
            {project.priotet_name && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Tag size={14} /> {project.priotet_name}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            {project.project_name || "Adsız layihə"}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-12">
        {/* Description */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand mb-4">
            <FileText size={20} /> Layihənin təsviri
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.description || "Bu layihə üçün təsvir əlavə edilməyib."}
            </p>
          </div>
        </section>

        {/* Lead */}
        <section>
          <h2 className="text-xl font-bold text-brand mb-4">Layihə rəhbəri</h2>
          {project.lead ? (
            <PersonCard person={project.lead} isLead role="Layihə rəhbəri" />
          ) : (
            <p className="text-gray-500">Rəhbər məlumatı mövcud deyil.</p>
          )}
        </section>

        {/* Collaborators */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand mb-4">
            <Users size={20} /> İcraçılar
            <span className="text-sm font-medium text-gray-400">
              ({project.collaborators.length})
            </span>
          </h2>
          {project.collaborators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.collaborators.map((c) => (
                <PersonCard key={c.fin_kod} person={c} role="İcraçı" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Bu layihəyə təsdiqlənmiş icraçı əlavə edilməyib.</p>
          )}
        </section>
      </div>
    </article>
  );
}
