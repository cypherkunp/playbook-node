import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";

import Emoji from "@/middleware/emoji";
import { pinoLogger } from "@/middleware/logger";
import onError from "@/middleware/on-error";
import notFound from "@/middleware/on-not-found";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>();

  app.use(pinoLogger());
  app.use(Emoji("📒"));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
