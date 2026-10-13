import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { contactPlugin } from "./server/vite-plugin.js";

export default defineConfig({
  plugins: [react(), contactPlugin()],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { emptyOutDir: true },
});
