import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  integer,
  pgEnum,
  index,
  boolean,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);

export const UserTable = pgTable(
  "users",
  {
    // id is a universally unique identifier automatically generated
    id: uuid("id").primaryKey().defaultRandom(),
    // name is a variable character string
    name: varchar("name", { length: 255 }).notNull(),
    // age is an integer
    age: integer("age").notNull(),
    // email is a variable character string and unique
    email: varchar("email", { length: 255 }).notNull().unique(),
    // createdAt is a timestamp with default value of now
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    // role is a foreign key that references the userRole of the user table
    role: UserRole("userRole").default("USER").notNull(),
  },
  (table) => ({
    // index is a way to speed up the search for a specific value
    emailIndex: index("emailIndex").on(table.email),
  })
);

// one to one relationship
export const UserPreferencesTable = pgTable("userPreferences", {
  // id is a universally unique identifier automatically generated
  id: uuid("id").primaryKey().defaultRandom(),
  // boolean is a true or false value
  emailUpdates: boolean("emailUpdates").default(false).notNull(),
  // userId is a foreign key that references the id of the user table
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
});

// one to many relationship
export const PostTable = pgTable("posts", {
  //id is a universally unique identifier automatically generated
  id: uuid("id").primaryKey().defaultRandom(),
  //varchar is a variable character string
  title: varchar("title", { length: 255 }).notNull(),
  // real is a floating point number
  averageRating: real("averageRating").notNull().default(0),
  // timestamp with default value of now
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable("category", {
  //id is a universally unique identifier automatically generated
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

// many to many relationship
export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postIf")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => ({
    // composite primary key setup
    pk: primaryKey({ columns: [table.postId, table.categoryId] }),
  })
);

// RELATIONSHIP MAPPING

export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  preferences: one(UserPreferencesTable),
  posts: many(PostTable),
}));

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserPreferencesTable.userId],
      references: [UserTable.id],
    }),
  })
);

export const PostTableRelations = relations(PostTable, ({ one, many }) => ({
  author: one(UserTable, {
    fields: [PostTable.authorId],
    references: [UserTable.id],
  }),
  postCategory: many(CategoryTable),
}));

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => ({
  postCategory: many(PostCategoryTable),
}));

export const PostCategoryTableRelations = relations(
  PostCategoryTable,
  ({ one }) => ({
    post: one(PostTable, {
      fields: [PostCategoryTable.postId],
      references: [PostTable.id],
    }),
    category: one(CategoryTable, {
      fields: [PostCategoryTable.categoryId],
      references: [CategoryTable.id],
    }),
  })
);
