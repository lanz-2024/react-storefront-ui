# react-storefront-ui

![CI](https://img.shields.io/github/actions/workflow/status/username/react-storefront-ui/ci.yml?label=CI)
![npm version](https://img.shields.io/npm/v/react-storefront-ui)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![WCAG AA](https://img.shields.io/badge/WCAG-AA-blue)

Accessible React component library for headless storefronts — atomic design, WCAG AA, tree-shakeable.

## Quick Start

```bash
# Install
pnpm add react-storefront-ui

# Run Storybook
pnpm storybook

# Run tests
pnpm test

# Build library
pnpm build
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript 5.5 | Type safety (strict mode) |
| Tailwind CSS | Utility-first styling |
| class-variance-authority | Variant management |
| tsup | Dual ESM/CJS build |
| Vitest | Unit testing |
| vitest-axe | Accessibility testing |
| Storybook 8 | Component documentation |
| Biome | Linting and formatting |

## Features

### Atoms
| Component | Description |
|-----------|-------------|
| `Button` | Accessible button with size/variant props, loading state, and full keyboard support |
| `Input` | Controlled input with error state, aria-invalid, and linked error message |
| `Price` | Currency-formatted price display with sale/compare-at price support |
| `Badge` | Status badges for sale, new, featured, and out-of-stock product states |
| `SkipLink` | Skip navigation link — renders visually hidden until focused |
| `VisuallyHidden` | Screen-reader-only content wrapper using `sr-only` |

### Molecules
| Component | Description |
|-----------|-------------|
| `ProductCard` | Product tile with image, price, badge, and add-to-cart action |
| `SearchBar` | Accessible combobox search with keyboard navigation and suggestions |
| `QuantitySelector` | +/- quantity control with min/max bounds and aria-live updates |
| `FormField` | Label + Input + hint + error composition with automatic id linking |

### Organisms
| Component | Description |
|-----------|-------------|
| `ProductGrid` | Responsive product grid with loading skeleton (8 animated placeholders) |
| `CartDrawer` | Slide-in cart panel with focus trap, Escape to close, and scroll lock |
| `FilterPanel` | Collapsible filter groups with checkbox state management |
| `Header` | Sticky header with logo slot, main nav, search bar, and cart icon |

### Hooks
| Hook | Description |
|------|-------------|
| `useFocusTrap` | Traps keyboard focus within a container when active |
| `useClickOutside` | Fires callback when user clicks outside a referenced element |
| `useReducedMotion` | Detects `prefers-reduced-motion` media query |

## Project Structure

```
react-storefront-ui/
├── src/
│   ├── atoms/          # Primitive components (Button, Input, Price, Badge...)
│   ├── molecules/      # Composed components (ProductCard, SearchBar...)
│   ├── organisms/      # Complex UI sections (Header, CartDrawer...)
│   ├── hooks/          # Reusable React hooks
│   ├── tokens/         # CSS design token variables
│   ├── utils/          # Utility functions (cn)
│   └── index.ts        # Main barrel export
├── .storybook/         # Storybook configuration
├── docs/               # Architecture, testing, and design system docs
├── tsup.config.ts      # Build configuration (dual ESM/CJS)
└── vitest.config.ts    # Test configuration
```

## Configuration

### Tailwind Integration

Add the library's source to your Tailwind `content` paths so utility classes are included:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/react-storefront-ui/src/**/*.{ts,tsx}',
  ],
};
```

### Design Tokens

Import the CSS design tokens in your app's root:

```css
@import 'react-storefront-ui/tokens';
```

Or in your JS entry:

```ts
import 'react-storefront-ui/tokens';
```

### Tree-Shakeable Imports

Import directly from sub-paths for the smallest bundle:

```ts
import { Button } from 'react-storefront-ui/atoms';
import { ProductCard } from 'react-storefront-ui/molecules';
import { Header } from 'react-storefront-ui/organisms';
```

## Testing

```bash
# Run all tests once
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# CI mode (JUnit output)
pnpm test:ci
```

Coverage thresholds (enforced in CI):
- Statements: 90%
- Branches: 85%
- Functions: 90%
- Lines: 90%

## Accessibility

All components target WCAG 2.1 AA compliance:

- Every interactive element has an accessible name
- Focus indicators are visible at 3:1 contrast ratio minimum
- Error messages are linked to inputs via `aria-describedby`
- Modals and drawers use `role="dialog"`, `aria-modal`, and focus trapping
- Dynamic content uses `aria-live` regions
- Reduced motion is respected via `useReducedMotion`

Run automated accessibility checks:

```bash
# axe-core runs in every component test
pnpm test

# Storybook a11y addon (visual panel)
pnpm storybook
```

See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) for the full WCAG checklist.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-component`
3. Write component, test, and story files
4. Ensure `pnpm test` passes with no a11y violations
5. Submit a pull request

Every new component requires:
- A `Component.tsx` with TypeScript props interface
- A `Component.test.tsx` with at least one axe accessibility test
- A `Component.stories.tsx` with Default story
- An `index.ts` barrel export

## Consumer Projects

- [nextjs-headless-storefront](../nextjs-headless-storefront) — Next.js 15 App Router storefront consuming this library

## License

MIT License. See [LICENSE](LICENSE) for details.
