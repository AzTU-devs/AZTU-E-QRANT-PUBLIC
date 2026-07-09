import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, CalendarDays, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getAnnouncements, htmlExcerpt } from "@/lib/api";
import { siteConfig } from "@/lib/site";

// Render on demand so newly published announcements appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Elanlar",
  description:
    "AzTU daxili qrant müsabiqəsi ilə bağlı rəsmi elanlar, xəbərdarlıqlar və yeniliklər.",
  alternates: { canonical: "/announcements" },
  openGraph: {
    title: "Elanlar | AzTU E-Qrant",
    description:
      "AzTU daxili qrant müsabiqəsi ilə bağlı rəsmi elanlar, xəbərdarlıqlar və yeniliklər.",
    url: `${siteConfig.url}/announcements`,
  },
};

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Elanlar",
    url: `${siteConfig.url}/announcements`,
    inLanguage: "az",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: announcements.length,
      itemListElement: announcements.slice(0, 50).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
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
        title="Elanlar"
        subtitle="Daxili qrant müsabiqəsi ilə bağlı rəsmi elanlar, müddətlər və yeniliklər burada dərc olunur."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16">
        {announcements.length === 0 ? (
          <div className="py-24 text-center">
            <Megaphone className="mx-auto text-gray-300" size={56} />
            <p className="mt-4 text-lg text-gray-500">Hələ ki, elan yoxdur.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm p-6 md:p-8"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand to-indigo-500" />
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Megaphone className="text-brand flex-shrink-0" size={20} />
                    {announcement.title}
                  </h2>
                  {announcement.created_at && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 whitespace-nowrap">
                      <CalendarDays size={15} />
                      {formatDate(announcement.created_at)}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {htmlExcerpt(announcement.content, 220)}
                </p>
                <Link
                  href={`/announcements/${announcement.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all"
                >
                  Ətraflı oxu <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
