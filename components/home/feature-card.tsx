type FeatureCardProps = {
  index: number;
  title: string;
  description: string;
  bullets: string[];
  image?: string;
};

const visualColors = ['bg-[#FF5C25]/8', 'bg-[#FF456E]/8', 'bg-amber-500/8'];

const featureImages = [
  '/home/home-bghitdiff.webp',
  '/home/home-quote.webp',
  '/home/home-privacy.webp',
];

export function FeatureCard({ index, title, description, bullets }: FeatureCardProps) {
  const isReversed = index % 2 !== 0;
  const imageSrc = featureImages[index % featureImages.length];

  return (
    <div
      className={`grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center ${isReversed ? 'lg:[&>*:first-child]:order-last' : ''}`}
    >
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]/60" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`h-64 rounded-2xl lg:h-80 flex items-center justify-center overflow-hidden ${visualColors[index % visualColors.length]}`}>
        <img
          src={imageSrc}
          alt={title}
          className="object-contain h-full w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
