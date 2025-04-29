import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- importa o path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <-- define o alias
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
