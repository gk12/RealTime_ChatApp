import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // now our frontend runs on port 3000
  server: {
    port: 3000,
  },
});
