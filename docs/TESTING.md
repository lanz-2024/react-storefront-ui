# Testing

## Test Pyramid

```
        /\
       /  \
      / E2E \        (not in this library — handled by consumer apps)
     /--------\
    / Integration \  (component interaction tests, user-event flows)
   /--------------\
  /   Unit Tests   \ (axe a11y, rendering, prop behavior)
 /------------------\
```

This library focuses on unit and integration tests. End-to-end tests live in consumer applications like `nextjs-headless-storefront`.

## Running Tests

```bash
# Run all tests once
pnpm test

# Interactive watch mode (re-runs on file change)
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# CI mode — JUnit XML output for test reporters
pnpm test:ci
```

## Test File Convention

Every component has a co-located test file:

```
src/atoms/Button/
  Button.tsx
  Button.test.tsx   <- test file
  Button.stories.tsx
  index.ts
```

## Test Setup

`src/test-setup.ts` configures:

- `@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveClass`, etc.)
- `vitest-axe` matchers (`toHaveNoViolations`)
- jsdom environment (configured in `vitest.config.ts`)

## axe-core Integration

Every component test includes at minimum one axe accessibility test:

```tsx
import { axe } from 'vitest-axe';

it('renders without a11y violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

`vitest-axe` wraps `axe-core` and runs 80+ automated WCAG rules on the rendered DOM. Failures produce descriptive messages identifying the violated rule, the failing element, and remediation guidance.

## User Interaction Tests

Complex interactions use `@testing-library/user-event` v14 which simulates real browser events (pointer events, keyboard events, focus management):

```tsx
import userEvent from '@testing-library/user-event';

it('calls onAddToCart when button clicked', async () => {
  const onAddToCart = vi.fn();
  render(<ProductCard {...props} onAddToCart={onAddToCart} />);
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(onAddToCart).toHaveBeenCalledWith('1');
});
```

## Coverage Thresholds

Enforced in `vitest.config.ts` via `@vitest/coverage-v8`:

| Metric | Threshold |
|--------|-----------|
| Statements | 90% |
| Branches | 85% |
| Functions | 90% |
| Lines | 90% |

CI fails if coverage drops below any threshold.

## CI Pipeline

Tests run on every pull request and push to main:

1. `pnpm install` — install dependencies
2. `pnpm typecheck` — TypeScript strict mode check
3. `pnpm lint` — Biome linting
4. `pnpm test:ci` — run tests with coverage + JUnit output
5. Coverage report uploaded to CI artifacts
6. `pnpm build` — verify build succeeds

## Querying Best Practices

Always query by accessible role or label, never by class or test ID:

```tsx
// Preferred — reflects what screen readers see
screen.getByRole('button', { name: /add to cart/i })
screen.getByLabelText('Email address')
screen.getByRole('alert')

// Avoid
container.querySelector('.btn-primary')
screen.getByTestId('add-to-cart')
```

This ensures tests break when accessibility regresses, not just when CSS classes change.
