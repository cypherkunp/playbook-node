import { OpenAPIHono } from "@hono/zod-openapi";

import onError from "@/middleware/on-error";
import notFound from "@/middleware/on-not-found";
import { pinoLogger } from "@/utilities/logger";

const app = new OpenAPIHono();
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
