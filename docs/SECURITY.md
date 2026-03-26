# Security

## XSS Prevention

- All component output uses React's built-in escaping — no `dangerouslySetInnerHTML`
- User-provided text (product names, descriptions) rendered as text nodes only
- No `eval()` or dynamic code execution anywhere in the library

## Input Validation

- `price` prop: validated as a finite number — invalid values render as `—`
- `href` prop on links: validated to reject `javascript:` scheme
- ARIA attribute values: validated against ARIA spec (e.g., valid role values only)

## Dependency Security

- Zero runtime dependencies (beyond React + Tailwind peer deps)
- `class-variance-authority`, `clsx`, `tailwind-merge` — all pure utilities with no network calls
- `pnpm audit` in CI — zero critical/high vulnerabilities enforced

## Accessibility as Security

- Focus trap in CartDrawer and modal components prevents focus escape to underlying content
- ARIA attributes correctly signal interactive state to assistive technology
- No hidden content that could confuse screen readers

## Content Security Policy Compatibility

Components are CSP-compatible — no inline event handlers, no dynamic style injection.

## Supply Chain

- Package published from GitHub Actions CI only (not from developer machines)
- All releases tagged in git with matching version bump commit
