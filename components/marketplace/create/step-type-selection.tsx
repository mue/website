import { AddonType } from './types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, MessageSquareQuote, Settings, ArrowRight } from 'lucide-react';

interface StepTypeSelectionProps {
  value: AddonType;
  onChange: (type: AddonType) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTypeSelection({ value, onChange, onNext, onBack }: StepTypeSelectionProps) {
  const addonTypes: Array<{
    type: AddonType;
    icon: React.ElementType;
    title: string;
    description: string;
  }> = [
    {
      type: 'photos',
      icon: Image,
      title: 'Photo Pack',
      description:
        'Create a collection of beautiful background images for Mue Tab with photographer credits and locations.',
    },
    {
      type: 'quotes',
      icon: MessageSquareQuote,
      title: 'Quote Pack',
      description:
        'Build a curated collection of inspirational or interesting quotes with proper attribution.',
    },
    {
      type: 'settings',
      icon: Settings,
      title: 'Preset Settings',
      description:
        'Share your custom Mue Tab configuration as a preset that others can easily apply.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Addon Type</h2>
        <p className="text-muted-foreground">Select the type of addon you would like to create</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {addonTypes.map(({ type, icon: Icon, title, description }) => (
          <Card
            key={type}
            className={`cursor-pointer p-6 transition-all hover:shadow-lg ${
              value === type
                ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onChange(type)}
          >
            <div className="space-y-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  value === type ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
