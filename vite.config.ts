import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://i531131.hera.fontysict.net/",
  build: {
    sourcemap: true
  }
})
