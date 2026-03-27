import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Input } from './Input';

describe('Input', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(
      <label htmlFor="email">
        Email <Input id="email" placeholder="Enter email" />
      </label>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  it('shows error message with aria-describedby', () => {
    render(<Input id="email" error="Invalid email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });
});
