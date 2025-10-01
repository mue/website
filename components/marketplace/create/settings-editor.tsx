import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

type SettingsEditorProps = {
  settingsJson: string;
  onChange: (json: string) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SettingsEditor({ settingsJson, onChange, onFileUpload }: SettingsEditorProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Upload your Mue Settings JSON file exported from Mue.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            id="settings-upload"
            type="file"
            accept=".json"
            onChange={onFileUpload}
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
                onChange={(e) => onChange(e.target.value)}
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
  );
}
