import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [TanStackRouterVite(), tailwindcss(), viteReact()],
});
