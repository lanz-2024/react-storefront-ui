import { Input, type InputProps } from '../../atoms/Input';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

export interface FormFieldProps extends InputProps {
  label: string;
  hint?: string;
  className?: string;
}

export function FormField({ label, hint, className, id, error, ...inputProps }: FormFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const hintId = hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={fieldId} className="text-sm font-medium leading-none">{label}</label>
      {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
      <Input id={fieldId} error={error} aria-describedby={hintId} {...inputProps} />
    </div>
  );
}
