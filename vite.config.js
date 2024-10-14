import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/OISERV-Personal/',  // Correct base URL for GitHub Pages deployment
  build: {
    rollupOptions: {
      external: [],  // Externalize this module to avoid resolution errors  'react-router-dom', '@fortawesome/free-solid-svg-icons'
    },
  },
});
