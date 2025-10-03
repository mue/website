import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { ContentValidationResult } from '@/lib/content-validator';

interface ValidationSummaryProps {
  validation: ContentValidationResult;
  title?: string;
}

export function ValidationSummary({ validation }: ValidationSummaryProps) {
  const hasIssues = validation.errors.length > 0 || validation.warnings.length > 0;

  if (!hasIssues && validation.infos.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">All Good!</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          No validation issues found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {validation.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Errors ({validation.errors.length})</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1 text-sm">
              {validation.errors.map((error, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {validation.warnings.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-900 dark:text-amber-100">
            Warnings ({validation.warnings.length})
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <ul className="mt-2 space-y-1 text-sm">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{warning.message}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {validation.infos.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">
            Tips ({validation.infos.length})
          </AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <ul className="mt-2 space-y-1 text-sm">
              {validation.infos.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{info.message}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
