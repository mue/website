import { ReactNode } from 'react';

type ContentSectionProps = {
  title: string;
  titleSize?: 'sm' | 'md' | 'lg';
  children: ReactNode;
};

export function ContentSection({ title, titleSize = 'lg', children }: ContentSectionProps) {
  const titleClasses = {
    sm: 'text-lg font-semibold text-foreground',
    md: 'text-xl font-semibold text-foreground',
    lg: 'text-2xl font-semibold text-foreground',
  };

  return (
    <section>
      <h2 className={titleClasses[titleSize]}>{title}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}
