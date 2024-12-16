import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react2_proj/',
  build: {
    outDir: 'dist',  // A pasta de saída padrão
  },
});