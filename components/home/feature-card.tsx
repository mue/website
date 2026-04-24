type FeatureCardProps = {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  footerText: string;
};

const visualColors = [
  'bg-[#FF5C25]/8',
  'bg-[#FF456E]/8',
  'bg-amber-500/8',
];

export function FeatureCard({
  index,
  eyebrow,
  title,
  description,
  bullets,
  footerText,
}: FeatureCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center ${isReversed ? 'lg:[&>*:first-child]:order-last' : ''}`}>
      <div className="flex flex-col">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#FF5C25]">
          {eyebrow}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]/60" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-muted-foreground/40">
          {footerText}
        </p>
      </div>

      <div className={`h-64 rounded-2xl lg:h-80 ${visualColors[index % visualColors.length]}`} />
    </div>
  );
}
