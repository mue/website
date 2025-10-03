import { AddonMetadata } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ImageUrlInput } from '@/components/ui/image-url-input';

interface StepMetadataProps {
  metadata: AddonMetadata;
  onChange: (field: keyof AddonMetadata, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepMetadata({ metadata, onChange, onNext, onBack }: StepMetadataProps) {
  const canContinue =
    metadata.name.trim() &&
    metadata.description.trim() &&
    metadata.version.trim() &&
    metadata.author.trim() &&
    metadata.icon_url.trim();

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Addon Information</h2>
        <p className="text-muted-foreground">
          Provide details about your addon that will be displayed in the marketplace
        </p>
      </div>

      <Card className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={metadata.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="My Awesome Addon"
          />
          <p className="text-xs text-muted-foreground">A descriptive name for your addon</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            value={metadata.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="A brief description of what your addon provides..."
            rows={4}
          />
          <p className="text-xs text-muted-foreground">Explain what makes your addon special</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="version">
              Version <span className="text-destructive">*</span>
            </Label>
            <Input
              id="version"
              value={metadata.version}
              onChange={(e) => onChange('version', e.target.value)}
              placeholder="1.0.0"
            />
            <p className="text-xs text-muted-foreground">Semantic versioning (e.g., 1.0.0)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">
              Author <span className="text-destructive">*</span>
            </Label>
            <Input
              id="author"
              value={metadata.author}
              onChange={(e) => onChange('author', e.target.value)}
              placeholder="Your name or username"
            />
            <p className="text-xs text-muted-foreground">Your name or online handle</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_url">
            Icon URL <span className="text-destructive">*</span>
          </Label>
          <ImageUrlInput
            id="icon_url"
            value={metadata.icon_url}
            onChange={(value) => onChange('icon_url', value)}
            placeholder="https://example.com/icon.png"
            showPreview={true}
          />
          <p className="text-xs text-muted-foreground">
            A square icon image (recommended: 256x256px)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="screenshot_url">Screenshot URL (Optional)</Label>
          <ImageUrlInput
            id="screenshot_url"
            value={metadata.screenshot_url}
            onChange={(value) => onChange('screenshot_url', value)}
            placeholder="https://example.com/screenshot.png"
            showPreview={true}
          />
          <p className="text-xs text-muted-foreground">
            A preview screenshot of your addon in action
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Make sure your images are hosted on a reliable service like GitHub, Imgur, or your own
            website. The URLs must be publicly accessible.
          </p>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canContinue} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
