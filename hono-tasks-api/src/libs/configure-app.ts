import { OpenAPIHono } from "@hono/zod-openapi";

import favicon from "@/middleware/favicon";
import { pinoLogger } from "@/middleware/logger";
import onError from "@/middleware/on-error";
import notFound from "@/middleware/on-not-found";

import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false });
}

export default function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.use(favicon("📒"));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
