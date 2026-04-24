import { type LucideIcon } from 'lucide-react';

type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export function CommunityStatCard({ label, value, description, icon: Icon }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-muted/30 px-6 py-8 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5C25]/80">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground/60">{description}</p>
      </div>
    </div>
  );
}
