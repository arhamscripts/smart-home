import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { user } from "@/lib/db/schema";

/**
 * UserProfile returned from the database (SELECT)
 */
export type User = InferSelectModel<typeof user>;

/**
 * Payload used when creating a user profile (INSERT)
 */
export type NewUser = InferInsertModel<typeof user>;
