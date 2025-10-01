type CopyrightNoticeProps = {
  label?: string;
  year: string;
  holder: string;
};

export function CopyrightNotice({ label, year, holder }: CopyrightNoticeProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
          {label}
        </p>
      )}
      <p className="text-sm font-mono text-muted-foreground">
        Copyright (c) {year} {holder}
      </p>
    </div>
  );
}
