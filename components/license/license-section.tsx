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
      className={`rounded-2xl border p-8 backdrop-blur ${
        gradient ? 'border-border bg-background/60' : 'border-border bg-background/60'
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <span
          className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{
            borderColor: `${licenseColor}40`,
            backgroundColor: `${licenseColor}10`,
            color: licenseColor,
          }}
        >
          {licenseName}
        </span>
      </div>
      <div className="text-muted-foreground">{description}</div>
      <div className="mt-6 space-y-4">{copyrights}</div>
      <div className="mt-6 flex flex-wrap gap-3">{links}</div>
    </section>
  );
}
