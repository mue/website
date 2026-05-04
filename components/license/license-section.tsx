import { ReactNode } from 'react';

type LicenseSectionProps = {
  title: string;
  licenseName: string;
  licenseColor: string;
  description: ReactNode;
  copyrights: ReactNode;
  links: ReactNode;
  gradient?: boolean;
};

export function LicenseSection({
  title,
  licenseName,
  licenseColor,
  description,
  copyrights,
  links,
  gradient = false,
}: LicenseSectionProps) {
  return (
    <section
      className={`rounded-2xl border p-5 backdrop-blur sm:p-8 ${
        gradient ? 'border-border bg-background/60' : 'border-border bg-background/60'
      }`}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        <span
          className="rounded-md border px-2 py-0.5 font-mono text-xs shrink-0"
          style={{
            backgroundColor: `${licenseColor}12`,
            borderColor: `${licenseColor}40`,
            color: licenseColor,
          }}
        >
          {licenseName}
        </span>
      </div>

      <div className="text-sm text-muted-foreground sm:text-base">{description}</div>
      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">{copyrights}</div>
      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">{links}</div>
    </section>
  );
}
