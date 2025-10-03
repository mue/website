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
    // By default, allow navigating to completed steps
    return stepNumber < currentStep;
  };

  const handleStepClick = (stepNumber: number) => {
    if (isStepClickable(stepNumber) && onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 items-center">
            <button
              onClick={() => handleStepClick(step.number)}
              disabled={!isStepClickable(step.number)}
              className={cn(
                'flex flex-col items-center gap-2 transition-all',
                isStepClickable(step.number) && 'cursor-pointer hover:scale-105 active:scale-95',
                !isStepClickable(step.number) && 'cursor-default',
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all relative',
                  step.number < currentStep && 'border-primary bg-primary text-primary-foreground',
                  step.number === currentStep &&
                    'border-primary bg-primary/10 text-primary animate-pulse',
                  step.number > currentStep && 'border-muted bg-background text-muted-foreground',
                  isStepClickable(step.number) && 'hover:border-primary hover:bg-primary/20',
                )}
              >
                {step.number < currentStep ? (
                  <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
                {/* Pulsing ring for current step */}
                {step.number === currentStep && (
                  <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />
                )}
              </div>
              <span
                className={cn(
                  'hidden text-xs font-medium transition-colors sm:block',
                  step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground',
                  isStepClickable(step.number) && 'group-hover:text-primary',
                )}
              >
                {step.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-2 h-0.5 flex-1 transition-all',
                  step.number < currentStep ? 'bg-primary' : 'bg-muted',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
