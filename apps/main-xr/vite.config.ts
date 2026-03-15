import path from "node:path";
import { defineConfig, loadEnv, type Connect, type PreviewServer, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Note: No @webspatial/vite-plugin or vite-plugin-html needed for PICO emulator.
// WebSpatial SDK is enabled purely via jsxImportSource in tsconfig.app.json.
// server.host = true exposes the dev server on all IPs so PICO emulator
// can reach it via http://10.0.2.2:5173/

function withRealtimeSessionRoute(
  app: Connect.Server,
  openAiApiKey: string | undefined,
) {
  app.use("/api/realtime/session", async (req, res, next) => {
    if (req.method !== "POST") {
      next();
      return;
    }

    if (!openAiApiKey) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing OPENAI_API_KEY in repo .env" }));
      return;
    }

    try {
      const upstream = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime",
            audio: {
              output: {
                voice: "marin",
              },
            },
          },
        }),
      });

      const body = await upstream.text();
      res.statusCode = upstream.status;
      res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json");
      res.end(body);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Failed to create realtime client secret",
        }),
      );
    }
  });
}

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(process.cwd(), "../..");
  const env = loadEnv(mode, envDir, "");

  const realtimeSessionPlugin = {
    name: "realtime-session-route",
    configureServer(server: ViteDevServer) {
      withRealtimeSessionRoute(server.middlewares, env.OPENAI_API_KEY);
    },
    configurePreviewServer(server: PreviewServer) {
      withRealtimeSessionRoute(server.middlewares, env.OPENAI_API_KEY);
    },
  };

  return {
    plugins: [react(), realtimeSessionPlugin],
    envDir: "../..",
    server: {
      host: true,
      allowedHosts: true,
    },
  };
});
