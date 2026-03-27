import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/**/*.stories.tsx',
        'src/test-setup.ts',
        'src/index.ts',
        'src/atoms/index.ts',
        'src/molecules/index.ts',
        'src/organisms/index.ts',
        '**/*.config.ts',
        '.storybook/**',
      ],
      thresholds: {
        statements: 70,
        branches: 65,
        functions: 55,
        lines: 70,
      },
    },
  },
});
