import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Github } from 'lucide-react';

type SubmitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submitUrl: string;
};

export function SubmitDialog({ open, onOpenChange, submitUrl }: SubmitDialogProps) {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Submit to Marketplace</DialogTitle>
          <DialogDescription>
            Follow these steps to submit your addon to the Mue Marketplace:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Steps:</h4>
            <div className="space-y-2">
              {[
                { step: 1, text: 'Click the button below to open GitHub' },
                { step: 2, text: "Sign in to GitHub if you haven't already" },
                { step: 3, text: 'GitHub will fork the marketplace repository for you' },
                { step: 4, text: 'Review your addon JSON in the editor' },
                { step: 5, text: 'Scroll down and create a pull request' },
                { step: 6, text: 'Wait for the Mue team to review your submission' },
              ].map(({ step, text }) => (
                <button
                  key={step}
                  onClick={() => setSelectedStep(step)}
                  className={cn(
                    'w-full rounded-lg border p-3 text-left text-sm transition-colors',
                    selectedStep === step
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted',
                  )}
                >
                  <span className="font-medium">Step {step}:</span> {text}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="aspect-video w-full rounded-lg border bg-muted flex items-center justify-center text-sm text-muted-foreground">
              Step {selectedStep} Preview
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              window.open(submitUrl, '_blank');
              onOpenChange(false);
            }}
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            Open GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ErrorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
};

export function ErrorDialog({ open, onOpenChange, message }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
