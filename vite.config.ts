// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Material icons: force woff2-only @font-face and drop legacy font assets
    {
      name: "mdi-woff2-only",
      enforce: "pre",
      transform(code, id) {
        const path = id.replace(/\\/g, "/");
        if (!path.includes("materialdesignicons") || !path.includes(".css")) {
          return null;
        }
        const next = code
          .replace(
            /@font-face\s*\{[\s\S]*?font-family:\s*"Material Design Icons";[\s\S]*?\}/,
            `@font-face {
  font-family: "Material Design Icons";
  src: url("../fonts/materialdesignicons-webfont.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`
          );
        return { code: next, map: null };
      },
      generateBundle(_options, bundle) {
        for (const fileName of Object.keys(bundle)) {
          if (/materialdesignicons-webfont.*\.(eot|ttf|woff)$/.test(fileName)) {
            delete bundle[fileName];
          }
        }
      },
    },
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Inter",
            styles: "wght@400;500;600;700;800",
          },
        ],
      },
    }),
  ],
  // base:'./',
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  optimizeDeps: {
    include: ["fast-deep-equal"],
  },
  server: {
    port: 3000,
  },
});
