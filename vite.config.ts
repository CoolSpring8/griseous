/* eslint-disable import/no-extraneous-dependencies */
import reactRefresh from "@vitejs/plugin-react-refresh";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), visualizer()],
  server: { port: 80 },
});
