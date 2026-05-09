import type { IconType } from 'react-icons';

type BrowserBadgeProps = {
  name: string;
  icon: IconType;
  url: string;
};

export function BrowserBadge({ name, icon: Icon, url }: BrowserBadgeProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {name}
    </a>
  );
}
