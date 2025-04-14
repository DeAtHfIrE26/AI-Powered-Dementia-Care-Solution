# Database Management

This project uses [NeonDB](https://neon.tech/) for PostgreSQL database hosting, [Drizzle ORM](https://orm.drizzle.team/) for database interactions, and [drizzle-kit](https://orm.drizzle.team/kit-docs/overview) for schema management.

## Database Schema

The database schema is defined in the `shared/schema.ts` file. Currently, it includes the following tables:

### Users Table

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});
```

### Contact Submissions Table

```typescript
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  message: text("message"),
  joinWaitlist: boolean("join_waitlist").default(false),
  createdAt: text("created_at").notNull(),
});
```

## Schema Management

### Updating the Schema

To modify the database schema:

1. Edit the schema definitions in `shared/schema.ts`
2. Run the following command to apply changes to the database:

```bash
npm run db:push
```

This will use the Drizzle Kit to push schema changes to your database.

### Verification

You can verify the database connection and schema with:

```bash
npm run verify-db
```

## Database Configuration

The database connection is configured in `server/db.ts` using the `DATABASE_URL` environment variable.

### Connection String Format

The connection string format for NeonDB is:

```
postgresql://user:password@hostname:port/database?sslmode=require
```

Make sure to set this properly in your `.env` file.

## Schema Validation

The application uses Zod for schema validation, with schemas derived from the database schema:

```typescript
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions)
  .omit({ id: true, createdAt: true });
```

This ensures that data is validated before being inserted into the database.

## Database Storage Implementation

Database operations are implemented in `server/storage.ts` through the `DatabaseStorage` class, which provides methods for interacting with the database.

Example operation:

```typescript
async createContactSubmission(submission: InsertContact & { createdAt: string }): Promise<ContactSubmission> {
  const [contactSubmission] = await db
    .insert(contactSubmissions)
    .values(submission)
    .returning();
  return contactSubmission;
}
``` 