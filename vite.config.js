import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  root: 'frontend', // Set the root to the 'frontend' directory
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  },
});

