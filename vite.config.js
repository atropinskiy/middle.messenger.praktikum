import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/components'), // Путь к компонентам
        resolve(__dirname, 'src/pages'), // Путь к страницам
        resolve(__dirname, 'src'), // Путь к основным файлам, включая main.ts
      ],
    }),
  ],
  assetsInclude: ['**/*.hbs'],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    assetsDir: 'assets',
    esbuild: {
      target: 'es2022', // ✅ Разрешает Top-level await
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  publicDir: 'static',
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@core': resolve(__dirname, 'src/core'),
      '@models': resolve(__dirname, 'src/models'),
    },
  },
});
