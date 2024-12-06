import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import { defineConfig } from "vite";

import type { UserConfig } from "vite";
import "dotenv/config";
import path from "node:path";

const common: UserConfig = {
  server: {
    // @ts-ignore
    port: Number.parseInt(process.env.DEV_PORT) ?? 5173,
    host: process.env.HOST ?? "localhost",
  },
  build: {
    rollupOptions: {
      input: ["./app/server.ts"],
      output: {
        assetFileNames: "static/css/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
};

export default defineConfig({
  ...common,
  plugins: [honox({ devServer: { adapter } }), build()],
});
