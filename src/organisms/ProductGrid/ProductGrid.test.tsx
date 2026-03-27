import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ProductGrid } from './ProductGrid';

const mockProducts = [
  { id: '1', name: 'Widget', price: 10, image: { src: '/img.jpg', alt: 'Widget' }, slug: 'widget' },
];
describe('ProductGrid', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<ProductGrid products={mockProducts} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('shows loading skeleton', () => {
    const { container } = render(<ProductGrid products={[]} loading />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(8);
  });
});
