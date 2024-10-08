import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/libs/configure-app";

const router = createRouter().openapi(createRoute({
  path: "/",
  method: "get",
  responses: {
    200: {
      description: "Tasks API Index",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
}), (c) => {
  return c.json({
    message: "Tasks API Index",
  });
});

export default router;
