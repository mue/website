type FeatureCardProps = {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  footerText: string;
};

export function FeatureCard({
  index,
  eyebrow,
  title,
  description,
  bullets,
  footerText,
}: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-[0_18px_60px_-45px_rgba(12,14,40,0.65)] backdrop-blur lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.36em] text-[#FF5C25]">
          0{index + 1}
        </span>
        <span className="text-xs uppercase tracking-[0.36em] text-muted-foreground/70">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground lg:text-[2.1rem]">
        {title}
      </h3>
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="mt-1 inline-flex h-1.5 w-4 rounded-full bg-gradient-to-r from-[#FF5C25] via-[#D21A11] to-[#FF456E]" />
            <span className="text-pretty leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF456E]/40 to-transparent" />
      <p className="mt-4 text-xs uppercase tracking-[0.36em] text-muted-foreground/70">
        {footerText}
      </p>
    </article>
  );
}
