type StatItemProps = {
  stat: string;
};

export function StatItem({ stat }: StatItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E]" />
      <span>{stat}</span>
    </div>
  );
}
