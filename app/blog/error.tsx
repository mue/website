'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/error-page';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog error:', error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
