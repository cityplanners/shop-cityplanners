import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Root for shop.cityplanners.co; override with /shop-cityplanners/ for a project URL.
  base: process.env.VITE_BASE_PATH || '/',
})
