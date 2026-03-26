import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

const defaultProps = {
  id: '1', name: 'Test Widget', price: 29.99,
  image: { src: '/test.jpg', alt: 'Test Widget' },
  slug: 'test-widget',
};

describe('ProductCard', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('calls onAddToCart when button clicked', async () => {
    const onAddToCart = vi.fn();
    render(<ProductCard {...defaultProps} onAddToCart={onAddToCart} />);
    await userEvent.click(screen.getByRole('button', { name: /add test widget to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith('1');
  });
  it('disables add to cart for out-of-stock', () => {
    render(<ProductCard {...defaultProps} stockStatus="outofstock" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
