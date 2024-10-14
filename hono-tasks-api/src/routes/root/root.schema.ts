import { z } from "@hono/zod-openapi";

const rootSchema = z.object({
  message: z.string(),
}).openapi({ example: { message: "Tasks API Index" } });

export default rootSchema;
