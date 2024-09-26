import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { DATABASE_URL } from "../lib/env";

const migrationClient = postgres(DATABASE_URL, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/db/migrations",
  });
  await migrationClient.end();
}

main();
