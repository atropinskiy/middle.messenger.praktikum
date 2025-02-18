import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    assetsDir: 'assets'
  },
  css: {
    postcss: './postcss.config.js',
  },
  publicDir: 'static'
});
