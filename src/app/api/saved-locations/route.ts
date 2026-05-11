import { NextResponse } from "next/server";
import db, { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const result = await db.execute(
    "SELECT * FROM saved_locations ORDER BY createdAt DESC"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  await initDb();
  const { label, sublabel, lat, lng } = await req.json();

  const existing = await db.execute({
    sql: "SELECT * FROM saved_locations WHERE label = ? AND sublabel IS ?",
    args: [label, sublabel ?? null],
  });

  if (existing.rows.length) {
    return NextResponse.json(existing.rows[0]);
  }

  const result = await db.execute({
    sql: "INSERT INTO saved_locations (label, sublabel, lat, lng) VALUES (?, ?, ?, ?)",
    args: [label, sublabel ?? null, lat ?? null, lng ?? null],
  });

  const created = await db.execute({
    sql: "SELECT * FROM saved_locations WHERE id = ?",
    args: [result.lastInsertRowid],
  });

  return NextResponse.json(created.rows[0], { status: 201 });
}