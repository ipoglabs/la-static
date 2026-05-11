import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS saved_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      sublabel TEXT,
      lat REAL,
      lng REAL,
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);
}

export default db;