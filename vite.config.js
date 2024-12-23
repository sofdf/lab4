import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/lab4/',
  plugins: [react()],
  build: {
    outDir: 'dist', // Папка, куда будет собираться проект
  },

})
