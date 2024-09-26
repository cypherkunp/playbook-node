import { db } from "./db";
import { UserTable } from "./db/schema";

async function main() {
  try {
    await db.insert(UserTable).values({
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date(),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }

  const users = await db.select().from(UserTable);
  console.log(users);
}

main();
