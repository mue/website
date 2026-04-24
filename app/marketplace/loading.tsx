import { MarketplaceLoadingSkeleton } from '@/components/marketplace/marketplace-loading-skeleton';

export default function MarketplaceLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 py-12 lg:px-8">
      <MarketplaceLoadingSkeleton />
    </div>
  );
}
