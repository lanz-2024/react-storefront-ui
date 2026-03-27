import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('has combobox role', () => {
    const { getByRole } = render(<SearchBar onSearch={vi.fn()} />);
    expect(getByRole('combobox')).toBeInTheDocument();
  });
});
