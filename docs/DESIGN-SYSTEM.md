# Design System

## Design Tokens

Design tokens are CSS custom properties defined in `src/tokens/design-tokens.css`. They serve as the single source of truth for colors, spacing, typography, and radii — making it straightforward to retheme the entire library by overriding a handful of variables.

### How to Import

```css
/* In your global CSS */
@import 'react-storefront-ui/tokens';
```

```ts
// Or in your JS entry point
import 'react-storefront-ui/tokens';
```

## Color Palette

Tokens use the shadcn/ui naming convention — each semantic role has a foreground counterpart for readable text on that background.

| Token | Purpose | Default (Light) |
|-------|---------|-----------------|
| `--background` | Page background | `oklch(1 0 0)` (white) |
| `--foreground` | Default text | `oklch(0.145 0 0)` (near black) |
| `--primary` | Brand actions, CTAs | `oklch(0.205 0 0)` |
| `--primary-foreground` | Text on primary | `oklch(0.985 0 0)` |
| `--secondary` | Secondary actions | `oklch(0.97 0 0)` |
| `--secondary-foreground` | Text on secondary | `oklch(0.205 0 0)` |
| `--muted` | Subtle backgrounds, skeletons | `oklch(0.97 0 0)` |
| `--muted-foreground` | Hint text, counts | `oklch(0.556 0 0)` |
| `--destructive` | Error states, sale badges | `oklch(0.577 0.245 27.325)` |
| `--destructive-foreground` | Text on destructive | `oklch(0.985 0 0)` |
| `--border` | Input and card borders | `oklch(0.922 0 0)` |
| `--input` | Input border specifically | `oklch(0.922 0 0)` |
| `--ring` | Focus ring color | `oklch(0.708 0 0)` |
| `--card` | Card background | `oklch(1 0 0)` |
| `--card-foreground` | Card text | `oklch(0.145 0 0)` |
| `--popover` | Dropdown/popover background | `oklch(1 0 0)` |
| `--accent` | Hover state backgrounds | `oklch(0.97 0 0)` |

### Dark Mode

Override tokens in a `.dark` class or `@media (prefers-color-scheme: dark)` block:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... */
}
```

### Custom Brand Colors

Replace primary token to retheme all CTAs and focus rings:

```css
:root {
  --primary: oklch(0.6 0.2 240);          /* Blue brand */
  --primary-foreground: oklch(0.98 0 0);
  --ring: oklch(0.6 0.2 240);
}
```

## Typography Scale

Typography uses Tailwind's default scale with system font stack. Override with your brand font:

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Badge labels, counts |
| `text-sm` | 14px | 20px | Body text, input text, nav links |
| `text-base` | 16px | 24px | Default paragraph |
| `text-lg` | 18px | 28px | Card headings |
| `text-xl` | 20px | 28px | Section headings |

## Spacing Scale

Components use Tailwind's default spacing scale (4px base unit):

| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Tight inline spacing |
| `gap-2` | 8px | Badge/price gaps |
| `gap-4` | 16px | Grid gaps, card padding |
| `gap-6` | 24px | Navigation item spacing |
| `p-3` | 12px | Filter panel padding |
| `p-4` | 16px | Card and drawer padding |
| `px-4 py-2` | 16px / 8px | Button padding (default) |
| `px-3 py-2` | 12px / 8px | Input padding |

## Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-md` | 6px | Inputs, buttons, cards |
| `rounded-lg` | 8px | Product cards |
| `rounded-full` | 9999px | Badges, cart count bubble |

## Component Variants

### Button Variants (class-variance-authority)

```ts
variants: {
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
}
```

### Badge Variants

```ts
variants: {
  variant: {
    default:      'bg-primary text-primary-foreground',
    sale:         'bg-destructive text-destructive-foreground',
    new:          'bg-green-100 text-green-800',
    'out-of-stock': 'bg-muted text-muted-foreground',
    featured:     'bg-amber-100 text-amber-800',
  },
}
```

## Customizing with className

All components accept an optional `className` prop. Use `tailwind-merge` (via `cn()`) to safely override tokens:

```tsx
<Button className="bg-violet-600 hover:bg-violet-700">
  Custom Color
</Button>

<ProductCard className="shadow-lg border-2" ... />
```

The `cn()` utility resolves conflicting Tailwind classes correctly — `bg-violet-600` wins over `bg-primary` without duplicate class generation.
