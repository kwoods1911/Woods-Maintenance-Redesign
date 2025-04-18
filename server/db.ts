import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";
import path from 'path';

// Create SQLite database in the root directory
const sqlite = new Database(path.resolve('./greenlawn.db'));

// Create Drizzle instance
export const db = drizzle(sqlite, { schema });