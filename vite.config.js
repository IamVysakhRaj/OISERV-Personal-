import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/OISERV-Personal/',  // Correct base URL for GitHub Pages deployment
  build: {
    rollupOptions: {
      external: ['react-router-dom'],  // Externalize this module to avoid resolution errors
    },
  },
});
