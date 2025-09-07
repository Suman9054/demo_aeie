import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
//import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 5000,
    strictPort: true,
    host:true
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:5000",
  },
});
