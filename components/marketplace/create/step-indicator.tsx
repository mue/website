import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  canNavigateToStep?: (step: number) => boolean;
}

export function StepIndicator({ currentStep, onStepClick, canNavigateToStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: 'Welcome' },
    { number: 2, title: 'Type' },
    { number: 3, title: 'Information' },
    { number: 4, title: 'Content' },
    { number: 5, title: 'Preview' },
    { number: 6, title: 'Complete' },
  ];

  const isStepClickable = (stepNumber: number) => {
    if (!onStepClick) return false;
    if (stepNumber === currentStep) return false;
    if (canNavigateToStep) return canNavigateToStep(stepNumber);
    return stepNumber < currentStep;
  };

  const handleStepClick = (stepNumber: number) => {
    if (isStepClickable(stepNumber) && onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="flex items-center">
      {steps.map((step, index) => (
        <>
          {index > 0 && (
            <div
              key={`line-${step.number}`}
              className={cn(
                'mx-2 h-px flex-1 transition-colors sm:mb-4',
                step.number <= currentStep ? 'bg-primary/40' : 'bg-border',
              )}
            />
          )}
          <button
            key={step.number}
            onClick={() => handleStepClick(step.number)}
            disabled={!isStepClickable(step.number)}
            className={cn(
              'flex flex-col items-center gap-1.5 transition-opacity',
              isStepClickable(step.number) ? 'cursor-pointer hover:opacity-80' : 'cursor-default',
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border transition-all',
                step.number < currentStep && 'border-primary bg-primary text-primary-foreground',
                step.number === currentStep && 'border-primary bg-primary/10 text-primary',
                step.number > currentStep && 'border-border bg-background text-muted-foreground',
              )}
            >
              {step.number < currentStep ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span className="text-xs font-semibold">{step.number}</span>
              )}
            </div>
            <span
              className={cn(
                'hidden text-xs transition-colors sm:block',
                step.number === currentStep && 'font-medium text-foreground',
                step.number < currentStep && 'text-foreground/60',
                step.number > currentStep && 'text-muted-foreground',
              )}
            >
              {step.title}
            </span>
          </button>
        </>
      ))}
    </div>
  );
}
