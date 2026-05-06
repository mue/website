import { type LucideIcon } from 'lucide-react';

type CommunityStatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function CommunityStatCard({ label, value, icon: Icon }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted/60 px-3 py-6 text-center shadow-sm sm:gap-3 sm:px-6 sm:py-8 dark:bg-muted/30 dark:shadow-none">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5C25]/80 sm:h-11 sm:w-11">
        <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </div>
      <p className="text-xl font-semibold text-foreground sm:text-3xl">{value}</p>
      <p className="text-[10px] tracking-[0.15em] text-muted-foreground/60 sm:text-xs sm:tracking-[0.1em]">
        {label}
      </p>
    </div>
  );
}
