'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Save, FolderOpen, Trash2, Download, Upload, Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getMarketplaceTypeLabel } from '@/lib/marketplace';

export interface SavedDraft {
  id: string;
  name: string;
  timestamp: number;
  addonType: 'photos' | 'quotes' | 'settings' | null;
  metadata: {
    name: string;
    description: string;
    type: 'photos' | 'quotes' | 'settings';
    version: string;
    author: string;
    icon_url: string;
    screenshot_url: string;
  };
  content: {
    photos?: Array<{ photographer: string; location: string; url: { default: string } }>;
    quotes?: Array<{ name?: string; author: string; quote: string }>;
    settingsJson?: string;
  };
}

interface DraftManagerProps {
  currentDraft: Omit<SavedDraft, 'id' | 'name' | 'timestamp'>;
  onLoadDraft: (draft: SavedDraft) => void;
  onNewDraft: () => void;
}

const DRAFTS_STORAGE_KEY = 'mue_addon_drafts';

export function DraftManager({ currentDraft, onLoadDraft }: DraftManagerProps) {
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  // Load drafts from localStorage
  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    const stored = localStorage.getItem(DRAFTS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDrafts(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Failed to parse drafts:', e);
        setDrafts([]);
      }
    }
  };

  const saveDrafts = (updatedDrafts: SavedDraft[]) => {
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const handleSaveDraft = () => {
    if (!draftName.trim()) return;

    const newDraft: SavedDraft = {
      id: crypto.randomUUID(),
      name: draftName.trim(),
      timestamp: Date.now(),
      ...currentDraft,
    };

    const updatedDrafts = [...drafts, newDraft];
    saveDrafts(updatedDrafts);
    setDraftName('');
    setShowSaveDialog(false);
  };

  const handleDeleteDraft = (id: string) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== id);
    saveDrafts(updatedDrafts);
    if (id === selectedDraftId) {
      setSelectedDraftId(null);
    }
  };

  const handleLoadDraft = (draft: SavedDraft) => {
    onLoadDraft(draft);
    setShowLoadDialog(false);
    setSelectedDraftId(draft.id);
  };

  const handleExportDraft = (draft: SavedDraft) => {
    const dataStr = JSON.stringify(draft, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${draft.name.replace(/\s+/g, '-')}-draft.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportDraft = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string);
            imported.id = crypto.randomUUID(); // Generate new ID
            imported.timestamp = Date.now(); // Update timestamp
            const updatedDrafts = [...drafts, imported];
            saveDrafts(updatedDrafts);
          } catch {
            alert('Failed to import draft. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getContentSummary = (draft: SavedDraft) => {
    if (draft.content.photos && draft.content.photos.length > 0) {
      return `${draft.content.photos.length} photo${draft.content.photos.length > 1 ? 's' : ''}`;
    }
    if (draft.content.quotes && draft.content.quotes.length > 0) {
      return `${draft.content.quotes.length} quote${draft.content.quotes.length > 1 ? 's' : ''}`;
    }
    if (draft.content.settingsJson) {
      return 'Settings configured';
    }
    return 'No content yet';
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLoadDialog(true)}
          className="gap-2"
        >
          <FolderOpen className="h-4 w-4" />
          Load Draft
          {drafts.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {drafts.length}
            </Badge>
          )}
        </Button>

        <Button variant="outline" size="sm" onClick={handleImportDraft} className="gap-2">
          <Upload className="h-4 w-4" />
          Import
        </Button>
      </div>

      {/* Save Draft Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Draft</DialogTitle>
            <DialogDescription>
              Give your draft a name so you can easily find it later.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="draft-name">Draft Name</Label>
              <Input
                id="draft-name"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="e.g., Nature Photos Pack v1"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveDraft()}
              />
            </div>

            {currentDraft.addonType && (
              <div className="rounded-lg border p-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{getMarketplaceTypeLabel(currentDraft.addonType)}</Badge>
                </div>
                {currentDraft.metadata.name && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Addon Name:</span>
                    <span className="font-medium">{currentDraft.metadata.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDraft} disabled={!draftName.trim()}>
              Save Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Draft Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Load Draft</DialogTitle>
            <DialogDescription>
              Choose a draft to continue working on. Your current progress will be replaced.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 py-4">
            {drafts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No saved drafts yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create and save drafts to access them here
                </p>
              </div>
            ) : (
              drafts
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((draft) => (
                  <Card
                    key={draft.id}
                    className="p-4 space-y-3 hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleLoadDraft(draft)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{draft.name}</h4>
                          {draft.id === selectedDraftId && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(draft.timestamp)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportDraft(draft);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this draft?')) {
                              handleDeleteDraft(draft.id);
                            }
                          }}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {draft.addonType && (
                        <Badge variant="outline">{getMarketplaceTypeLabel(draft.addonType)}</Badge>
                      )}
                      {draft.metadata.name && (
                        <Badge variant="secondary">{draft.metadata.name}</Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {getContentSummary(draft)}
                      </Badge>
                    </div>

                    {draft.metadata.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {draft.metadata.description}
                      </p>
                    )}
                  </Card>
                ))
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
