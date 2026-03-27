/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { configureAxe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

// Register axe matchers (vitest-axe@0.1.0 extend-expect.js is empty — must extend manually)
expect.extend({ toHaveNoViolations });

// Suppress jsdom "not implemented" noise from axe-core's color-contrast canvas check
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => null,
});

// Configure axe for all tests
configureAxe({
  globalOptions: {
    rules: [
      // Ensure color contrast is checked
      { id: 'color-contrast', enabled: true },
    ],
  },
});

// Silence React 19 act() warnings in test output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to') || args[0].includes('act('))
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
