# Changelog

## [0.1.0] - 2026-03-27

### Added
- Atomic design structure: atoms → molecules → organisms
- **Atoms:** Button (polymorphic + cva variants), Input, Price, Badge, SkipLink, VisuallyHidden
- **Molecules:** ProductCard, SearchBar (aria-combobox), QuantitySelector, FormField
- **Organisms:** CartDrawer (focus trap), FilterPanel, ProductGrid, Header (mega-menu)
- **Hooks:** useFocusTrap, useClickOutside, useReducedMotion
- Design tokens as CSS custom properties (`tokens/design-tokens.css`)
- `cn()` utility (clsx + tailwind-merge)
- Barrel exports with tree-shaking via ESM subpath exports
- tsup build: ESM + CJS dual output with type definitions
- Vitest + @testing-library unit tests for every component
- axe-core automated a11y audit in every component test
- Storybook 10 stories with controls for every component
- WCAG 2.1 AA compliance across all components
- docs/: ARCHITECTURE.md, DESIGN-SYSTEM.md, ACCESSIBILITY.md, TESTING.md, DEPLOYMENT.md, SECURITY.md, CHANGELOG.md

### Depends on
- react@19+ (peer), tailwindcss@4+ (peer)
