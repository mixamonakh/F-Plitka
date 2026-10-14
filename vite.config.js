import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { contactPlugin } from "./server/vite-plugin.js";
import { siteRoutesPlugin } from "./server/routes-plugin.js";

export default defineConfig({
  plugins: [react(), siteRoutesPlugin(), contactPlugin()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { emptyOutDir: true },
});
