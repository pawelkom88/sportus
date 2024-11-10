// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  site: "https://zajecia-dla-dzieci-sportus.netlify.app/",
  base: "/",
  integrations: [sitemap()],
  image: {
    domains: ["https://csimg.nyc3.cdn.digitaloceanspaces.com"],
  },
});
