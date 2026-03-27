import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
          'hover:opacity-90',
          'focus-visible:ring-[var(--color-ring)]',
        ],
        secondary: [
          'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
          'hover:opacity-80',
          'focus-visible:ring-[var(--color-ring)]',
        ],
        ghost: [
          'bg-transparent text-[var(--color-foreground)]',
          'hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]',
          'focus-visible:ring-[var(--color-ring)]',
        ],
        destructive: [
          'bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]',
          'hover:opacity-90',
          'focus-visible:ring-[var(--color-destructive)]',
        ],
        outline: [
          'border border-[var(--color-border)] bg-[var(--color-background)]',
          'text-[var(--color-foreground)]',
          'hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]',
          'focus-visible:ring-[var(--color-ring)]',
        ],
        link: [
          'bg-transparent text-[var(--color-primary)]',
          'underline-offset-4 hover:underline',
          'focus-visible:ring-[var(--color-ring)]',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-[var(--radius-md)]',
        md: 'h-10 px-4 py-2 text-sm rounded-[var(--radius-md)]',
        lg: 'h-11 px-8 text-base rounded-[var(--radius-md)]',
        icon: 'h-10 w-10 rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

// Polymorphic component types — allows rendering as any HTML element or component
type AsProp<T extends ElementType> = {
  as?: T;
};

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

type PolymorphicComponentProp<T extends ElementType, Props = Record<string, never>> = Props &
  AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

interface ButtonOwnProps extends VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable interaction */
  isLoading?: boolean;
  /** Accessible label for the loading state, read by screen readers */
  loadingLabel?: string;
  children?: ReactNode;
}

export type ButtonProps<T extends ElementType = 'button'> = PolymorphicComponentProp<
  T,
  ButtonOwnProps
>;

/**
 * Polymorphic button component with CVA variant system.
 * Can render as any HTML element via the `as` prop (e.g., `as="a"` for links).
 *
 * @example
 * <Button variant="primary" size="lg">Add to cart</Button>
 * <Button as="a" href="/checkout" variant="outline">Checkout</Button>
 * <Button isLoading>Processing...</Button>
 */
export function Button<T extends ElementType = 'button'>({
  as,
  className,
  variant,
  size,
  isLoading = false,
  loadingLabel = 'Loading…',
  children,
  disabled,
  ...props
}: ButtonProps<T>) {
  const Component = (as ?? 'button') as ElementType;

  // Only add type="button" when rendering as a native <button>
  const typeProps =
    !as || as === 'button' ? { type: (props as { type?: string }).type ?? 'button' } : {};

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      {...typeProps}
      {...props}
    >
      {isLoading && <span className="sr-only">{loadingLabel}</span>}
      {isLoading && (
        <svg
          aria-hidden="true"
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      <span className={isLoading ? 'opacity-0' : undefined}>{children}</span>
    </Component>
  );
}

Button.displayName = 'Button';
