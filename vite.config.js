import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // default is 'dist'
  },
  base: '/Receipe_Finder/', // important for GitHub Pages
})

