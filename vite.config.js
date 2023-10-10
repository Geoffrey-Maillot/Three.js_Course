import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        lesson1_2: resolve(__dirname, "html/discoverThreeJsBook/1.2.html"),
      },
    },
  },
});
