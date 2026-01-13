import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// Static site with SSR for dynamic routes
export default defineConfig({
  site: "https://www.parrotspeciesguide.com",
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false  // English at /, Spanish at /es/
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4322  // Different port from main site
  },
  vite: {
    server: {
      host: "127.0.0.1"
    }
  }
});
