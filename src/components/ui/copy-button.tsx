'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  showText?: boolean;
}

export function CopyButton({
  text,
  className,
  size = 'icon',
  variant = 'ghost',
  showText = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
        <Button
          variant={variant}
          size={size}
          onClick={handleCopy}
          className={cn('transition-all', className)}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {showText && <span className="ml-2">Copied!</span>}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {showText && <span className="ml-2">Copy</span>}
            </>
          )}
        </Button>
      </Tooltip>
    </TooltipProvider>
  );
}
