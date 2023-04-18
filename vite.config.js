import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8080
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px',
          viewportWidth: 1920,
          unitPrecision: 4,
          propList: ['*'],
          selectorBlackList: ['ignore-'],
          minPixelValue: 1,
          mediaQuery: true,
          replace: true,
          exclude: [/style.css/],
          landscape: false
        })
      ]
    }
  },
})
