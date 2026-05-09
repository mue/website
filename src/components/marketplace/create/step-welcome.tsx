import { useEffect, useState } from 'react';

import { Sparkles, FileText, Image, MessageSquareQuote, Settings, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface StepWelcomeProps {
  onNext: () => void;
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  const [hasDraft, setHasDraft] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('mue-addon-draft');
      setHasDraft(!!savedDraft);
    } catch {
      setHasDraft(false);
    }
  }, []);

  const confirmStartFresh = () => {
    try {
      localStorage.removeItem('mue-addon-draft');
      setHasDraft(false);
      setShowDeleteDialog(false);
      onNext();
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  };

  const addonTypes = [
    {
      icon: Image,
      name: 'Photo Packs',
      description: 'Curate beautiful background collections',
      color: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      icon: MessageSquareQuote,
      name: 'Quote Packs',
      description: 'Share inspiring quotes and wisdom',
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      icon: Settings,
      name: 'Preset Settings',
      description: 'Create custom configurations',
      color: 'from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/20',
    },
  ];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 py-8">
      <div className="text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Build a Marketplace Addon
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground">
          Create photo packs, quote collections, or preset settings for the Mue community in a few
          guided steps.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {addonTypes.map((type) => (
          <div
            key={type.name}
            className={`rounded-xl border ${type.borderColor} bg-gradient-to-br ${type.color} p-5`}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-background/50">
              <type.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground">{type.name}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {hasDraft ? (
          <>
            <Button size="lg" onClick={onNext}>
              <FileText className="mr-2 h-4 w-4" />
              Continue Draft
            </Button>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Start Fresh
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start Fresh?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your current draft will be permanently deleted and cannot be recovered.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmStartFresh}>Delete Draft</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <Button size="lg" onClick={onNext}>
            <Sparkles className="mr-2 h-4 w-4" />
            Start Creating
          </Button>
        )}
      </div>
    </div>
  );
}
