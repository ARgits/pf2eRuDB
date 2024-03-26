import { defineConfig, splitVendorChunkPlugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcssNesting from "postcss-nesting";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte(), splitVendorChunkPlugin()],
  build: {
    outDir: "dist",
    dynamicImportVarsOptions: {
      include: ["src/main.ts", "src/filter/*.ts", "src/lib/*.ts"],
    },
    target: "esnext",
  },
  resolve: {
    alias: [
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@data', replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) }
    ]
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
}));
