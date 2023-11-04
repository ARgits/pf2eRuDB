import { defineConfig, splitVendorChunkPlugin } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), splitVendorChunkPlugin()],
  build: {
    outDir: "dist",
    dynamicImportVarsOptions:{
      include:'src/main.ts'
    }
  },
  //assetsInclude: "dist/assets/*.html",
});
