import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source'),
      '@shared': path.resolve(__dirname, '../server/src/shared'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: '../rage/client_packages/ui',
    emptyOutDir: true,
  },
});
