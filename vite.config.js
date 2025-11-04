import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Pages({
      dirs: [
        {
          dir: 'src/views',
          baseRoute: ''
        }
      ],
      extensions: ['vue'],
      extendRoute(route) {
        route.props = false;
        return route;
      }
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    port: 3006,
    host: '0.0.0.0'
  }
})