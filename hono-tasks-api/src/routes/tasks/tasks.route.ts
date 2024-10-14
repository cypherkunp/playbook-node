import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@/libs/configure-app";
import { TasksRouteTag } from "@/libs/route-tags";
import rootSchema from "@/routes/root/root.schema";
import * as httpStatusCodes from "@/utilities/http-status-codes";
import jsonContent from "@/utilities/json-content";

import tasksSchema from "./tasks.schema";

const router = createRouter()
  .openapi(
    createRoute({
      tags: [TasksRouteTag],
      path: "/tasks",
      method: "get",
      responses: {
        [httpStatusCodes.OK]: jsonContent(
          tasksSchema,
          "Tasks",
        ),
      },
    }),
    (c) => {
      return c.json([
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          completed: false,
        },
      ], httpStatusCodes.OK);
    },
  );

export default router;
