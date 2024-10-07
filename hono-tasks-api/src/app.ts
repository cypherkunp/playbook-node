import createApp from "@/libs/create-app";

const app = createApp();

app.get("/", (c) => {
  c.var.logger.info("Hello Hono!");
  return c.text("Hello Hono!");
});

export default app;
