import { AddonType, Photo, Quote } from './types';
import { Button } from '@/components/ui/button';
import { PhotoPackEditor } from './photo-pack-editor';
import { QuotePackEditor } from './quote-pack-editor';
import { SettingsEditor } from './settings-editor';
import { ArrowRight, Lightbulb, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { TemplatePicker } from './template-picker';
import { ContentTemplate } from '@/lib/content-templates';
import { ValidationSummary } from './validation-summary';
import { validatePhotos, validateQuotes, validateSettings } from '@/lib/content-validator';

interface StepContentProps {
  addonType: AddonType;
  photos: Photo[];
  quotes: Quote[];
  settingsJson: string;
  onPhotosChange: (photos: Photo[]) => void;
  onQuotesChange: (quotes: Quote[]) => void;
  onSettingsChange: (settings: string) => void;
  onDeleteAllPhotos: () => void;
  onDeleteAllQuotes: () => void;
  onSettingsFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoadExample: () => void;
  onImportAddon: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepContent({
  addonType,
  photos,
  quotes,
  settingsJson,
  onPhotosChange,
  onQuotesChange,
  onSettingsChange,
  onDeleteAllPhotos,
  onDeleteAllQuotes,
  onSettingsFileUpload,
  onLoadExample,
  onImportAddon,
  onNext,
  onBack,
}: StepContentProps) {
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleTemplateSelect = (template: ContentTemplate) => {
    if (template.content.photos) {
      onPhotosChange(template.content.photos);
    }
    if (template.content.quotes) {
      onQuotesChange(template.content.quotes);
    }
    if (template.content.settingsJson) {
      onSettingsChange(template.content.settingsJson);
    }
  };

  const getValidation = () => {
    if (addonType === 'photos') {
      return validatePhotos(photos);
    }
    if (addonType === 'quotes') {
      return validateQuotes(quotes);
    }
    if (addonType === 'settings') {
      return validateSettings(settingsJson);
    }
    return { isValid: true, errors: [], warnings: [], infos: [] };
  };

  const validation = getValidation();
  const getTitle = () => {
    switch (addonType) {
      case 'photos':
        return 'Add Your Photos';
      case 'quotes':
        return 'Add Your Quotes';
      case 'settings':
        return 'Configure Your Settings';
    }
  };

  const getDescription = () => {
    switch (addonType) {
      case 'photos':
        return 'Add beautiful background images with photographer credits and locations';
      case 'quotes':
        return 'Add inspirational or interesting quotes with proper attribution';
      case 'settings':
        return 'Paste your Mue Tab settings JSON or upload from a file';
    }
  };

  const canContinue = () => {
    if (addonType === 'photos') {
      return photos.some((p) => p.photographer && p.location && p.url.default);
    }
    if (addonType === 'quotes') {
      return quotes.some((q) => q.quote && q.author);
    }
    if (addonType === 'settings') {
      try {
        if (!settingsJson.trim()) return false;
        JSON.parse(settingsJson);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-muted-foreground">{getDescription()}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => setShowTemplatePicker(true)} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Use Template
        </Button>
        <Button variant="outline" onClick={onLoadExample} className="gap-2">
          <Lightbulb className="h-4 w-4" />
          Load Example
        </Button>
        <Input
          id="addon-upload-step"
          type="file"
          accept=".json"
          onChange={onImportAddon}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('addon-upload-step')?.click()}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Import Addon
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowValidation(!showValidation)}
          className="gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          {showValidation ? 'Hide' : 'Show'} Validation
        </Button>
      </div>

      {showValidation && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-semibold">Content Validation</h3>
          <ValidationSummary validation={validation} />
        </div>
      )}

      <TemplatePicker
        addonType={addonType}
        open={showTemplatePicker}
        onOpenChange={setShowTemplatePicker}
        onSelectTemplate={handleTemplateSelect}
      />

      {addonType === 'photos' && (
        <PhotoPackEditor
          photos={photos}
          onChange={onPhotosChange}
          onDeleteAll={onDeleteAllPhotos}
        />
      )}

      {addonType === 'quotes' && (
        <QuotePackEditor
          quotes={quotes}
          onChange={onQuotesChange}
          onDeleteAll={onDeleteAllQuotes}
        />
      )}

      {addonType === 'settings' && (
        <SettingsEditor
          settingsJson={settingsJson}
          onChange={onSettingsChange}
          onFileUpload={onSettingsFileUpload}
        />
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canContinue()} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
