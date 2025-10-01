import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type ContactCardProps = {
  href: string;
  icon: LucideIcon | ((props: { className?: string }) => ReactNode);
  title: string;
  description: string;
  external?: boolean;
};

export function ContactCard({
  href,
  icon: Icon,
  title,
  description,
  external = false,
}: ContactCardProps) {
  const commonClasses =
    'group flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80';

  const content = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 transition group-hover:scale-110">
        <Icon className="h-6 w-6 text-[#FF5C25]" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={commonClasses}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={commonClasses}>
      {content}
    </a>
  );
}
