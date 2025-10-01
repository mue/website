import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Quote } from './types';

type QuotePackEditorProps = {
  quotes: Quote[];
  onChange: (quotes: Quote[]) => void;
  onDeleteAll: () => void;
};

export function QuotePackEditor({ quotes, onChange, onDeleteAll }: QuotePackEditorProps) {
  const [expandedQuotes, setExpandedQuotes] = useState<Set<number>>(new Set([0]));

  const addQuote = () => {
    const newIndex = quotes.length;
    onChange([...quotes, { quote: '', author: '' }]);
    setExpandedQuotes(new Set([...expandedQuotes, newIndex]));
  };

  const removeQuote = (index: number) => {
    onChange(quotes.filter((_, i) => i !== index));
  };

  const updateQuote = (index: number, field: keyof Quote, value: string) => {
    const updated = [...quotes];
    updated[index][field] = value;
    onChange(updated);
  };

  const toggleQuoteExpanded = (index: number) => {
    const newExpanded = new Set(expandedQuotes);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuotes(newExpanded);
  };

  return (
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
        {quotes.map((quote, index) => {
          const isExpanded = expandedQuotes.has(index);
          return (
            <div key={index} className="rounded-lg border">
              <button
                onClick={() => toggleQuoteExpanded(index)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <h4 className="font-medium truncate">
                    {quote.author
                      ? quote.author
                      : quote.quote
                        ? quote.quote.length > 50
                          ? `${quote.quote.slice(0, 50)}...`
                          : quote.quote
                        : `Quote ${index + 1}`}
                  </h4>
                </div>
                {quotes.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuote(index);
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
              )}
            </div>
          );
        })}

        <Button onClick={addQuote} variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Quote
        </Button>
      </CardContent>
    </Card>
  );
}
