import Link from "next/link";

import type { DocTreeNode } from "@/lib/docs";
import { cn } from "@/lib/utils";

type DocsSidebarProps = {
  tree: DocTreeNode[];
  activeHref?: string;
};

export function DocsSidebar({ tree, activeHref = "/docs" }: DocsSidebarProps) {
  return (
    <nav className="space-y-4 text-sm">
      {tree.map((item) => (
        <SidebarSection
          key={item.slug.join("/")}
          node={item}
          activeHref={activeHref}
        />
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
  const normalizedActiveHref = activeHref.replace(/\/$/, "");
  const nodePath = `/docs/${node.slug.join("/")}`.replace(/\/$/, "");

  const isActive = nodePath === normalizedActiveHref;
  const isAncestor =
    isActive || normalizedActiveHref.startsWith(`${nodePath}/`);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      className={cn(
        depth > 0 && "pl-3",
        isAncestor &&
          depth > 0 &&
          "relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-primary/30"
      )}
    >
      <Link
        href={node.href}
        className={cn(
          "flex items-center justify-between rounded-md px-2 py-1.5 transition-all",
          isActive &&
            "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/40",
          !isActive && isAncestor
            ? "bg-muted/70 text-foreground"
            : "text-muted-foreground hover:text-foreground",
          node.hasPage ? "font-medium" : "font-semibold"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <span className={cn("truncate", isActive && "text-white")}>
          {node.title}
        </span>
        {hasChildren && (
          <span
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
              isAncestor
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {node.children?.length ?? 0}
          </span>
        )}
      </Link>

      {hasChildren && (
        <div
          className={cn(
            "mt-2 space-y-1 border-l pl-3",
            !isAncestor && "hidden lg:block"
          )}
        >
          {node.children!.map((child) => (
            <SidebarSection
              key={child.slug.join("/")}
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
