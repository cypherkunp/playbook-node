import createApp from "@/libs/configure-app";
import configureOpenAPI from "@/libs/configure-open-api";
import indexRoute from "@/routes/index.route";

const app = createApp();
const routes = [
  indexRoute,
];

configureOpenAPI(app);

app.get("/health", (c) => {
  return c.text("OK");
});

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
