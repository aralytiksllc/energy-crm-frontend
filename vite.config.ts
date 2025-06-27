import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@config': path.resolve(__dirname, 'src/config.tsx'),
      '@routes': path.resolve(__dirname, 'src/routes.tsx'),
    },
  },
});
