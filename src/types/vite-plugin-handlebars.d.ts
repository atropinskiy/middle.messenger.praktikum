declare module 'vite-plugin-handlebars' {
  import { Plugin } from 'vite';

  interface HandlebarsPluginOptions {
    partialDirectory?: string;
    context?: Record<string, unknown>;
  }

  function handlebars(): Plugin;

  export default handlebars;
}
