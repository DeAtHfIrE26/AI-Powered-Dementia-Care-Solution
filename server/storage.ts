import { 
  users, 
  contactSubmissions,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface remains the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContact & { createdAt: string }): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

// Now implementing with database
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission: InsertContact & { createdAt: string }): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
}

export const storage = new DatabaseStorage();
