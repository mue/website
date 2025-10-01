import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Photo } from './types';

type PhotoPackEditorProps = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  onDeleteAll: () => void;
};

export function PhotoPackEditor({ photos, onChange, onDeleteAll }: PhotoPackEditorProps) {
  const [expandedPhotos, setExpandedPhotos] = useState<Set<number>>(new Set([0]));

  const addPhoto = () => {
    const newIndex = photos.length;
    onChange([...photos, { photographer: '', location: '', url: { default: '' } }]);
    setExpandedPhotos(new Set([...expandedPhotos, newIndex]));
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  const updatePhoto = (index: number, field: keyof Photo | 'url.default', value: string) => {
    const updated = [...photos];
    if (field === 'url.default') {
      updated[index].url.default = value;
    } else {
      updated[index][field as keyof Photo] = value as never;
    }
    onChange(updated);
  };

  const togglePhotoExpanded = (index: number) => {
    const newExpanded = new Set(expandedPhotos);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPhotos(newExpanded);
  };

  return (
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
              onClick={onDeleteAll}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {photos.map((photo, index) => {
          const isExpanded = expandedPhotos.has(index);
          return (
            <div key={index} className="rounded-lg border">
              <button
                onClick={() => togglePhotoExpanded(index)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <h4 className="font-medium">
                    {photo.photographer && photo.location
                      ? `${photo.photographer} - ${photo.location}`
                      : photo.photographer
                        ? photo.photographer
                        : photo.location
                          ? photo.location
                          : `Photo ${index + 1}`}
                  </h4>
                </div>
                {photos.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </button>

              {isExpanded && (
                <div className="space-y-4 border-t p-4">
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
              )}
            </div>
          );
        })}

        <Button onClick={addPhoto} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Photo
        </Button>
      </CardContent>
    </Card>
  );
}
