import type { ReactNode } from 'react';
export function VisuallyHidden({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
  return <span className="sr-only">{children}</span>;
}
