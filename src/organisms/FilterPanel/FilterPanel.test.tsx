import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from './FilterPanel';

const groups = [{ id: 'color', label: 'Color', options: [{ value: 'red', label: 'Red', count: 5 }, { value: 'blue', label: 'Blue', count: 3 }] }];

describe('FilterPanel', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<FilterPanel groups={groups} selected={{}} onChange={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
