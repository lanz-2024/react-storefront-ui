/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { configureAxe } from 'vitest-axe';
import 'vitest-axe/extend-expect';

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
