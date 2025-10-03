import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Sparkles, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StepWelcomeProps {
  onNext: () => void;
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('mue-addon-draft');
      setHasDraft(!!savedDraft);
    } catch {
      setHasDraft(false);
    }
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Package className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the Mue Tab Addon Creator</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Create custom photo packs, quote packs, or preset settings for the Mue Tab extension.
          Share your creations with the community through the Mue Marketplace.
        </p>
      </div>

      {hasDraft && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
          <div className="flex items-center gap-2 text-green-900 dark:text-green-100">
            <FileText className="h-5 w-5" />
            <p className="text-sm font-medium">
              You have a saved draft! Click &quot;Get Started&quot; to continue where you left off.
            </p>
          </div>
        </div>
      )}

      <Card className="mx-auto w-full max-w-2xl space-y-6 p-8">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              1
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Choose Your Addon Type</h3>
              <p className="text-sm text-muted-foreground">
                Select whether you want to create a photo pack, quote pack, or preset settings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              2
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Add Metadata</h3>
              <p className="text-sm text-muted-foreground">
                Provide details like name, description, author, and visual assets.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              3
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Add Content</h3>
              <p className="text-sm text-muted-foreground">
                Fill in your photos, quotes, or settings data.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              4
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Preview in Marketplace</h3>
              <p className="text-sm text-muted-foreground">
                See exactly how your addon will look in the marketplace.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              5
            </div>
            <div className="text-left">
              <h3 className="font-semibold">Download & Submit</h3>
              <p className="text-sm text-muted-foreground">
                Download your addon as JSON and optionally submit it to the marketplace.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Button size="lg" onClick={onNext} className="gap-2">
        <Sparkles className="h-4 w-4" />
        Get Started
      </Button>
    </div>
  );
}
