import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@/libs/configure-app";
import { IndexRouteTag } from "@/libs/route-tags";
import rootSchema from "@/routes/root/root.schema";
import * as httpStatusCodes from "@/utilities/http-status-codes";
import jsonContent from "@/utilities/json-content";

const router = createRouter()
  .openapi(
    createRoute({
      tags: [IndexRouteTag],
      path: "/",
      method: "get",
      responses: {
        [httpStatusCodes.OK]: jsonContent(
          rootSchema,
          "Tasks API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Tasks API Index",
      }, httpStatusCodes.OK);
    },
  );

export default router;
