import { ReactNode } from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

type ContactCardProps = {
  href: string;
  icon: LucideIcon | ((props: { className?: string }) => ReactNode);
  title: string;
  description: string;
  handle?: string;
  badge?: string;
  external?: boolean;
};

export function ContactCard({
  href,
  icon: Icon,
  title,
  description,
  handle,
  badge,
  external = false,
}: ContactCardProps) {
  const content = (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/10 to-[#FF456E]/10 transition group-hover:border-[#FF5C25]/40 group-hover:from-[#FF5C25]/20 group-hover:to-[#FF456E]/20">
        <Icon className="h-5 w-5 text-[#FF5C25]" />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        {handle && (
          <p className="mt-3 font-mono text-sm text-foreground/70">{handle}</p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">
        {badge && (
          <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
            {badge}
          </span>
        )}
        <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF5C25]" />
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}
