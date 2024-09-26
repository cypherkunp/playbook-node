import { asc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { UserPreferencesTable, UserTable } from "./db/schema";

async function InsertUsers() {
  try {
    const user = await db
      .insert(UserTable)
      .values([
        {
          name: "John Dave",
          email: "john.dave@example.com",
          age: 28,
        },
      ])
      // values returned upon insert
      .returning({
        id: UserTable.id,
      })
      // on conflict do nothing
      .onConflictDoNothing();

    await db.insert(UserPreferencesTable).values({
      userId: user[0].id,
      emailUpdates: true,
    });

    console.log("user added, ", user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}

async function QueryUsers() {
  const user = await db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
    },
    // this is how you add a column that is not in the table but is
    // derived from the table
    extras: {
      nameInLowercase: sql<string>`LOWER(${UserTable.name})`.as(
        "nameInLowercase"
      ),
    },
    limit: 10,
    offset: 0,
  });
  console.log("query users --> ", user);

  const user2 = await db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
    },
    with: {
      posts: true,
      preferences: {
        columns: {
          emailUpdates: true,
        },
      },
    },
  });
  console.log("query users --> ", user2);
}

async function selectUsers() {
  let users = await db
    .select({ id: UserTable.id, age: UserTable.age })
    .from(UserTable)
    .where(eq(UserTable.age, 25));

  console.log("Select User for age 25---> ", users);

  users = await db
    .select({
      id: UserTable.id,
      age: UserTable.age,
      emailUpdated: UserPreferencesTable.emailUpdates,
    })
    .from(UserTable)
    .leftJoin(
      UserPreferencesTable,
      eq(UserPreferencesTable.userId, UserTable.id)
    )
    .orderBy(asc(UserTable.age));

  console.log("Select User for left join ---> ", users);
}

function main() {
  // InsertUsers();
  // QueryUsers();
  // selectUsers();
}

main();
