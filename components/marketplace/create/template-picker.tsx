import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ContentTemplate, getTemplatesByType } from '@/lib/content-templates';
import { Sparkles } from 'lucide-react';

interface TemplatePickerProps {
  addonType: 'photos' | 'quotes' | 'settings';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: ContentTemplate) => void;
}

export function TemplatePicker({
  addonType,
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplatePickerProps) {
  const templates = getTemplatesByType(addonType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose a Template
          </DialogTitle>
          <DialogDescription>
            Start with a pre-made template and customize it to your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer p-4 transition-all hover:border-primary hover:shadow-md"
              onClick={() => {
                onSelectTemplate(template);
                onOpenChange(false);
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  {template.content.photos && (
                    <div className="flex items-center justify-between">
                      <span>Photos:</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.content.photos.length}
                      </Badge>
                    </div>
                  )}
                  {template.content.quotes && (
                    <div className="flex items-center justify-between">
                      <span>Quotes:</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.content.quotes.length}
                      </Badge>
                    </div>
                  )}
                  {template.content.settingsJson && (
                    <div className="flex items-center justify-between">
                      <span>Settings:</span>
                      <Badge variant="secondary" className="text-xs">
                        Configured
                      </Badge>
                    </div>
                  )}
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <div>Use Template</div>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No templates available for this type yet
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
