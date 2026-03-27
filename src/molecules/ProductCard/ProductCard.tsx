import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { Price } from '../../atoms/Price';
import { cn } from '../../utils/cn';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: { src: string; alt: string };
  slug: string;
  badge?: 'new' | 'sale' | 'featured' | 'out-of-stock';
  stockStatus?: 'instock' | 'outofstock' | 'onbackorder';
  onAddToCart?: (id: string) => void;
  className?: string;
}

export function ProductCard({ id, name, price, compareAtPrice, image, slug, badge, stockStatus = 'instock', onAddToCart, className }: ProductCardProps) {
  return (
    <article className={cn('group relative rounded-lg border bg-card overflow-hidden', className)}>
      <a href={`/products/${slug}`} className="block aspect-square overflow-hidden bg-muted">
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          width={400}
          height={400}
        />
      </a>
      {badge && (
        <div className="absolute top-2 left-2">
          <Badge variant={badge}>{badge === 'out-of-stock' ? 'Out of Stock' : badge.charAt(0).toUpperCase() + badge.slice(1)}</Badge>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-medium leading-tight">
          <a href={`/products/${slug}`} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            {name}
          </a>
        </h3>
        <div className="mt-2">
          {compareAtPrice !== undefined && compareAtPrice > price ? (
            <Price amount={compareAtPrice} saleAmount={price} />
          ) : (
            <Price amount={price} />
          )}
        </div>
        <Button
          className="mt-3 w-full"
          size="sm"
          disabled={stockStatus === 'outofstock'}
          onClick={() => onAddToCart?.(id)}
          aria-label={`Add ${name} to cart`}
        >
          {stockStatus === 'outofstock' ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </article>
  );
}
