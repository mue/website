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
      // Send breadcrumbs with clickable flag and full paths
      const enhancedBreadcrumbs = breadcrumbs.map((b) => ({
        ...b,
        clickable: !!b.href,
      }));

      sendMessage('marketplace:breadcrumbs', {
        breadcrumbs: enhancedBreadcrumbs,
      });
    }
  }, [isEmbed, sendMessage, breadcrumbs]);

  return null;
}
