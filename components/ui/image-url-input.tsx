import { Input } from '@/components/ui/input';
import { useImageValidation } from '@/lib/hooks/use-image-validation';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface ImageUrlInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  showPreview?: boolean;
}

export function ImageUrlInput({
  value,
  onChange,
  placeholder,
  id,
  showPreview = true,
}: ImageUrlInputProps) {
  const { status, error } = useImageValidation(value);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'validating':
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
      case 'valid':
        return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'invalid':
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getInputClassName = () => {
    if (!value) return '';
    switch (status) {
      case 'valid':
        return 'border-green-600 dark:border-green-400 focus-visible:ring-green-600';
      case 'invalid':
      case 'error':
        return 'border-destructive focus-visible:ring-destructive';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id={id}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn('pr-10', getInputClassName())}
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{getStatusIcon()}</div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-2 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {showPreview && status === 'valid' && value && (
        <div className="space-y-2">
          <div
            className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border"
            onClick={() => setShowFullPreview(!showFullPreview)}
          >
            <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          </div>
          {showFullPreview && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={() => setShowFullPreview(false)}
            >
              <div className="relative max-h-[90vh] max-w-[90vw]">
                <Image
                  src={value}
                  alt="Full preview"
                  width={800}
                  height={600}
                  className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
