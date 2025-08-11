import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from 'vite-plugin-mkcert';


const target = 'http://localhost:4620';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: true,
    proxy: {
      '/user': { target, changeOrigin: true, secure: true },
      '/auth': { target, changeOrigin: true, secure: true },
      '/class': { target, changeOrigin: true, secure: true },
      '/socket.io': { target , ws: true, changeOrigin: true, secure: true }, // WebSocket support
    },
  },
});
