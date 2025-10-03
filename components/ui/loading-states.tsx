import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

const funMessages = [
  { message: 'Sprinkling magic dust...', submessage: '✨ Making things awesome' },
  { message: 'Brewing your addon...', submessage: '☕ Almost ready' },
  { message: 'Painting pixels...', submessage: '🎨 Looking good!' },
  { message: 'Consulting the wizards...', submessage: '🧙‍♂️ They approve!' },
  { message: 'Aligning the stars...', submessage: '⭐ Perfect alignment' },
  { message: 'Charging the flux capacitor...', submessage: '⚡ 1.21 gigawatts!' },
  { message: 'Waking up the hamsters...', submessage: '🐹 Powering up' },
  { message: 'Downloading more RAM...', submessage: '💾 Just kidding!' },
];

export function LoadingState({ message, submessage }: LoadingStateProps) {
  const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)];
  const displayMessage = message || randomMessage.message;
  const displaySubmessage = submessage || randomMessage.submessage;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20" />
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">{displayMessage}</p>
        <p className="text-sm text-muted-foreground">{displaySubmessage}</p>
      </div>
    </div>
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };

  return (
    <div className="flex items-center gap-1">
      <div
        className={`${sizeClasses[size]} animate-bounce rounded-full bg-current [animation-delay:-0.3s]`}
      />
      <div
        className={`${sizeClasses[size]} animate-bounce rounded-full bg-current [animation-delay:-0.15s]`}
      />
      <div className={`${sizeClasses[size]} animate-bounce rounded-full bg-current`} />
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showPercentage?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  showPercentage = true,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-center text-sm font-medium text-muted-foreground">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
}
