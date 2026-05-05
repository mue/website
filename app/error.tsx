'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/error-page';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
