import { cn } from '../../utils/cn';

export interface PriceProps {
  amount: number;
  currency?: string;
  locale?: string;
  saleAmount?: number;
  className?: string;
}

export function Price({
  amount,
  currency = 'USD',
  locale = 'en-US',
  saleAmount,
  className,
}: PriceProps) {
  const fmt = (val: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val);
  const isSale = saleAmount !== undefined && saleAmount < amount;
  return (
    <span className={cn('flex items-center gap-2', className)}>
      {isSale ? (
        <>
          <span className="font-semibold text-destructive">{fmt(saleAmount as number)}</span>
          <span className="line-through text-muted-foreground text-sm">
            <span className="sr-only">Was </span>
            {fmt(amount)}
          </span>
        </>
      ) : (
        <span className="font-semibold">{fmt(amount)}</span>
      )}
    </span>
  );
}
