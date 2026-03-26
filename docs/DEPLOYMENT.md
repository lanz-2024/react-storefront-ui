# Deployment

## npm Package

```bash
npm publish
# or
pnpm publish
```

Package is published as `react-storefront-ui` to npm. Uses `tsup` for dual ESM+CJS output.

### Build

```bash
pnpm build
# Output: dist/ with ESM + CJS + type definitions
```

### Build Verification

```bash
# Check exports are correct
node -e "const { Button } = require('./dist/index.cjs'); console.log(typeof Button)"
node --input-type=module -e "import { Button } from './dist/index.js'; console.log(typeof Button)"
```

## Consuming the Package

```typescript
// Full import
import { Button, ProductCard, CartDrawer } from 'react-storefront-ui';

// Subpath imports (tree-shakeable)
import { Button } from 'react-storefront-ui/atoms';
import { ProductCard } from 'react-storefront-ui/molecules';
import { CartDrawer } from 'react-storefront-ui/organisms';
```

## Peer Dependencies

```json
{
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0",
  "tailwindcss": ">=4.0.0"
}
```

## Storybook

```bash
pnpm storybook        # Local development
pnpm build-storybook  # Static build for deployment
```

Deploy to Chromatic or any static host (Vercel, Netlify).

## Versioning

Follows semantic versioning. Breaking changes bump major version.
