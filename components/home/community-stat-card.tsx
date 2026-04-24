type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function CommunityStatCard({ label, value, description }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground/70">{description}</p>
    </div>
  );
}
