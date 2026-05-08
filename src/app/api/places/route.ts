import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input") ?? "";

  if (!input.trim()) return NextResponse.json([]);

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}&language=en`,
    { cache: "no-store" }
  );

  const data = await res.json();

  console.log("STATUS:", data.status);
  console.log("ERROR:", data.error_message);

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    return NextResponse.json({ error: data.status, message: data.error_message }, { status: 500 });
  }

  const suggestions = (data.predictions ?? []).map((p: any) => ({
    label: p.structured_formatting.main_text,
    sublabel: p.structured_formatting.secondary_text,
    placeId: p.place_id,
  }));

  return NextResponse.json(suggestions);
}