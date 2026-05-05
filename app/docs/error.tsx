'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/error-page';

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Docs error:', error);
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
