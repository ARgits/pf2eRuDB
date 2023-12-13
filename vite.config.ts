import { defineConfig, splitVendorChunkPlugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), splitVendorChunkPlugin()],
  build: {
    outDir: "dist",
    dynamicImportVarsOptions: {
      include: ["src/main.ts", "src/filter/*.ts", "src/lib/*.ts"],
    },
    target: "esnext",
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
});
