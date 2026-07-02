export default function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative bg-brand text-white">
      <div className="h-1 w-full bg-accent" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {eyebrow && <p className="eyebrow !text-accent">{eyebrow}</p>}
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100/75 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
