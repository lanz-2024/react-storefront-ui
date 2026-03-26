import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
describe('Header', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<Header onSearch={vi.fn()} onCartOpen={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('shows cart count badge when items exist', () => {
    const { getByLabelText } = render(<Header cartItemCount={3} onSearch={vi.fn()} />);
    expect(getByLabelText(/3 items/i)).toBeInTheDocument();
  });
});
