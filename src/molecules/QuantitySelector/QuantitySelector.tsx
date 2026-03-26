import { cn } from '../../utils/cn';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange, className }: QuantitySelectorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)} role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="h-8 w-8 rounded border flex items-center justify-center text-sm font-medium hover:bg-accent disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 text-center tabular-nums font-medium" aria-live="polite" aria-label={`Quantity: ${value}`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-8 w-8 rounded border flex items-center justify-center text-sm font-medium hover:bg-accent disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
