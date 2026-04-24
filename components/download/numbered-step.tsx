type NumberedStepProps = {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
};

export function NumberedStep({ number, title, description, isLast }: NumberedStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-sm font-bold text-white">
          {number}
        </span>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className={!isLast ? 'pb-8' : ''}>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
