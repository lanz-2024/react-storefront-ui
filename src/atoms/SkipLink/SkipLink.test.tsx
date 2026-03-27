import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<SkipLink />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('has correct href', () => {
    const { getByRole } = render(<SkipLink href="#main" />);
    expect(getByRole('link')).toHaveAttribute('href', '#main');
  });
});
