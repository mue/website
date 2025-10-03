import Link from 'next/link';
import { LucideIcon, PackageOpen, Library, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
};

export function MarketplaceEmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center backdrop-blur-sm lg:p-16">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50">
        <Icon className="h-8 w-8 text-muted-foreground/70" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">{description}</p>

      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          )}
          {secondaryAction && (
            <Button asChild variant="outline">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Preset empty states for common scenarios
export function NoItemsEmptyState() {
  return (
    <MarketplaceEmptyState
      icon={PackageOpen}
      title="No items found"
      description="We couldn't find any items matching your criteria. Try adjusting your filters or search terms."
      action={{
        label: 'Browse All Items',
        href: '/marketplace',
      }}
      secondaryAction={{
        label: 'View Collections',
        href: '/marketplace#collections',
      }}
    />
  );
}

export function NoCollectionItemsEmptyState() {
  return (
    <MarketplaceEmptyState
      icon={Library}
      title="No items in this collection yet"
      description="This collection doesn't currently have any downloadable items. Check back later or explore other collections."
      action={{
        label: 'Browse Collections',
        href: '/marketplace#collections',
      }}
      secondaryAction={{
        label: 'View All Items',
        href: '/marketplace',
      }}
    />
  );
}

export function NoSearchResultsEmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <MarketplaceEmptyState
      icon={Search}
      title="No results found"
      description={
        searchTerm
          ? `No items match "${searchTerm}". Try different keywords or browse our collections.`
          : 'No items match your search. Try different keywords or browse our collections.'
      }
      action={{
        label: 'Clear Search',
        href: '/marketplace',
      }}
      secondaryAction={{
        label: 'View Collections',
        href: '/marketplace#collections',
      }}
    />
  );
}

export function NoContentEmptyState() {
  return (
    <MarketplaceEmptyState
      icon={Sparkles}
      title="No content available yet"
      description="This item doesn't have any content to display at the moment. Check back later for updates."
    />
  );
}
