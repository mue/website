'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/components/error-page';

export default function MarketplaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Marketplace error:', error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
