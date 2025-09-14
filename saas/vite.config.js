import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from 'vite-plugin-mkcert';
import fs from "fs";


const target = 'https://api.localtest.me:4000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , mkcert()],
  server: {
    // https: true,
    proxy: {
      '/user': { target, changeOrigin: true, secure: true },
      '/auth': { target, changeOrigin: true, secure: true },
      '/class': { target, changeOrigin: true, secure: true },
      '/socket.io': { target , ws: true, changeOrigin: true, secure: true }, // WebSocket support
    },
    https: {
      key: fs.readFileSync("C:/Users/HP/localtest.me+1-key.pem"),
      cert: fs.readFileSync("C:/Users/HP/localtest.me+1.pem"),
    },
    host: "app.localtest.me",
    port: 5173,               
  },
});
