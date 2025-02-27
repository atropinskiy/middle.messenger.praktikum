declare module "vite-plugin-handlebars" {
  import { Plugin } from "vite";

  interface HandlebarsPluginOptions {
    partialDirectory?: string;
    context?: Record<string, any>;
  }

  function handlebars(options?: HandlebarsPluginOptions): Plugin;

  export default handlebars;
}
