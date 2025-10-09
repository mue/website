import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { AddonType, Photo, Quote } from './types';

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

  // Validate photos
  if (addonType === 'photos' && photos) {
    // Check for duplicates
    const photoUrls = photos.map((p) => p.url.default).filter(Boolean);
    const duplicates = photoUrls.filter((url, index) => photoUrls.indexOf(url) !== index);
    if (duplicates.length > 0) {
      issues.push({
        type: 'warning',
        message: `Found ${duplicates.length} duplicate photo URL${duplicates.length > 1 ? 's' : ''}`,
        field: 'photos',
      });
    }

    // Check for invalid URLs
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

    // Check for missing metadata
    const missingMetadata = photos.filter((photo) => !photo.photographer || !photo.location);
    if (missingMetadata.length > 0 && photos.some((p) => p.url.default)) {
      issues.push({
        type: 'warning',
        message: `${missingMetadata.length} photo${missingMetadata.length > 1 ? 's are' : ' is'} missing photographer or location`,
        field: 'photos',
      });
    }

    // Info about photo count
    const validPhotos = photos.filter((p) => p.url.default).length;
    if (validPhotos > 0) {
      issues.push({
        type: 'info',
        message: `${validPhotos} photo${validPhotos > 1 ? 's' : ''} ready to include`,
        field: 'photos',
      });
    }
  }

  // Validate quotes
  if (addonType === 'quotes' && quotes) {
    // Check for duplicates
    const quoteTexts = quotes.map((q) => q.quote?.trim().toLowerCase()).filter(Boolean);
    const duplicates = quoteTexts.filter((text, index) => quoteTexts.indexOf(text) !== index);
    if (duplicates.length > 0) {
      issues.push({
        type: 'warning',
        message: `Found ${duplicates.length} duplicate quote${duplicates.length > 1 ? 's' : ''}`,
        field: 'quotes',
      });
    }

    // Check quote length
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

    // Check for missing authors
    const missingAuthors = quotes.filter((q) => q.quote && q.quote.trim() && !q.author?.trim());
    if (missingAuthors.length > 0) {
      issues.push({
        type: 'warning',
        message: `${missingAuthors.length} quote${missingAuthors.length > 1 ? 's are' : ' is'} missing an author`,
        field: 'quotes',
      });
    }

    // Info about quote count
    const validQuotes = quotes.filter((q) => q.quote && q.quote.trim()).length;
    if (validQuotes > 0) {
      issues.push({
        type: 'info',
        message: `${validQuotes} quote${validQuotes > 1 ? 's' : ''} ready to include`,
        field: 'quotes',
      });
    }
  }

  // Validate settings JSON
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

      // Check for common required settings
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

  if (issues.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-900 dark:text-green-100">
          No validation issues found. Your content looks great!
        </AlertDescription>
      </Alert>
    );
  }

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');

  const getIcon = (type: ValidationIssue['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getBorderColor = (type: ValidationIssue['type']) => {
    switch (type) {
      case 'error':
        return 'border-destructive/50 bg-destructive/5';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950';
    }
  };

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
          <Badge variant="outline" className="border-yellow-600 text-yellow-600">
            {warnings.length} Warning{warnings.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        {issues.map((issue, index) => (
          <Alert key={index} className={getBorderColor(issue.type)}>
            {getIcon(issue.type)}
            <AlertDescription className="text-sm">{issue.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
