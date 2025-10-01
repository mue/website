'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Quote = {
  quote: string;
  author?: string;
};

type QuotesTableProps = {
  quotes: Quote[];
};

const INITIAL_DISPLAY_COUNT = 25;

export function QuotesTable({ quotes }: QuotesTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedQuotes = showAll ? quotes : quotes.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = quotes.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-16 font-bold text-foreground">#</TableHead>
              <TableHead className="font-bold text-foreground">Quote</TableHead>
              <TableHead className="font-bold text-foreground w-48">Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedQuotes.map((quote, index) => (
              <TableRow key={index}>
                <TableCell className="align-top font-medium text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="align-top max-w-xl break-words font-medium">
                  {quote.quote}
                </TableCell>
                <TableCell className="align-top break-words text-muted-foreground">
                  {quote.author || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show All ({quotes.length - INITIAL_DISPLAY_COUNT} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
