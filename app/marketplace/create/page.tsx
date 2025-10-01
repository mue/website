'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, Github, Lightbulb, Upload } from 'lucide-react';
import {
  AddonMetadata,
  AddonType,
  Photo,
  Quote,
} from '@/components/marketplace/create/types';
import { AddonTypeSelector } from '@/components/marketplace/create/addon-type-selector';
import { MetadataForm } from '@/components/marketplace/create/metadata-form';
import { PhotoPackEditor } from '@/components/marketplace/create/photo-pack-editor';
import { QuotePackEditor } from '@/components/marketplace/create/quote-pack-editor';
import { SettingsEditor } from '@/components/marketplace/create/settings-editor';
import {
  DeleteConfirmDialog,
  ErrorDialog,
  SubmitDialog,
} from '@/components/marketplace/create/dialogs';

export default function CreateAddonPage() {
  const [addonType, setAddonType] = useState<AddonType>('photos');
  const [metadata, setMetadata] = useState<AddonMetadata>({
    name: '',
    description: '',
    type: 'photos',
    version: '1.0.0',
    author: '',
    icon_url: '',
    screenshot_url: '',
  });

  const [photos, setPhotos] = useState<Photo[]>([
    { photographer: '', location: '', url: { default: '' } },
  ]);
  const [quotes, setQuotes] = useState<Quote[]>([{ quote: '', author: '' }]);
  const [settingsJson, setSettingsJson] = useState('');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeletePhotosDialog, setShowDeletePhotosDialog] = useState(false);
  const [showDeleteQuotesDialog, setShowDeleteQuotesDialog] = useState(false);
  const [submitUrl, setSubmitUrl] = useState('');

  const handleMetadataChange = (field: keyof AddonMetadata, value: string) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
      type: addonType,
    }));
  };

  const handleTypeChange = (type: AddonType) => {
    setAddonType(type);
    setMetadata((prev) => ({ ...prev, type }));
  };

  const resetMetadata = () => {
    setMetadata({
      name: '',
      description: '',
      type: addonType,
      version: '1.0.0',
      author: '',
      icon_url: '',
      screenshot_url: '',
    });
  };

  const confirmDeletePhotos = () => {
    setPhotos([{ photographer: '', location: '', url: { default: '' } }]);
    setShowDeletePhotosDialog(false);
  };

  const confirmDeleteQuotes = () => {
    setQuotes([{ quote: '', author: '' }]);
    setShowDeleteQuotesDialog(false);
  };

  const loadExample = async () => {
    const exampleUrls = {
      photos: 'https://raw.githubusercontent.com/mue/marketplace/main/examples/photo_pack.json',
      quotes: 'https://raw.githubusercontent.com/mue/marketplace/main/examples/quote_pack.json',
      settings:
        'https://raw.githubusercontent.com/mue/marketplace/main/examples/preset_settings.json',
    };

    try {
      const response = await fetch(exampleUrls[addonType]);
      if (!response.ok) throw new Error('Failed to load example');

      const json = await response.json();

      // Load metadata
      if (json.name) setMetadata((prev) => ({ ...prev, name: json.name }));
      if (json.description) setMetadata((prev) => ({ ...prev, description: json.description }));
      if (json.type) {
        setAddonType(json.type);
        setMetadata((prev) => ({ ...prev, type: json.type }));
      }
      if (json.version) setMetadata((prev) => ({ ...prev, version: json.version }));
      if (json.author) setMetadata((prev) => ({ ...prev, author: json.author }));
      if (json.icon_url) setMetadata((prev) => ({ ...prev, icon_url: json.icon_url }));
      if (json.screenshot_url)
        setMetadata((prev) => ({ ...prev, screenshot_url: json.screenshot_url }));

      // Load content
      if (json.type === 'photos' && json.photos) {
        setPhotos(json.photos);
      } else if (json.type === 'quotes' && json.quotes) {
        setQuotes(json.quotes);
      } else if (json.type === 'settings' && json.settings) {
        setSettingsJson(JSON.stringify(json.settings, null, 2));
      }
    } catch {
      setErrorMessage('Failed to load example. Please try again.');
      setShowErrorDialog(true);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isSettings = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);

        if (isSettings) {
          // For settings JSON upload, only extract the settings object
          setSettingsJson(JSON.stringify(json, null, 2));
        } else {
          // For addon JSON upload, load all data
          if (json.name) setMetadata((prev) => ({ ...prev, name: json.name }));
          if (json.description)
            setMetadata((prev) => ({ ...prev, description: json.description }));
          if (json.type) {
            setAddonType(json.type);
            setMetadata((prev) => ({ ...prev, type: json.type }));
          }
          if (json.version) setMetadata((prev) => ({ ...prev, version: json.version }));
          if (json.author) setMetadata((prev) => ({ ...prev, author: json.author }));
          if (json.icon_url) setMetadata((prev) => ({ ...prev, icon_url: json.icon_url }));
          if (json.screenshot_url)
            setMetadata((prev) => ({ ...prev, screenshot_url: json.screenshot_url }));

          if (json.type === 'photos' && json.photos) {
            setPhotos(json.photos);
          } else if (json.type === 'quotes' && json.quotes) {
            setQuotes(json.quotes);
          } else if (json.type === 'settings' && json.settings) {
            setSettingsJson(JSON.stringify(json.settings, null, 2));
          }
        }
      } catch {
        setErrorMessage('Invalid JSON file. Please check your file and try again.');
        setShowErrorDialog(true);
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be uploaded again
    event.target.value = '';
  };

  const generateAddonData = () => {
    const addonData: Record<string, unknown> = { ...metadata };

    if (addonType === 'photos') {
      addonData.photos = photos.filter((p) => p.photographer && p.location && p.url.default);
    } else if (addonType === 'quotes') {
      addonData.quotes = quotes.filter((q) => q.quote && q.author);
    } else if (addonType === 'settings') {
      try {
        const parsed = JSON.parse(settingsJson);
        const ignoredKeys = ['language', 'statsdata', 'nextquote', 'installed', 'nextImage'];

        // Filter out ignored keys
        const filteredSettings = Object.fromEntries(
          Object.entries(parsed).filter(([key]) => !ignoredKeys.includes(key)),
        );

        addonData.settings = filteredSettings;
      } catch {
        setErrorMessage('Invalid JSON in settings. Please check your input.');
        setShowErrorDialog(true);
        return null;
      }
    }

    return addonData;
  };

  const validateMetadata = () => {
    if (!metadata.name.trim()) {
      setErrorMessage('Please enter a name for your addon.');
      setShowErrorDialog(true);
      return false;
    }
    if (!metadata.description.trim()) {
      setErrorMessage('Please enter a description for your addon.');
      setShowErrorDialog(true);
      return false;
    }
    if (!metadata.version.trim()) {
      setErrorMessage('Please enter a version for your addon.');
      setShowErrorDialog(true);
      return false;
    }
    if (!metadata.author.trim()) {
      setErrorMessage('Please enter an author for your addon.');
      setShowErrorDialog(true);
      return false;
    }
    if (!metadata.icon_url.trim()) {
      setErrorMessage('Please enter an icon URL for your addon.');
      setShowErrorDialog(true);
      return false;
    }
    return true;
  };

  const downloadJson = () => {
    if (!validateMetadata()) return;

    const addonData = generateAddonData();
    if (!addonData) return;

    const jsonString = JSON.stringify(addonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const fileName = metadata.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName || 'addon'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const submitToMarketplace = () => {
    if (!validateMetadata()) return;

    const addonData = generateAddonData();
    if (!addonData) return;

    const fileName = metadata.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    const folderMap = {
      photos: 'photo_packs',
      quotes: 'quote_packs',
      settings: 'preset_settings',
    };

    const folder = folderMap[addonType];
    const jsonString = JSON.stringify(addonData, null, 2);
    const encodedContent = encodeURIComponent(jsonString);
    const encodedFileName = encodeURIComponent(`${fileName}.json`);

    // GitHub URL to create a new file in a fork with PR
    const githubUrl = `https://github.com/mue/marketplace/new/main/data/${folder}?filename=${encodedFileName}&value=${encodedContent}`;

    setSubmitUrl(githubUrl);
    setShowSubmitDialog(true);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12 lg:px-8">
      <Link
        href="/marketplace"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <header className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Create Addon</h1>
            <p className="text-muted-foreground">
              Create your own photo pack, quote pack, or preset settings for the Mue Marketplace.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadExample} className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Load Example
            </Button>
            <Input
              id="addon-upload"
              type="file"
              accept=".json"
              onChange={(e) => handleFileUpload(e)}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('addon-upload')?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Import Addon
            </Button>
          </div>
        </div>
      </header>

      <AddonTypeSelector value={addonType} onChange={handleTypeChange} />

      <MetadataForm metadata={metadata} onChange={handleMetadataChange} onReset={resetMetadata} />

      {addonType === 'photos' && (
        <PhotoPackEditor
          photos={photos}
          onChange={setPhotos}
          onDeleteAll={() => setShowDeletePhotosDialog(true)}
        />
      )}

      {addonType === 'quotes' && (
        <QuotePackEditor
          quotes={quotes}
          onChange={setQuotes}
          onDeleteAll={() => setShowDeleteQuotesDialog(true)}
        />
      )}

      {addonType === 'settings' && (
        <SettingsEditor
          settingsJson={settingsJson}
          onChange={setSettingsJson}
          onFileUpload={(e) => handleFileUpload(e, true)}
        />
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={downloadJson} className="gap-2">
          <Download className="h-4 w-4" />
          Download JSON
        </Button>
        <Button onClick={submitToMarketplace} className="gap-2">
          <Github className="h-4 w-4" />
          Submit to Marketplace
        </Button>
      </div>

      <SubmitDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        submitUrl={submitUrl}
      />

      <ErrorDialog open={showErrorDialog} onOpenChange={setShowErrorDialog} message={errorMessage} />

      <DeleteConfirmDialog
        open={showDeletePhotosDialog}
        onOpenChange={setShowDeletePhotosDialog}
        onConfirm={confirmDeletePhotos}
        title="Delete All Photos"
        description="Are you sure you want to delete all photos? This action cannot be undone."
      />

      <DeleteConfirmDialog
        open={showDeleteQuotesDialog}
        onOpenChange={setShowDeleteQuotesDialog}
        onConfirm={confirmDeleteQuotes}
        title="Delete All Quotes"
        description="Are you sure you want to delete all quotes? This action cannot be undone."
      />
    </div>
  );
}
