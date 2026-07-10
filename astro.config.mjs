import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://watermenon09.github.io",
  base: "/Personal-Portfolio",
  integrations: [sitemap()],
});
