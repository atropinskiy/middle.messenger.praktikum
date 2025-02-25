import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: "src/components",
    }),
  ],
  assetsInclude: ['**/*.hbs'],
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
  publicDir: 'static',
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@core': resolve(__dirname, 'src/core')
    },
  },
});
