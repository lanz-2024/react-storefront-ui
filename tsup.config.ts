import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'atoms/index': 'src/atoms/index.ts',
    'molecules/index': 'src/molecules/index.ts',
    'organisms/index': 'src/organisms/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  minify: false,
  splitting: true,
  outDir: 'dist',
});
