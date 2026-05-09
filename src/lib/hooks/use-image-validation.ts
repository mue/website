import { useState, useEffect } from 'react';
import { IMAGE_EXTENSIONS } from '@/lib/content-validator';

export type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid' | 'error';

interface UseImageValidationResult {
  status: ValidationStatus;
  error?: string;
}

export function useImageValidation(url: string): UseImageValidationResult {
  const [status, setStatus] = useState<ValidationStatus>('idle');
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!url || !url.trim()) {
      setStatus('idle');
      setError(undefined);
      return;
    }

    try {
      const urlObj = new URL(url);

      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        setStatus('invalid');
        setError('URL must use http:// or https://');
        return;
      }

      const pathname = urlObj.pathname.toLowerCase();
      const hasValidExtension = IMAGE_EXTENSIONS.some((ext) => pathname.endsWith(ext));

      if (!hasValidExtension) {
        setStatus('invalid');
        setError('Image should be .jpg, .jpeg, .png, .webp, .gif, or .svg');
        return;
      }
    } catch {
      setStatus('invalid');
      setError('Invalid URL format');
      return;
    }

    // Validate the image is accessible
    setStatus('validating');
    setError(undefined);

    const img = new Image();
    const timeoutId = setTimeout(() => {
      setStatus('error');
      setError('Image took too long to load');
    }, 10000); // 10 second timeout

    img.onload = () => {
      clearTimeout(timeoutId);
      setStatus('valid');
      setError(undefined);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setStatus('error');
      setError('Image failed to load. Check the URL or CORS settings.');
    };

    img.src = url;

    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return { status, error };
}
