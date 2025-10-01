import Link from 'next/link';
import { IconType } from 'react-icons';

type BrowserBadgeProps = {
  name: string;
  icon: IconType;
  url: string;
};

export function BrowserBadge({ name, icon: Icon, url }: BrowserBadgeProps) {
  return (
    <Link href={url} target="_blank" rel="noreferrer" className="group">
      <div className="flex flex-1 flex-row items-center text-left">
        <span className="bg-background px-4 py-2 rounded-full text-sm font-semibold text-foreground transition-all duration-300 hover:text-[#FF5C25] hover:shadow-lg hover:scale-105 sm:text-base flex items-center gap-2">
          <Icon className="h-4 w-4 flex-shrink-0" />
          {name}
        </span>
      </div>
    </Link>
  );
}
