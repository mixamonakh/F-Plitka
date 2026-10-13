import { createServer } from "node:http";
import { loadContactEnv } from "./config.js";
import { createSenders } from "./delivery.js";
import { createContactHandler } from "./contact.js";

const env = loadContactEnv();
const port = Number(env.CONTACT_PORT || 3001);
if (!env.SITE_URL || new URL(env.SITE_URL).origin !== env.SITE_URL)
  throw new Error("Set SITE_URL to the public site origin");
const handler = createContactHandler({
  senders: createSenders(env),
  allowedOrigins: [env.SITE_URL],
});
const server = createServer(
  { requestTimeout: 30_000, headersTimeout: 10_000 },
  handler,
);
server.listen(port, "127.0.0.1", () =>
  console.info(`Contact API: http://127.0.0.1:${port}`),
);
