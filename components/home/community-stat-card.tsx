type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function CommunityStatCard({ label, value, description }: CommunityStatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 p-5 text-sm text-muted-foreground backdrop-blur">
      <p className="text-xs uppercase tracking-[0.36em] text-[#FF5C25]/80">{label}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
      <p className="mt-3 text-xs text-muted-foreground/80">{description}</p>
    </div>
  );
}
