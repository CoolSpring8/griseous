/* eslint-disable import/no-extraneous-dependencies */
import reactRefresh from "@vitejs/plugin-react-refresh";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      manifest: {
        name: "Griseous - an unofficial web UI for CC98",
        short_name: "Griseous",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
        theme_color: "#c4b5fd",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
    visualizer(),
  ],
  server: { port: 80 },
  define: {
    "process.env.NODE_DEBUG": undefined,
  },
});
