import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve('./src')
    }
  },
  plugins: [vue()],
  server: {
    port: 4000,
    open: true,
    cors: true
  }
})
