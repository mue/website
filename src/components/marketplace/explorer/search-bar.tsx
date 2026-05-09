import type { RefObject } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { getMarketplaceTypeLabel, getItemCategory } from '@/lib/marketplace';
import type { MarketplaceItemSummary } from '@/lib/marketplace';
import { useEmbed } from '@/lib/embed-context';

type SearchBarProps = {
  query: string;
  setQuery: (q: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: (index: number) => void;
  suggestions: MarketplaceItemSummary[];
  filteredCount: number;
  searchInputRef: RefObject<HTMLInputElement | null>;
};

export function SearchBar({
  query,
  setQuery,
  showSuggestions,
  setShowSuggestions,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
  suggestions,
  filteredCount,
  searchInputRef,
}: SearchBarProps) {
  const navigate = useNavigate();
  const { buildEmbedUrl } = useEmbed();

  const navigateTo = (suggestion: MarketplaceItemSummary) => {
    const category = getItemCategory(suggestion.type);
    navigate({
      to: buildEmbedUrl(`/marketplace/${category}/${encodeURIComponent(suggestion.id)}`) as any,
    });
  };

  return (
    <div className="flex-1 relative max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search by name or author..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setShowSuggestions(true);
            setSelectedSuggestionIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onKeyDown={(event) => {
            if (!showSuggestions || suggestions.length === 0) return;

            if (event.key === 'ArrowDown') {
              event.preventDefault();

              setSelectedSuggestionIndex(
                selectedSuggestionIndex < suggestions.length - 1
                  ? selectedSuggestionIndex + 1
                  : selectedSuggestionIndex,
              );
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();

              setSelectedSuggestionIndex(
                selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : -1,
              );
            } else if (event.key === 'Enter' && selectedSuggestionIndex >= 0) {
              event.preventDefault();
              navigateTo(suggestions[selectedSuggestionIndex]);
            } else if (event.key === 'Escape') {
              setShowSuggestions(false);
            }
          }}
          className="h-12 pl-12 pr-12 text-sm sm:text-base shadow-sm transition focus:shadow-md"
          aria-label="Search marketplace items"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
          <div className="px-5 py-3 text-sm text-muted-foreground border-b border-border">
            Found <strong className="text-foreground">{filteredCount}</strong> result
            {filteredCount !== 1 ? 's' : ''}
          </div>

          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.id}`}
              type="button"
              onClick={() => {
                navigateTo(suggestion);
                setShowSuggestions(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 p-3 text-left transition hover:bg-muted',
                selectedSuggestionIndex === index && 'bg-muted',
              )}
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted">
                {suggestion.icon_url ? (
                  <img
                    src={suggestion.icon_url}
                    alt={suggestion.display_name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground/80">
                    {suggestion.display_name.slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{suggestion.display_name}</div>
                {suggestion.author && (
                  <div className="text-xs text-muted-foreground truncate">
                    By {suggestion.author}
                  </div>
                )}
              </div>

              <Badge variant="secondary" className="text-xs">
                {getMarketplaceTypeLabel(suggestion.type)}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
