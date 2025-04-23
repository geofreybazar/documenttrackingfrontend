import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/users": "http://localhost:3001",
      "/documents": "http://localhost:3001",
      "/offices": "http://localhost:3001",
    },
  },
});
