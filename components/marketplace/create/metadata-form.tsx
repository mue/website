import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RotateCcw } from 'lucide-react';
import { AddonMetadata } from './types';

type MetadataFormProps = {
  metadata: AddonMetadata;
  onChange: (field: keyof AddonMetadata, value: string) => void;
  onReset: () => void;
};

export function MetadataForm({ metadata, onChange, onReset }: MetadataFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Metadata</CardTitle>
            <CardDescription>Basic information about your addon</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={metadata.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Example Photos"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            value={metadata.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="This is an example."
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">
            Version <span className="text-destructive">*</span>
          </Label>
          <Input
            id="version"
            value={metadata.version}
            onChange={(e) => onChange('version', e.target.value)}
            placeholder="1.0.0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">
            Author <span className="text-destructive">*</span>
          </Label>
          <Input
            id="author"
            value={metadata.author}
            onChange={(e) => onChange('author', e.target.value)}
            placeholder="Mue"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_url">
            Icon URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="icon_url"
            value={metadata.icon_url}
            onChange={(e) => onChange('icon_url', e.target.value)}
            placeholder="https://example.com/icon.png"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="screenshot_url">Screenshot URL</Label>
          <Input
            id="screenshot_url"
            value={metadata.screenshot_url}
            onChange={(e) => onChange('screenshot_url', e.target.value)}
            placeholder="https://example.com/screenshot.png"
          />
        </div>
      </CardContent>
    </Card>
  );
}
