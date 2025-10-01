'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Download, Lightbulb, Plus, RotateCcw, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type AddonType = 'photos' | 'quotes' | 'settings';

type Photo = {
  photographer: string;
  location: string;
  url: { default: string };
};

type Quote = {
  quote: string;
  author: string;
};

type AddonMetadata = {
  name: string;
  description: string;
  type: AddonType;
  version: string;
  author: string;
  icon_url: string;
  screenshot_url: string;
};

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

  const addPhoto = () => {
    setPhotos([...photos, { photographer: '', location: '', url: { default: '' } }]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const updatePhoto = (index: number, field: keyof Photo | 'url.default', value: string) => {
    const updated = [...photos];
    if (field === 'url.default') {
      updated[index].url.default = value;
    } else {
      updated[index][field as keyof Photo] = value as never;
    }
    setPhotos(updated);
  };

  const addQuote = () => {
    setQuotes([...quotes, { quote: '', author: '' }]);
  };

  const removeQuote = (index: number) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  const updateQuote = (index: number, field: keyof Quote, value: string) => {
    const updated = [...quotes];
    updated[index][field] = value;
    setQuotes(updated);
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

  const deleteAllPhotos = () => {
    if (confirm('Are you sure you want to delete all photos?')) {
      setPhotos([{ photographer: '', location: '', url: { default: '' } }]);
    }
  };

  const deleteAllQuotes = () => {
    if (confirm('Are you sure you want to delete all quotes?')) {
      setQuotes([{ quote: '', author: '' }]);
    }
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
    } catch (error) {
      alert('Failed to load example. Please try again.');
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
      } catch (error) {
        alert('Invalid JSON file. Please check your file and try again.');
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be uploaded again
    event.target.value = '';
  };

  const downloadJson = () => {
    let addonData: any = { ...metadata };

    if (addonType === 'photos') {
      addonData.photos = photos.filter(
        (p) => p.photographer && p.location && p.url.default,
      );
    } else if (addonType === 'quotes') {
      addonData.quotes = quotes.filter((q) => q.quote && q.author);
    } else if (addonType === 'settings') {
      try {
        const parsed = JSON.parse(settingsJson);
        const ignoredKeys = ['language', 'statsdata', 'nextquote', 'installed', 'nextImage'];

        // Filter out ignored keys
        const filteredSettings = Object.fromEntries(
          Object.entries(parsed).filter(([key]) => !ignoredKeys.includes(key))
        );

        addonData.settings = filteredSettings;
      } catch (error) {
        alert('Invalid JSON in settings. Please check your input.');
        return;
      }
    }

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

  const parsedSettings = useMemo(() => {
    if (!settingsJson) return [];
    try {
      const parsed = JSON.parse(settingsJson);
      const ignoredKeys = ['language', 'statsdata', 'nextquote', 'installed', 'nextImage'];
      return Object.entries(parsed).filter(([key]) => !ignoredKeys.includes(key));
    } catch {
      return [];
    }
  }, [settingsJson]);

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

      <Card>
        <CardHeader>
          <CardTitle>Addon Type</CardTitle>
          <CardDescription>Select the type of addon you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={addonType} onValueChange={(value) => handleTypeChange(value as AddonType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="photos">Photo Pack</SelectItem>
              <SelectItem value="quotes">Quote Pack</SelectItem>
              <SelectItem value="settings">Preset Settings</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Metadata</CardTitle>
              <CardDescription>Basic information about your addon</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={resetMetadata} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={metadata.name}
              onChange={(e) => handleMetadataChange('name', e.target.value)}
              placeholder="Example Photos"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={metadata.description}
              onChange={(e) => handleMetadataChange('description', e.target.value)}
              placeholder="This is an example."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={metadata.version}
              onChange={(e) => handleMetadataChange('version', e.target.value)}
              placeholder="1.0.0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={metadata.author}
              onChange={(e) => handleMetadataChange('author', e.target.value)}
              placeholder="Mue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon_url">Icon URL</Label>
            <Input
              id="icon_url"
              value={metadata.icon_url}
              onChange={(e) => handleMetadataChange('icon_url', e.target.value)}
              placeholder="https://example.com/icon.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot_url">Screenshot URL</Label>
            <Input
              id="screenshot_url"
              value={metadata.screenshot_url}
              onChange={(e) => handleMetadataChange('screenshot_url', e.target.value)}
              placeholder="https://example.com/screenshot.png"
            />
          </div>
        </CardContent>
      </Card>

      {addonType === 'photos' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Add photos to your photo pack</CardDescription>
              </div>
              {photos.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteAllPhotos}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {photos.slice(0, 3).map((photo, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Photo {index + 1}</h4>
                  {photos.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`photographer-${index}`}>Photographer</Label>
                  <Input
                    id={`photographer-${index}`}
                    value={photo.photographer}
                    onChange={(e) => updatePhoto(index, 'photographer', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={photo.location}
                    onChange={(e) => updatePhoto(index, 'location', e.target.value)}
                    placeholder="Paris, France"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>Image URL</Label>
                  <Input
                    id={`url-${index}`}
                    value={photo.url.default}
                    onChange={(e) => updatePhoto(index, 'url.default', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
            ))}

            {photos.length > 3 && (
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer text-sm font-medium">
                  View {photos.length - 3} more {photos.length - 3 === 1 ? 'photo' : 'photos'}
                </summary>
                <div className="mt-4 space-y-6">
                  {photos.slice(3).map((photo, index) => (
                    <div key={index + 3} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Photo {index + 4}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePhoto(index + 3)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`photographer-${index + 3}`}>Photographer</Label>
                        <Input
                          id={`photographer-${index + 3}`}
                          value={photo.photographer}
                          onChange={(e) => updatePhoto(index + 3, 'photographer', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${index + 3}`}>Location</Label>
                        <Input
                          id={`location-${index + 3}`}
                          value={photo.location}
                          onChange={(e) => updatePhoto(index + 3, 'location', e.target.value)}
                          placeholder="Paris, France"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`url-${index + 3}`}>Image URL</Label>
                        <Input
                          id={`url-${index + 3}`}
                          value={photo.url.default}
                          onChange={(e) => updatePhoto(index + 3, 'url.default', e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            <Button onClick={addPhoto} variant="outline" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Photo
            </Button>
          </CardContent>
        </Card>
      )}

      {addonType === 'quotes' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quotes</CardTitle>
                <CardDescription>Add quotes to your quote pack</CardDescription>
              </div>
              {quotes.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteAllQuotes}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {quotes.slice(0, 3).map((quote, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Quote {index + 1}</h4>
                  {quotes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuote(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`quote-${index}`}>Quote</Label>
                  <Textarea
                    id={`quote-${index}`}
                    value={quote.quote}
                    onChange={(e) => updateQuote(index, 'quote', e.target.value)}
                    placeholder="The only way to do great work is to love what you do."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`author-${index}`}>Author</Label>
                  <Input
                    id={`author-${index}`}
                    value={quote.author}
                    onChange={(e) => updateQuote(index, 'author', e.target.value)}
                    placeholder="Steve Jobs"
                  />
                </div>
              </div>
            ))}

            {quotes.length > 3 && (
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer text-sm font-medium">
                  View {quotes.length - 3} more {quotes.length - 3 === 1 ? 'quote' : 'quotes'}
                </summary>
                <div className="mt-4 space-y-6">
                  {quotes.slice(3).map((quote, index) => (
                    <div key={index + 3} className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Quote {index + 4}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuote(index + 3)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`quote-${index + 3}`}>Quote</Label>
                        <Textarea
                          id={`quote-${index + 3}`}
                          value={quote.quote}
                          onChange={(e) => updateQuote(index + 3, 'quote', e.target.value)}
                          placeholder="The only way to do great work is to love what you do."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`author-${index + 3}`}>Author</Label>
                        <Input
                          id={`author-${index + 3}`}
                          value={quote.author}
                          onChange={(e) => updateQuote(index + 3, 'author', e.target.value)}
                          placeholder="Steve Jobs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            <Button onClick={addQuote} variant="outline" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Quote
            </Button>
          </CardContent>
        </Card>
      )}

      {addonType === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Upload your Mue Settings JSON file exported from Mue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                id="settings-upload"
                type="file"
                accept=".json"
                onChange={(e) => handleFileUpload(e, true)}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('settings-upload')?.click()}
                className="w-full gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Settings JSON
              </Button>
            </div>

            {parsedSettings.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Settings Preview</Label>
                  <Badge variant="secondary">
                    {parsedSettings.length} {parsedSettings.length === 1 ? 'setting' : 'settings'}
                  </Badge>
                </div>
                <div className="w-full overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-64 shrink-0">Setting</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="w-32 shrink-0">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedSettings.map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="align-top font-mono font-semibold text-primary">
                            {key}
                          </TableCell>
                          <TableCell className="align-top break-words font-mono text-sm">
                            {typeof value === 'object' ? (
                              <pre className="whitespace-pre-wrap break-words">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            ) : (
                              String(value)
                            )}
                          </TableCell>
                          <TableCell className="align-top text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {typeof value}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <details className="rounded-lg border p-4">
                  <summary className="cursor-pointer text-sm font-medium">View Raw JSON</summary>
                  <Textarea
                    value={settingsJson}
                    onChange={(e) => setSettingsJson(e.target.value)}
                    rows={10}
                    className="mt-4 font-mono text-sm"
                  />
                </details>
              </div>
            ) : (
              settingsJson && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">
                    Invalid JSON format. Please upload a valid settings file.
                  </p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={downloadJson} className="gap-2">
          <Download className="h-4 w-4" />
          Download JSON
        </Button>
      </div>
    </div>
  );
}
