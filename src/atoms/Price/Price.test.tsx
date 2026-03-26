import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Price } from './Price';

describe('Price', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<Price amount={29.99} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('formats currency correctly', () => {
    const { getByText } = render(<Price amount={29.99} currency="USD" />);
    expect(getByText('$29.99')).toBeInTheDocument();
  });
  it('shows sale price with strikethrough', () => {
    render(<Price amount={49.99} saleAmount={29.99} />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });
});
