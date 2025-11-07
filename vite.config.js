import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        'vue-router'
      ],
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true
    }),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
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