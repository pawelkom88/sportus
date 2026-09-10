// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  site: "https://sportus.com.pl",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("formularz-wyslany-potwierdzenie") &&
        !page.includes("404"),
    }),
  ],
  image: {
    domains: ["images.ctfassets.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
});
