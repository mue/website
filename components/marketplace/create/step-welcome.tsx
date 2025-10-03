import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import {
  Package,
  Sparkles,
  FileText,
  Image,
  MessageSquareQuote,
  Settings,
  Download,
  Upload,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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

  const features = [
    {
      icon: Package,
      title: 'Choose Your Type',
      description: 'Photo packs, quote collections, or preset settings',
    },
    {
      icon: FileText,
      title: 'Add Details',
      description: 'Name, description, author info, and visual assets',
    },
    {
      icon: Upload,
      title: 'Fill Content',
      description: 'Upload your photos, quotes, or custom settings',
    },
    {
      icon: Eye,
      title: 'Preview Live',
      description: 'See exactly how it looks in the marketplace',
    },
    {
      icon: Download,
      title: 'Share & Submit',
      description: 'Download JSON and contribute to the community',
    },
  ];

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
    <div className="relative min-h-screen overflow-hidden pb-12 pt-8">
      {/* Background gradients - inspired by home page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[50vh] bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.12)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary backdrop-blur">
            <Sparkles className="h-3 w-3" />
            <span>Create</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Share</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build Your Marketplace Addon
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Create custom photo packs, quote collections, or preset settings for the Mue community.
            Our step-by-step creator makes it easy to share your creativity with thousands of users.
          </p>

          {hasDraft && (
            <div className="mx-auto mt-6 max-w-md rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">
                  Draft found! Continue where you left off.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Addon Types Grid */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {addonTypes.map((type) => (
            <Card
              key={type.name}
              className={`group relative overflow-hidden border ${type.borderColor} bg-gradient-to-br ${type.color} p-6 transition-all`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-background/50 backdrop-blur">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight">How It Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-border bg-card/50 p-5 backdrop-blur transition-all hover:bg-card/80 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          {hasDraft ? (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={onNext}
                className="group relative overflow-hidden bg-gradient-to-r from-[#FF5C25] to-[#FF456E] px-8 py-6 text-base font-semibold shadow-[0_20px_60px_-20px_rgba(255,92,37,0.5)] transition-all hover:scale-105 hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.6)]"
              >
                <FileText className="relative z-10 mr-2 h-5 w-5" />
                <span className="relative z-10">Continue Draft</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF456E] to-[#FF5C25] opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>

              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary/30 px-8 py-6 text-base font-semibold transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Start Fresh
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Start Fresh?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to start fresh? Your current draft will be permanently
                      deleted and cannot be recovered.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmStartFresh}>Delete Draft</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Button
              size="lg"
              onClick={onNext}
              className="group relative overflow-hidden bg-gradient-to-r from-[#FF5C25] to-[#FF456E] px-8 py-6 text-base font-semibold shadow-[0_20px_60px_-20px_rgba(255,92,37,0.5)] transition-all hover:scale-105 hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.6)]"
            >
              <Sparkles className="relative z-10 mr-2 h-5 w-5" />
              <span className="relative z-10">Start Creating</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF456E] to-[#FF5C25] opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            Free • Open Source • Community Driven
          </p>
        </div>
      </div>
    </div>
  );
}
