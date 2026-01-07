import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000'),
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000'),
    allowedHosts: [
      'react-web-0loz.onrender.com',
      '.onrender.com', // Allow all Render subdomains
    ],
  },
});
