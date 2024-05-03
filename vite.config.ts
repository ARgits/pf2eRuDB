import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import VueDevTools from 'vite-plugin-vue-devtools'
import { createData } from './prepareForBuild.ts'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'build') {
    createData()
  }
  return {
    plugins: [
      vue(),
      vueJsx(),
      // VueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        "@router": fileURLToPath(new URL('./src/router', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        "@views": fileURLToPath(new URL('./src/views', import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url))
      }
    }
  }
})
