import type { ReactNode } from 'react';
import { SkipLink } from '../../atoms/SkipLink';
import { SearchBar } from '../../molecules/SearchBar';
import { cn } from '../../utils/cn';

export interface HeaderProps {
  logo?: ReactNode;
  cartItemCount?: number;
  onCartOpen?: () => void;
  onSearch?: (query: string) => void;
  nav?: { label: string; href: string }[];
  className?: string;
}

export function Header({
  logo,
  cartItemCount = 0,
  onCartOpen,
  onSearch,
  nav = [],
  className,
}: HeaderProps) {
  return (
    <>
      <SkipLink />
      <header
        className={cn('sticky top-0 z-30 border-b bg-background/95 backdrop-blur', className)}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0">
            {logo ?? <span className="text-lg font-bold">Storefront</span>}
          </div>
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex-1 max-w-sm">
            {onSearch && <SearchBar onSearch={onSearch} placeholder="Search products..." />}
          </div>
          <button
            type="button"
            onClick={onCartOpen}
            className="relative rounded-md p-2 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Open cart, ${cartItemCount} items`}
          >
            <span aria-hidden="true" className="text-xl">
              🛒
            </span>
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center font-medium"
                aria-hidden="true"
              >
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
