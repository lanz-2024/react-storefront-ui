# Accessibility

All components target WCAG 2.1 Level AA compliance.

## WCAG 2.1 AA Checklist

### Perceivable

- [x] 1.1.1 Non-text Content — all `<img>` elements require a meaningful `alt` prop
- [x] 1.3.1 Info and Relationships — semantic HTML used throughout (article, header, nav, aside, h1–h3)
- [x] 1.3.3 Sensory Characteristics — instructions do not rely on color or shape alone
- [x] 1.4.1 Use of Color — color is never the only visual means of conveying information (error states also use icons/text)
- [x] 1.4.3 Contrast (Minimum) — text contrast meets 4.5:1 ratio (normal) and 3:1 (large text) via design tokens
- [x] 1.4.4 Resize Text — components use relative units; no text clipped at 200% zoom
- [x] 1.4.11 Non-text Contrast — interactive element boundaries meet 3:1 contrast ratio

### Operable

- [x] 2.1.1 Keyboard — all interactive elements reachable and operable by keyboard only
- [x] 2.1.2 No Keyboard Trap — CartDrawer focus trap includes Escape key to exit
- [x] 2.4.1 Bypass Blocks — SkipLink provided in Header to skip to main content
- [x] 2.4.3 Focus Order — logical DOM order maintained; no positive tabindex values
- [x] 2.4.4 Link Purpose — link text is descriptive in context (ProductCard uses product name)
- [x] 2.4.7 Focus Visible — all focusable elements have `focus-visible:ring-*` styles

### Understandable

- [x] 3.1.1 Language of Page — `lang` attribute set on consuming application's `<html>`
- [x] 3.2.1 On Focus — no context changes triggered on focus alone
- [x] 3.3.1 Error Identification — Input errors identified in text with `role="alert"`
- [x] 3.3.2 Labels or Instructions — all inputs have associated `<label>` elements

### Robust

- [x] 4.1.2 Name, Role, Value — ARIA roles, states, and properties used correctly throughout
- [x] 4.1.3 Status Messages — `aria-live="polite"` on QuantitySelector quantity display

## Component-by-Component Notes

### Button

- Uses native `<button>` element — inherits keyboard operability, role, and focus behavior
- `aria-label` accepted as prop for icon-only buttons
- `disabled` attribute used (not `aria-disabled`) to prevent all interaction

### Input

- `aria-invalid="true"` set when `error` prop is present
- Error message linked via `aria-describedby` to the `<p role="alert">` element
- `id` prop required to enable `aria-describedby` linkage
- `forwardRef` enables parent components to manage focus programmatically

### FormField

- Automatically generates `id` from `label` if not provided (lowercase, spaces replaced with hyphens)
- `<label>` always rendered before `<input>` in DOM
- Hint text linked via `aria-describedby` alongside error message

### Price

- Sale price wrapped in `<span>` — screen readers announce both prices
- Original (crossed-out) price has `aria-label="Was $X.XX"` to communicate meaning beyond visual strikethrough

### Badge

- Rendered as `<span>` — inline, non-interactive
- For dynamic status changes (e.g., stock going out), wrap in `aria-live="polite"` at the page level

### SkipLink

- Visually hidden via `sr-only` until focused (`.focus:not-sr-only`)
- First focusable element in the page — appears before all navigation
- `href="#main-content"` default — consuming app must set `id="main-content"` on the main landmark

### QuantitySelector

- `role="group"` with `aria-label="Quantity"` groups the three controls
- `aria-live="polite"` on the count span announces changes to screen readers
- Each button has a descriptive `aria-label` ("Increase quantity", "Decrease quantity")

### SearchBar

- `role="combobox"` on the input with `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`
- `role="listbox"` on the suggestions list with `role="option"` per item
- `aria-activedescendant` tracks keyboard-selected suggestion
- `aria-selected` marks the active option

### ProductCard

- Wrapped in `<article>` — screen readers can navigate between product cards
- Product name link text is descriptive (not "Click here" or "Read more")
- Add to cart button has `aria-label="Add [product name] to cart"` for unique identification

### CartDrawer

- `role="dialog"` with `aria-modal="true"` and descriptive `aria-label`
- `useFocusTrap` keeps focus within the drawer while open
- `Escape` key closes the drawer from any focused element inside
- `document.body.style.overflow = 'hidden'` prevents background scroll

### FilterPanel

- `<aside>` with `aria-label="Product filters"` marks it as a complementary landmark
- Each group toggle uses `aria-expanded` and `aria-controls`
- `hidden` attribute on collapsed panels (not just `display:none` via CSS) — screen readers skip them

### Header

- `<header>` is a landmark (`role="banner"`)
- `<nav aria-label="Main navigation">` — distinguishable from other nav elements on the page
- Cart button: `aria-label="Open cart, N items"` communicates item count

## Running Automated Checks

```bash
# axe-core runs in every component test suite
pnpm test

# Storybook a11y addon — visual panel shows violations per story
pnpm storybook
# Navigate to any story -> Accessibility tab in the addon panel

# Full axe report for a specific component
pnpm test -- --reporter=verbose src/atoms/Input/Input.test.tsx
```

## Manual Testing Checklist

Before releasing a new component:

- [ ] Navigate entire component using Tab and Shift+Tab only
- [ ] Activate all interactive elements using Enter and Space
- [ ] Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] Verify at 200% browser zoom — no content clipped or overlapping
- [ ] Check in Windows High Contrast mode
- [ ] Verify with `prefers-reduced-motion` enabled (System Preferences -> Accessibility -> Display -> Reduce Motion)
