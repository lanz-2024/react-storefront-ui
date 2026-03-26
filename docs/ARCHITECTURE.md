# Architecture

## Atomic Design System

This library implements Brad Frost's Atomic Design methodology, organizing components into three tiers:

### Atoms

The smallest, most primitive UI elements. They have no dependencies on other library components and are composed entirely of HTML elements with Tailwind utilities.

- `Button` — wraps `<button>` with variant and size props
- `Input` — wraps `<input>` with error and accessibility props
- `Price` — formats currency using `Intl.NumberFormat`
- `Badge` — status label using `class-variance-authority` variants
- `SkipLink` — accessibility navigation shortcut
- `VisuallyHidden` — screen-reader-only wrapper

### Molecules

Composed of atoms. Each molecule has a single, focused responsibility.

- `ProductCard` — combines Badge, Price, Button, and an `<img>` tag
- `SearchBar` — controlled combobox built on a plain `<input>`
- `QuantitySelector` — composes two buttons and a live region span
- `FormField` — composes a `<label>`, hint paragraph, and Input atom

### Organisms

Complex, self-contained UI sections built from atoms and molecules. Organisms may manage their own local state and side effects.

- `ProductGrid` — renders a grid of ProductCards with a skeleton loading state
- `CartDrawer` — manages focus trap, scroll lock, and Escape key handling
- `FilterPanel` — manages collapsed/expanded state per filter group
- `Header` — composes SkipLink, navigation, SearchBar, and cart button

## Component Hierarchy Rule

A component may only import from the same tier or a lower tier:

```
Organisms -> Molecules -> Atoms -> HTML
```

Organisms never import other organisms. This keeps the dependency graph acyclic and components independently testable.

## Build: tsup for Dual ESM/CJS Output

The library uses [tsup](https://tsup.egoist.dev/) to produce both ES Module and CommonJS outputs from a single TypeScript source.

```ts
// tsup.config.ts (simplified)
{
  entry: {
    index: 'src/index.ts',
    'atoms/index': 'src/atoms/index.ts',
    'molecules/index': 'src/molecules/index.ts',
    'organisms/index': 'src/organisms/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
}
```

This produces:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript declarations)
- Sub-path outputs for atoms, molecules, organisms

## Tree-Shaking

Tree-shaking works because:

1. The `package.json` `exports` field maps each sub-path to its own entry point
2. tsup outputs pure ESM with no side effects by default
3. Each component file only imports what it uses — no wildcard re-exports that bundle everything

When a consumer imports `import { Button } from 'react-storefront-ui/atoms'`, bundlers (webpack 5, Rollup, esbuild, Vite) only include Button and its direct dependencies — not Price, Badge, or any organism.

## TypeScript Configuration

Strict mode is enabled throughout:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

All props interfaces are exported so consumers can extend or type-check against them.

## CSS Strategy

Components use Tailwind CSS utility classes exclusively. No CSS-in-JS runtime, no CSS Modules. The `cn()` utility (built on `clsx` + `tailwind-merge`) resolves class conflicts when consumers pass additional `className` props.

Design tokens are defined as CSS custom properties in `src/tokens/design-tokens.css` and map to Tailwind's default theme variable names (`--background`, `--primary`, `--destructive`, etc.).
