import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Megaphone } from "lucide-react";
import { getAnnouncements, htmlExcerpt, slugify } from "@/lib/api";
import { siteConfig } from "@/lib/site";

// Always fetch fresh so newly published/edited announcements show immediately.
export const dynamic = "force-dynamic";

type Params = { slug: string };

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("az-AZ", { year: "numeric", month: "long", day: "numeric" });
}

async function findBySlug(slug: string) {
  const announcements = await getAnnouncements();
  return announcements.find((a) => slugify(a.title) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const announcement = await findBySlug(slug);
  if (!announcement) return { title: "Elan tapılmadı" };
  const description = htmlExcerpt(announcement.content, 200);
  return {
    title: announcement.title,
    description,
    alternates: { canonical: `/announcements/${slugify(announcement.title)}` },
    openGraph: {
      title: `${announcement.title} | AzTU E-Qrant`,
      description,
      url: `${siteConfig.url}/announcements/${slugify(announcement.title)}`,
      type: "article",
    },
  };
}

export default async function AnnouncementDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const announcement = await findBySlug(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="mx-auto w-[90%] lg:w-[70%] px-4 sm:px-6 py-12 md:py-16">
      <Link
        href="/announcements"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand transition-colors"
      >
        <ArrowLeft size={16} /> Bütün elanlar
      </Link>

      <article className="mt-6">
        <span className="eyebrow">Elan</span>
        <div className="rule-accent mt-3" />
        <h1 className="mt-5 font-serif text-3xl md:text-4xl font-semibold leading-tight text-brand flex items-start gap-3">
          <Megaphone className="mt-1.5 shrink-0 text-accent" size={26} />
          {announcement.title}
        </h1>
        {announcement.created_at && (
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-gray-400">
            <CalendarDays size={15} /> {formatDate(announcement.created_at)}
          </p>
        )}

        <div
          className="rich-text mt-8 text-gray-700 leading-relaxed border-t border-brand/10 pt-8"
          dangerouslySetInnerHTML={{ __html: announcement.content }}
        />
      </article>
    </div>
  );
}
