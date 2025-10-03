'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { DocTreeNode } from '@/lib/docs';
import { cn } from '@/lib/utils';

type DocsSidebarProps = {
  tree: DocTreeNode[];
  activeHref?: string;
};

export function DocsSidebar({ tree }: DocsSidebarProps) {
  // Always use pathname from client-side for accurate current page detection
  const pathname = usePathname();
  const currentPath = pathname;

  // Debug log the current path
  console.log('🔍 Sidebar current path:', currentPath);

  return (
    <nav className="space-y-4 text-sm">
      {tree.map((item) => (
        <SidebarSection key={item.slug.join('/')} node={item} activeHref={currentPath} />
      ))}
    </nav>
  );
}

function SidebarSection({
  node,
  activeHref,
  depth = 0,
}: {
  node: DocTreeNode;
  activeHref: string;
  depth?: number;
}) {
  const normalizedActiveHref = activeHref.replace(/\/$/, '');
  // Use the node's actual href instead of reconstructing the path
  const normalizedNodeHref = node.href.replace(/\/$/, '');

  const isActive = normalizedNodeHref === normalizedActiveHref;
  const isAncestor = isActive || normalizedActiveHref.startsWith(`${normalizedNodeHref}/`);

  // Debug log for "Creating Add-ons" specifically
  if (node.title === 'Creating Add-ons') {
    console.log('📄 Creating Add-ons:', {
      nodeHref: normalizedNodeHref,
      activeHref: normalizedActiveHref,
      isActive,
      match: normalizedNodeHref === normalizedActiveHref,
    });
  }

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      className={cn(
        depth > 0 && 'pl-3',
        isAncestor &&
          depth > 0 &&
          'relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-primary/40',
      )}
    >
      <Link
        href={node.href}
        data-active={isActive ? 'true' : 'false'}
        data-node-href={normalizedNodeHref}
        data-current-href={normalizedActiveHref}
        className={cn(
          'flex items-center justify-between rounded-md px-2 py-1.5 transition-all',
          isActive && '!text-primary font-semibold',
          !isActive && isAncestor
            ? 'bg-muted/70 text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
          !isActive && node.hasPage ? 'font-medium' : '',
          !isActive && !node.hasPage ? 'font-semibold' : '',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={cn('truncate', isActive && 'font-semibold')}>{node.title}</span>

        {hasChildren && (
          <span
            className={cn(
              'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold',
              isActive
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : isAncestor
                  ? 'bg-primary/15 text-primary font-semibold'
                  : 'bg-secondary text-secondary-foreground',
            )}
          >
            {node.children?.length ?? 0}
          </span>
        )}
      </Link>

      {hasChildren && (
        <div className={cn('mt-2 space-y-1 border-l pl-3', !isAncestor && 'hidden lg:block')}>
          {node.children!.map((child) => (
            <SidebarSection
              key={child.slug.join('/')}
              node={child}
              activeHref={activeHref}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
