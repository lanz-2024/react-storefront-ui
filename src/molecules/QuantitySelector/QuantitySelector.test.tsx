import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { QuantitySelector } from './QuantitySelector';

describe('QuantitySelector', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<QuantitySelector value={1} onChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('increments and decrements', async () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(3);
    await userEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
  it('respects min/max bounds', async () => {
    const onChange = vi.fn();
    render(<QuantitySelector value={1} min={1} max={3} onChange={onChange} />);
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
  });
});
