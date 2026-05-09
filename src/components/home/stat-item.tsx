type StatItemProps = {
  stat: string;
};

export function StatItem({ stat }: StatItemProps) {
  return <span>{stat}</span>;
}
