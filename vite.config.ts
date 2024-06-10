import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/spotify-list/' : '/', // for deployment on GH pages
  plugins: [react()],
})
