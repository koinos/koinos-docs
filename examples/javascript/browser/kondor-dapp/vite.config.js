import { defineConfig } from "vite";

// --8<-- [start:vite-config]
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
// --8<-- [end:vite-config]
