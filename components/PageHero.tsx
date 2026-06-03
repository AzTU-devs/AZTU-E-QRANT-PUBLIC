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
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-30%] left-[-10%] w-[40%] h-[60%] rounded-full bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-600 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20 text-center">
        {eyebrow && (
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-5 text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
