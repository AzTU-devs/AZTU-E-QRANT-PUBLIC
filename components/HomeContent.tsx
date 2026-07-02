import Link from "next/link";
import { ArrowRight, Mail, Phone, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";

const priorities = [
  "Rəqəmsal texnologiyalar",
  "Müdafiə sənayesi işləmələri",
  "Yeni materiallar",
  "Yaşıl enerji və ətraf mühit",
  "Yeni qurğu və cihaz layihələndirmələri",
];

const principles = [
  "Kiçik yaradıcı kollektivlər (maksimum 7 nəfər)",
  "Təcrübəli və beynəlxalq nüfuzlu rəhbərlər",
  "Digər fondlar tərəfindən maliyyələşməyən mövzular",
  "Texniki və elmi ekspertiza mərhələləri",
  "Hər şəxs üçün yalnız bir layihə",
  "Şəffaf və çarpaz elmi qiymətləndirmə",
];

const stats = [
  { value: "30 000", unit: "AZN", label: "Maksimal büdcə" },
  { value: "6–12", unit: "ay", label: "Layihə müddəti" },
  { value: "7", unit: "nəfər", label: "Maksimal komanda" },
  { value: "300 000", unit: "AZN", label: "Ümumi fond" },
];

export default function HomeContent() {
  return (
    <div className="bg-[color:var(--background)]">
      {/* ---------------- Hero ---------------- */}
      <section className="relative bg-brand text-white">
        <div className="h-1 w-full bg-accent" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="eyebrow !text-accent">Azərbaycan Texniki Universiteti</p>
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Daxili Qrant
                <br />
                Müsabiqəsi
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100/80">
                Elmi-tədqiqat işlərinin və innovasiyaların şəffaflıq, rəqabət və elmi keyfiyyət
                prinsipləri əsasında maliyyələşdirilməsi və dəstəklənməsi.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={siteConfig.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#b84e30]"
                >
                  Müraciət et <ArrowRight size={17} />
                </a>
                <Link
                  href="/winners"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-8 hover:underline"
                >
                  Qalib layihələr
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8">
              <p className="text-sm leading-relaxed text-blue-100/70">
                Müsabiqə AzTU-nun professor-müəllim heyəti, doktorantları, magistrləri və tərəfdaş
                institutların əməkdaşları üçün açıqdır.
              </p>
              <dl className="mt-8 space-y-5">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <dt className="text-sm text-blue-100/60">Son müraciət</dt>
                  <dd className="font-serif text-lg text-white">30 oktyabr</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <dt className="text-sm text-blue-100/60">Qiymətləndirmə</dt>
                  <dd className="font-serif text-lg text-white">Çarpaz ekspertiza</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats strip ---------------- */}
      <section className="border-b border-brand/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-brand/10 border-x border-brand/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8">
              <p className="font-serif text-3xl font-semibold text-brand md:text-4xl">
                {s.value} <span className="text-lg font-normal text-brand/50">{s.unit}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Purpose ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Məqsəd</p>
            <div className="rule-accent mt-3" />
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-brand md:text-4xl">
              Nə üçün bu müsabiqə?
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-ink/80">
              Müsabiqənin məqsədi — AzTU və tərəfdaş institutların sənaye və praktik əhəmiyyətli
              elmi işlərinə dəstək vermək, elmi-tədqiqat ekosistemini gücləndirmək və tədqiqatçıların
              elmi potensialını yüksəltməkdir.
            </p>
            <ul className="mt-10 divide-y divide-brand/10 border-t border-brand/10">
              {[
                "Sənaye və praktik əhəmiyyətli elmi işlərə maliyyə dəstəyi",
                "İnnovativ ideyaların reallaşdırılması və kommersiyalaşdırılması",
                "Gənc tədqiqatçıların motivasiyası və elmi inkişafı",
              ].map((item, i) => (
                <li key={i} className="flex gap-5 py-5">
                  <span className="font-serif text-lg text-accent">0{i + 1}</span>
                  <span className="text-base text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Priorities ---------------- */}
      <section className="border-y border-brand/10 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="max-w-xl">
            <p className="eyebrow">İstiqamətlər</p>
            <div className="rule-accent mt-3" />
            <h2 className="mt-5 font-serif text-3xl font-semibold text-brand md:text-4xl">
              Prioritet sahələr
            </h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-brand/10 bg-brand/10 sm:grid-cols-2 lg:grid-cols-3">
            {priorities.map((p, i) => (
              <li key={p} className="flex items-start gap-4 bg-[color:var(--background)] p-6">
                <span className="font-serif text-2xl font-semibold text-brand/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="pt-1 text-base font-medium text-ink">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Eligibility + Principles ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">İştirakçılar</p>
            <div className="rule-accent mt-3" />
            <h2 className="mt-5 font-serif text-2xl font-semibold text-brand md:text-3xl">Kimlər müraciət edə bilər?</h2>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-accent pl-5">
                <p className="text-base text-ink/80">AzTU-nun professor-müəllim heyəti, doktorantları və magistrləri</p>
              </div>
              <div className="border-l-2 border-brand/15 pl-5">
                <p className="text-base text-ink/80">İnformasiya Texnologiyaları və İdarəetmə Sistemləri İnstitutunun əməkdaşları</p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Prinsiplər</p>
            <div className="rule-accent mt-3" />
            <h2 className="mt-5 font-serif text-2xl font-semibold text-brand md:text-3xl">Əsas prinsiplər</h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {principles.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-ink/75">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Apply callout ---------------- */}
      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
          <div>
            <p className="eyebrow !text-accent">Müraciət</p>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight md:text-4xl">
              Layihə təklifləri qrant portalı vasitəsilə qəbul edilir.
            </h2>
            <p className="mt-4 text-blue-100/70">
              Son müraciət tarixi: <span className="font-semibold text-white">30 oktyabr 2025-ci il</span>
            </p>
          </div>
          <a
            href={siteConfig.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#b84e30]"
          >
            Portala keç <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Əlaqə</p>
            <div className="rule-accent mt-3" />
            <h2 className="mt-5 font-serif text-3xl font-semibold text-brand">Suallarınız var?</h2>
            <p className="mt-4 text-ink/70">
              AzTU Tədqiqat və İnkişaf Departamenti ilə əlaqə saxlaya bilərsiniz.
            </p>
          </div>
          <div className="lg:col-span-8">
            <dl className="grid grid-cols-1 divide-y divide-brand/10 border-y border-brand/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              <div className="flex items-start gap-4 py-6 sm:pr-8">
                <Clock className="mt-0.5 text-accent" size={20} />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ink/45">İş vaxtı</dt>
                  <dd className="mt-1 text-ink">{siteConfig.contacts.workingHours}</dd>
                </div>
              </div>
              <a href={`tel:${siteConfig.contacts.grantPhoneHref}`} className="group flex items-start gap-4 py-6 sm:pl-8">
                <Phone className="mt-0.5 text-accent" size={20} />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ink/45">Telefon</dt>
                  <dd className="mt-1 text-ink group-hover:text-brand">{siteConfig.contacts.grantPhone}</dd>
                </div>
              </a>
              <a href={`mailto:${siteConfig.contacts.email}`} className="group flex items-start gap-4 py-6 sm:pr-8">
                <Mail className="mt-0.5 text-accent" size={20} />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ink/45">E-poçt</dt>
                  <dd className="mt-1 text-ink group-hover:text-brand">{siteConfig.contacts.email}</dd>
                </div>
              </a>
              <a href={siteConfig.contacts.addressMap} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 py-6 sm:pl-8">
                <MapPin className="mt-0.5 text-accent" size={20} />
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ink/45">Ünvan</dt>
                  <dd className="mt-1 text-ink group-hover:text-brand">{siteConfig.contacts.address}</dd>
                </div>
              </a>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
