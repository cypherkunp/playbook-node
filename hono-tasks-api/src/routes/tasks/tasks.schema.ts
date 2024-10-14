import { z } from "@hono/zod-openapi";

const tasksSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
})).openapi({ example: [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    completed: false,
  },
] });

export default tasksSchema;
