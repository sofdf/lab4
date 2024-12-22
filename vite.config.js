import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/lab4/',
  build: {
    outDir: 'dist', // Папка, куда будет собираться проект
  },

})
