import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status !== "OK" || !data.results?.length) {
      // Fallback to coordinates
      return NextResponse.json({
        label: `${parseFloat(lat).toFixed(5)}, ${parseFloat(lng).toFixed(5)}`,
        sublabel: "Current Location",
      });
    }

    const result = data.results[0];
    const components: { types: string[]; long_name: string; short_name: string }[] =
      result.address_components ?? [];

    // Extract meaningful parts from address components
    const get = (type: string) =>
      components.find((c) => c.types.includes(type))?.long_name ?? "";

    const neighborhood = get("neighborhood") || get("sublocality_level_1") || get("sublocality");
    const locality     = get("locality") || get("postal_town");
    const area         = get("administrative_area_level_2");
    const region       = get("administrative_area_level_1");
    const country      = get("country");

    // label = most specific named place (neighborhood or locality)
    const label = neighborhood || locality || area || region || result.formatted_address;

    // sublabel = broader context without repeating the label
    const sublabelParts = [
      neighborhood && locality !== label ? locality : null,
      area && area !== label && area !== locality ? area : null,
      country,
    ].filter(Boolean);

    const sublabel = sublabelParts.length > 0 ? sublabelParts.join(", ") : undefined;

    return NextResponse.json({ label, sublabel });
  } catch {
    return NextResponse.json(
      {
        label: `${parseFloat(lat).toFixed(5)}, ${parseFloat(lng).toFixed(5)}`,
        sublabel: "Current Location",
      },
      { status: 200 }
    );
  }
}
