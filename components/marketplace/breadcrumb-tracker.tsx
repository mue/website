'use client';

import { useEffect } from 'react';
import { useEmbed } from '@/lib/embed-context';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbTrackerProps {
  breadcrumbs: BreadcrumbItem[];
}

export function BreadcrumbTracker({ breadcrumbs }: BreadcrumbTrackerProps) {
  const { isEmbed, sendMessage } = useEmbed();

  useEffect(() => {
    if (isEmbed) {
      sendMessage('marketplace:breadcrumbs', { breadcrumbs });
    }
  }, [isEmbed, sendMessage, breadcrumbs]);

  return null;
}
