import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Recipe_Finder/',  // <-- This tells Vite where to look for assets
  plugins: [react()],
});
