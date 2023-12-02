import { defineConfig, splitVendorChunkPlugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), splitVendorChunkPlugin()],
  build: {
    outDir: "dist",
    dynamicImportVarsOptions: {
      include: "src/main.ts",
    },
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  assetsInclude: [
    "src/assets/PF_action_reaction.webp",
    "src/assets/PF_action.webp",
    "src/assets/PF_action_free.webp",
    "src/assets/PF_action_2.webp",
    "src/assets/PF_action_3.webp",
  ],
});
