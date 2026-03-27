import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { CartDrawer } from './CartDrawer';

describe('CartDrawer', () => {
  it('renders without a11y violations when open', async () => {
    const { container } = render(
      <CartDrawer isOpen onClose={vi.fn()}>
        <p>Cart content</p>
      </CartDrawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it('does not render when closed', () => {
    render(
      <CartDrawer isOpen={false} onClose={vi.fn()}>
        <p>Cart</p>
      </CartDrawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('calls onClose when backdrop clicked', async () => {
    const onClose = vi.fn();
    render(
      <CartDrawer isOpen onClose={onClose}>
        <p>Cart</p>
      </CartDrawer>,
    );
    // biome-ignore lint/style/noNonNullAssertion: selector is guaranteed by component structure
    await userEvent.click(document.querySelector('[aria-hidden="true"]')!);
    expect(onClose).toHaveBeenCalled();
  });
});
