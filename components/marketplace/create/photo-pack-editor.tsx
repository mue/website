'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  GripVertical,
  Search,
  Shuffle,
  Copy,
  Eye,
  MapPin,
  User,
} from 'lucide-react';
import { Photo } from './types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type PhotoPackEditorProps = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  onDeleteAll: () => void;
};

interface SortablePhotoItemProps {
  photo: Photo;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: keyof Photo | 'url.default', value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  searchTerm: string;
}

function SortablePhotoItem({
  photo,
  index,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  canRemove,
  searchTerm,
}: SortablePhotoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: index.toString(),
  });

  // Highlight matching search terms
  const isMatch =
    !searchTerm ||
    photo.photographer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.url.default?.toLowerCase().includes(searchTerm.toLowerCase());

  if (!isMatch) return null;

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`rounded-lg border ${isMatch && searchTerm ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex w-full items-center justify-between p-4 transition-colors hover:bg-muted">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab touch-none active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Toggle Button */}
        <button onClick={onToggle} className="flex flex-1 items-center gap-5 text-left">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}

          {/* Preview Thumbnail */}
          {photo.url.default && (
            <div className="relative h-10 w-10 overflow-hidden rounded">
              <Image
                src={photo.url.default}
                alt={photo.location || `Photo ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="flex-1 flex flex-col gap-2">
            <h4 className="font-semibold text-lg tracking-tight ">
              {photo.photographer && photo.location
                ? `${photo.photographer} - ${photo.location}`
                : photo.photographer
                  ? photo.photographer
                  : photo.location
                    ? photo.location
                    : `Photo ${index + 1}`}
            </h4>
            {/* {photo.url.default && (
              <p className="text-xs text-muted-foreground truncate max-w-md">{photo.url.default}</p>
            )} */}
            {/* Badges */}
            <div className="flex gap-1">
              {photo.photographer && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <User className="h-3 w-3" />
                  {photo.photographer}
                </Badge>
              )}
              {photo.location && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <MapPin className="h-3 w-3" />
                  {photo.location}
                </Badge>
              )}
            </div>
          </div>
        </button>

        {/* Delete Button */}
        {canRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove} className="ml-2 h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expanded Form */}
      {isExpanded && (
        <div className="space-y-4 border-t p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`photographer-${index}`}>
                <User className="mr-1 inline h-3 w-3" />
                Photographer *
              </Label>
              <Input
                id={`photographer-${index}`}
                value={photo.photographer}
                onChange={(e) => onUpdate('photographer', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${index}`}>
                <MapPin className="mr-1 inline h-3 w-3" />
                Location *
              </Label>
              <Input
                id={`location-${index}`}
                value={photo.location}
                onChange={(e) => onUpdate('location', e.target.value)}
                placeholder="Mountains, Norway"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`url-${index}`}>
              <Eye className="mr-1 inline h-3 w-3" />
              Image URL *
            </Label>
            <Input
              id={`url-${index}`}
              value={photo.url.default}
              onChange={(e) => onUpdate('url.default', e.target.value)}
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </div>

          {/* Image Preview */}
          {photo.url.default && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                <Image
                  src={photo.url.default}
                  alt={photo.location || 'Preview'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PhotoPackEditor({ photos, onChange, onDeleteAll }: PhotoPackEditorProps) {
  const [expandedPhotos, setExpandedPhotos] = useState<Set<number>>(new Set([0]));
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkPhotographer, setBulkPhotographer] = useState('');
  const [bulkLocation, setBulkLocation] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addPhoto = () => {
    const newIndex = photos.length;
    onChange([...photos, { photographer: '', location: '', url: { default: '' } }]);
    setExpandedPhotos(new Set([...expandedPhotos, newIndex]));
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
    const newExpanded = new Set(expandedPhotos);
    newExpanded.delete(index);
    setExpandedPhotos(newExpanded);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString());
      const newIndex = parseInt(over.id.toString());
      onChange(arrayMove(photos, oldIndex, newIndex));
    }
  };

  const shufflePhotos = () => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    onChange(shuffled);
  };

  const applyBulkEdit = () => {
    const updated = photos.map((photo) => ({
      ...photo,
      photographer: bulkPhotographer || photo.photographer,
      location: bulkLocation || photo.location,
    }));
    onChange(updated);
    setBulkPhotographer('');
    setBulkLocation('');
    setShowBulkEdit(false);
  };

  const expandAll = () => {
    setExpandedPhotos(new Set(photos.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedPhotos(new Set());
  };

  const filteredIndices = photos
    .map((photo, index) => ({
      photo,
      index,
      isMatch:
        !searchTerm ||
        photo.photographer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.url.default?.toLowerCase().includes(searchTerm.toLowerCase()),
    }))
    .filter((item) => item.isMatch)
    .map((item) => item.index);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Photos ({photos.length})</CardTitle>
            <CardDescription>
              Drag to reorder, search, and manage your photo collection
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={shufflePhotos} className="gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
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
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 pt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search photos..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkEdit(!showBulkEdit)}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Bulk Edit
          </Button>
        </div>

        {/* Bulk Edit Panel */}
        {showBulkEdit && (
          <div className="mt-4 space-y-3 rounded-lg border bg-muted/50 p-4">
            <h4 className="font-medium">Bulk Edit All Photos</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bulk-photographer">Set Photographer (All)</Label>
                <Input
                  id="bulk-photographer"
                  value={bulkPhotographer}
                  onChange={(e) => setBulkPhotographer(e.target.value)}
                  placeholder="Leave empty to keep individual values"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bulk-location">Set Location (All)</Label>
                <Input
                  id="bulk-location"
                  value={bulkLocation}
                  onChange={(e) => setBulkLocation(e.target.value)}
                  placeholder="Leave empty to keep individual values"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={applyBulkEdit} size="sm">
                Apply to All Photos
              </Button>
              <Button variant="outline" onClick={() => setShowBulkEdit(false)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <p className="text-sm text-muted-foreground">
            Found {filteredIndices.length} photo{filteredIndices.length !== 1 ? 's' : ''}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={photos.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            {photos.map((photo, index) => (
              <SortablePhotoItem
                key={index}
                photo={photo}
                index={index}
                isExpanded={expandedPhotos.has(index)}
                onToggle={() => togglePhotoExpanded(index)}
                onUpdate={(field, value) => updatePhoto(index, field, value)}
                onRemove={() => removePhoto(index)}
                canRemove={photos.length > 1}
                searchTerm={searchTerm}
              />
            ))}
          </SortableContext>
        </DndContext>

        <Button onClick={addPhoto} className="w-full gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          Add Photo
        </Button>
      </CardContent>
    </Card>
  );
}
