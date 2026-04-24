import { type LucideIcon } from 'lucide-react';

type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export function CommunityStatCard({ label, value, description, icon: Icon }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/30 p-6 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5C25]/10">
        <Icon className="h-5 w-5 text-[#FF5C25]" />
      </div>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground/60">{description}</p>
      </div>
    </div>
  );
}
