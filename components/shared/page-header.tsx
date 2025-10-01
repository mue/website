import { LucideIcon } from 'lucide-react';

type PageHeaderProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
        <Icon className="h-8 w-8 text-[#FF5C25]" />
      </div>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
