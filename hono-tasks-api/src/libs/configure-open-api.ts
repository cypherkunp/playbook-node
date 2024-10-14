import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJson from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Tasks APIs",
      version: packageJson.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },

      layout: "classic",
      spec: {
        url: "/doc",
      },
    }),
  );
}
