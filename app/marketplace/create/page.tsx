'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { AddonMetadata, AddonType, Photo, Quote } from '@/components/marketplace/create/types';
import {
  DeleteConfirmDialog,
  ErrorDialog,
  SubmitDialog,
} from '@/components/marketplace/create/dialogs';
import { StepIndicator } from '@/components/marketplace/create/step-indicator';
import { StepWelcome } from '@/components/marketplace/create/step-welcome';
import { StepTypeSelection } from '@/components/marketplace/create/step-type-selection';
import { StepMetadata } from '@/components/marketplace/create/step-metadata';
import { StepContent } from '@/components/marketplace/create/step-content';
import { StepPreview } from '@/components/marketplace/create/step-preview';
import { StepOutput } from '@/components/marketplace/create/step-output';
import { DraftManager, SavedDraft } from '@/components/marketplace/create/draft-manager';

export default function CreateAddonPage() {
  const [currentStep, setCurrentStep] = useState(1);
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

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('mue-addon-draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.currentStep) setCurrentStep(draft.currentStep);
        if (draft.addonType) setAddonType(draft.addonType);
        if (draft.metadata) setMetadata(draft.metadata);
        if (draft.photos) setPhotos(draft.photos);
        if (draft.quotes) setQuotes(draft.quotes);
        if (draft.settingsJson) setSettingsJson(draft.settingsJson);
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  }, []);

  // Auto-save draft to localStorage whenever state changes
  useEffect(() => {
    // Only save if we're past the welcome screen and have some content
    if (currentStep > 1) {
      try {
        const draft = {
          currentStep,
          addonType,
          metadata,
          photos,
          quotes,
          settingsJson,
          lastSaved: new Date().toISOString(),
        };
        localStorage.setItem('mue-addon-draft', JSON.stringify(draft));
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    }
  }, [currentStep, addonType, metadata, photos, quotes, settingsJson]);

  const clearDraft = () => {
    try {
      localStorage.removeItem('mue-addon-draft');
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  };

  const handleLoadDraft = (draft: SavedDraft) => {
    setAddonType(draft.metadata.type);
    setMetadata(draft.metadata);
    if (draft.content.photos) setPhotos(draft.content.photos);
    if (draft.content.quotes) setQuotes(draft.content.quotes);
    if (draft.content.settingsJson) setSettingsJson(draft.content.settingsJson);
    // Start at type selection step to allow continuing the workflow
    setCurrentStep(2);
  };

  const handleNewDraft = () => {
    if (
      confirm(
        'Start a new draft? This will clear your current progress (unless you save it first).',
      )
    ) {
      setCurrentStep(1);
      setAddonType('photos');
      resetMetadata();
      setPhotos([{ photographer: '', location: '', url: { default: '' } }]);
      setQuotes([{ quote: '', author: '' }]);
      setSettingsJson('');
      clearDraft();
    }
  };

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

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const resetWizard = () => {
    setCurrentStep(1);
    setAddonType('photos');
    resetMetadata();
    setPhotos([{ photographer: '', location: '', url: { default: '' } }]);
    setQuotes([{ quote: '', author: '' }]);
    setSettingsJson('');
    clearDraft(); // Clear the saved draft
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome onNext={nextStep} />;
      case 2:
        return (
          <StepTypeSelection
            value={addonType}
            onChange={handleTypeChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepMetadata
            metadata={metadata}
            onChange={handleMetadataChange}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepContent
            addonType={addonType}
            photos={photos}
            quotes={quotes}
            settingsJson={settingsJson}
            onPhotosChange={setPhotos}
            onQuotesChange={setQuotes}
            onSettingsChange={setSettingsJson}
            onDeleteAllPhotos={() => setShowDeletePhotosDialog(true)}
            onDeleteAllQuotes={() => setShowDeleteQuotesDialog(true)}
            onSettingsFileUpload={(e) => handleFileUpload(e, true)}
            onLoadExample={loadExample}
            onImportAddon={(e) => handleFileUpload(e)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepPreview
            addonType={addonType}
            metadata={metadata}
            photos={photos}
            quotes={quotes}
            settingsJson={settingsJson}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <StepOutput
            addonType={addonType}
            metadata={metadata}
            photos={photos}
            quotes={quotes}
            onDownload={downloadJson}
            onSubmit={submitToMarketplace}
            onBack={prevStep}
            onStartOver={resetWizard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-8">
      {currentStep > 1 && (
        <div className="flex items-center justify-between gap-4">
          <MarketplaceBreadcrumb type="create" />

          <DraftManager
            currentDraft={{
              addonType,
              metadata,
              content: {
                photos,
                quotes,
                settingsJson,
              },
            }}
            onLoadDraft={handleLoadDraft}
            onNewDraft={handleNewDraft}
          />
        </div>
      )}

      {currentStep > 1 && (
        <>
          <StepIndicator
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            canNavigateToStep={(step) => step < currentStep}
          />

          {/* Progress Percentage */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-primary">
              {Math.round(((currentStep - 1) / 5) * 100)}% Complete
            </span>
            <span>•</span>
            <span>Step {currentStep} of 6</span>
          </div>
        </>
      )}

      {/* Animated Step Container */}
      <div key={currentStep} className="animate-in fade-in slide-in-from-right-4 duration-500">
        {renderStep()}
      </div>

      <Input
        id="addon-upload-hidden"
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e)}
        className="hidden"
      />

      <SubmitDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        submitUrl={submitUrl}
      />

      <ErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        message={errorMessage}
      />

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
