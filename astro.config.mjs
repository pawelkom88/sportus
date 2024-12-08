// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  site: "https://sportus.com.pl",
  base: "/",
  integrations: [sitemap()],
  image: {
    domains: ["https://images.ctfassets.net"],
  },
});
