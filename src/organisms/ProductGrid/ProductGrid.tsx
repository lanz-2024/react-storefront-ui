import { ProductCard, type ProductCardProps } from '../../molecules/ProductCard';
import { cn } from '../../utils/cn';

interface ProductGridProps {
  products: ProductCardProps[];
  loading?: boolean;
  className?: string;
}

function ProductSkeleton() {
  return (
    <div className="rounded-lg border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded mt-3" />
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading, className }: ProductGridProps) {
  if (loading) {
    return (
      <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', className)}>
        {Array.from({ length: 8 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no stable id
          <ProductSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }
  return (
    <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
