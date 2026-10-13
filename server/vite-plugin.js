import { loadContactEnv } from "./config.js";
import { createSenders } from "./delivery.js";
import { createContactHandler } from "./contact.js";

export function contactPlugin() {
  const install = (server, port) => {
    const env = loadContactEnv(server.config.root);
    server.middlewares.use(
      createContactHandler({
        senders: createSenders(env),
        allowedOrigins: [
          env.SITE_URL,
          `http://127.0.0.1:${port}`,
          `http://localhost:${port}`,
        ].filter(Boolean),
      }),
    );
  };
  return {
    name: "contact-api",
    configureServer(server) {
      install(server, server.config.server.port);
    },
    configurePreviewServer(server) {
      install(server, server.config.preview.port);
    },
  };
}
