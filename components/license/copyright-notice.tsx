'use client';

import { CopyButton } from '@/components/ui/copy-button';

type CopyrightNoticeProps = {
  label?: string;
  year: string;
  holder: string;
};

export function CopyrightNotice({ label, year, holder }: CopyrightNoticeProps) {
  const copyrightText = `Copyright (c) ${year} ${holder}`;

  return (
    <div className="group relative rounded-lg border border-border bg-muted/30 p-4">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
          {label}
        </p>
      )}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-mono text-muted-foreground flex-1">{copyrightText}</p>
        <CopyButton
          text={copyrightText}
          size="sm"
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </div>
  );
}
