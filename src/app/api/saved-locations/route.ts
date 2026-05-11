import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const locations = db.prepare(
    "SELECT * FROM saved_locations ORDER BY createdAt DESC"
  ).all();
  return NextResponse.json(locations);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { label, sublabel, lat, lng } = body;

  const existing = db.prepare(
    "SELECT * FROM saved_locations WHERE label = ? AND sublabel IS ?"
  ).get(label, sublabel ?? null);

  if (existing) {
    return NextResponse.json(existing);
  }

  const result = db.prepare(
    "INSERT INTO saved_locations (label, sublabel, lat, lng) VALUES (?, ?, ?, ?)"
  ).run(label, sublabel ?? null, lat ?? null, lng ?? null);

  const created = db.prepare(
    "SELECT * FROM saved_locations WHERE id = ?"
  ).get(result.lastInsertRowid);

  return NextResponse.json(created, { status: 201 });
}