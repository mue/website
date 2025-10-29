'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type PresetSettingsTableProps = {
  settings: [string, unknown][];
};

const INITIAL_DISPLAY_COUNT = 25;

export function PresetSettingsTable({ settings }: PresetSettingsTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedSettings = showAll ? settings : settings.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = settings.length > INITIAL_DISPLAY_COUNT;

  const renderValue = (value: unknown) => {
    if (typeof value === 'object') {
      const jsonString = JSON.stringify(value, null, 2);
      return <pre className="whitespace-pre-wrap break-words overflow-hidden">{jsonString}</pre>;
    }
    return <span className="break-all">{String(value)}</span>;
  };

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold text-foreground">Setting</TableHead>
              <TableHead className="font-bold text-foreground">Value</TableHead>
              <TableHead className="font-bold text-foreground w-24">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedSettings.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="align-top font-mono font-semibold text-primary max-w-[200px] break-words">
                  {key}
                </TableCell>
                <TableCell className="align-top break-words font-mono text-sm max-w-[400px]">
                  {renderValue(value)}
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
                Show All ({settings.length - INITIAL_DISPLAY_COUNT} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
