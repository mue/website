import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

import type { AddonType, Photo, Quote } from './types';

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
}

interface ContentValidatorProps {
  addonType: AddonType;
  photos?: Photo[];
  quotes?: Quote[];
  settingsJson?: string;
}

export function ContentValidator({
  addonType,
  photos,
  quotes,
  settingsJson,
}: ContentValidatorProps) {
  const issues: ValidationIssue[] = [];

  // validate photos
  if (addonType === 'photos' && photos) {
    // check for duplicates
    const photoUrls = photos.map((p) => p.url.default).filter(Boolean);
    const duplicates = photoUrls.filter((url, index) => photoUrls.indexOf(url) !== index);

    if (duplicates.length > 0) {
      issues.push({
        type: 'warning',
        message: `Found ${duplicates.length} duplicate photo URL${duplicates.length > 1 ? 's' : ''}`,
        field: 'photos',
      });
    }

    // check for invalid URLs
    const invalidUrls = photos.filter((photo) => {
      const url = photo.url.default;
      if (!url) return false;

      try {
        new URL(url);
        return !url.match(/\.(jpg|jpeg|png|webp|gif)$/i);
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      issues.push({
        type: 'error',
        message: `Found ${invalidUrls.length} invalid or non-image URL${invalidUrls.length > 1 ? 's' : ''}`,
        field: 'photos',
      });
    }

    // check for missing metadata
    const missingMetadata = photos.filter((photo) => !photo.photographer || !photo.location);
    if (missingMetadata.length > 0 && photos.some((p) => p.url.default)) {
      issues.push({
        type: 'warning',
        message: `${missingMetadata.length} photo${missingMetadata.length > 1 ? 's are' : ' is'} missing photographer or location`,
        field: 'photos',
      });
    }

    // photo count
    const validPhotos = photos.filter((p) => p.url.default).length;
    if (validPhotos > 0) {
      issues.push({
        type: 'info',
        message: `${validPhotos} photo${validPhotos > 1 ? 's' : ''} ready to include`,
        field: 'photos',
      });
    }
  }

  // validate quotes
  if (addonType === 'quotes' && quotes) {
    // check for duplicates
    const quoteTexts = quotes.map((q) => q.quote?.trim().toLowerCase()).filter(Boolean);
    const duplicates = quoteTexts.filter((text, index) => quoteTexts.indexOf(text) !== index);
    if (duplicates.length > 0) {
      issues.push({
        type: 'warning',
        message: `Found ${duplicates.length} duplicate quote${duplicates.length > 1 ? 's' : ''}`,
        field: 'quotes',
      });
    }

    // check quote length
    const tooShort = quotes.filter((q) => q.quote && q.quote.trim().length < 10);
    if (tooShort.length > 0) {
      issues.push({
        type: 'warning',
        message: `${tooShort.length} quote${tooShort.length > 1 ? 's are' : ' is'} very short (< 10 characters)`,
        field: 'quotes',
      });
    }

    const tooLong = quotes.filter((q) => q.quote && q.quote.length > 500);
    if (tooLong.length > 0) {
      issues.push({
        type: 'warning',
        message: `${tooLong.length} quote${tooLong.length > 1 ? 's are' : ' is'} very long (> 500 characters)`,
        field: 'quotes',
      });
    }

    // check for missing authors
    const missingAuthors = quotes.filter((q) => q.quote && q.quote.trim() && !q.author?.trim());
    if (missingAuthors.length > 0) {
      issues.push({
        type: 'warning',
        message: `${missingAuthors.length} quote${missingAuthors.length > 1 ? 's are' : ' is'} missing an author`,
        field: 'quotes',
      });
    }

    // quote count
    const validQuotes = quotes.filter((q) => q.quote && q.quote.trim()).length;
    if (validQuotes > 0) {
      issues.push({
        type: 'info',
        message: `${validQuotes} quote${validQuotes > 1 ? 's' : ''} ready to include`,
        field: 'quotes',
      });
    }
  }

  // validate settings JSON
  if (addonType === 'settings' && settingsJson) {
    try {
      const parsed = JSON.parse(settingsJson);
      const keys = Object.keys(parsed);

      if (keys.length === 0) {
        issues.push({
          type: 'error',
          message: 'Settings JSON is empty',
          field: 'settings',
        });
      } else {
        issues.push({
          type: 'info',
          message: `Settings JSON contains ${keys.length} setting${keys.length > 1 ? 's' : ''}`,
          field: 'settings',
        });
      }

      // check for common required settings
      const recommendedKeys = ['backgroundType', 'language', 'timezone'];
      const missingRecommended = recommendedKeys.filter((key) => !keys.includes(key));
      if (missingRecommended.length > 0 && keys.length > 0) {
        issues.push({
          type: 'info',
          message: `Optional: Consider including ${missingRecommended.join(', ')}`,
          field: 'settings',
        });
      }
    } catch {
      issues.push({
        type: 'error',
        message: 'Invalid JSON syntax',
        field: 'settings',
      });
    }
  }

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');

  const iconFor = (type: ValidationIssue['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const rowStyles: Record<ValidationIssue['type'], string> = {
    error: 'border-destructive/30 bg-destructive/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    info: 'border-border bg-muted/30',
  };

  if (issues.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <p className="text-sm text-foreground/80">
          No validation issues found. Your content looks great!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold">Content Validation</h4>
        {errors.length > 0 && (
          <Badge variant="destructive">
            {errors.length} Error{errors.length > 1 ? 's' : ''}
          </Badge>
        )}

        {warnings.length > 0 && (
          <Badge variant="outline" className="border-yellow-500/60 text-yellow-500">
            {warnings.length} Warning{warnings.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3 rounded-xl border px-4 py-3',
              rowStyles[issue.type],
            )}
          >
            <div className="mt-0.5 shrink-0">{iconFor(issue.type)}</div>
            <p className="text-sm text-foreground/80">{issue.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
