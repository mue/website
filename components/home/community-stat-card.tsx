type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function CommunityStatCard({ label, value, description }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 border-t border-border pt-6">
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground/60">{description}</p>
    </div>
  );
}
