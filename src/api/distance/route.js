import { NextResponse } from "next/server";

export async function GET() {
  // quick health check: /api/distance
  return NextResponse.json({ ok: true });
}

export async function POST(req) {
  try {
    const { origin, destination } = await req.json();
    if (!origin || !destination) {
      return NextResponse.json({ error: "origin and destination required" }, { status: 400 });
    }

    const key =
      process.env.GOOGLE_MAPS_SERVER_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;

    if (!key) {
      return NextResponse.json({ error: "Missing GOOGLE_MAPS_SERVER_KEY" }, { status: 500 });
    }

    const fmt = (v) => (typeof v === "string" ? v : `${v.lat ?? v.latitude},${v.lng ?? v.longitude}`);

    const params = new URLSearchParams({
      origins: fmt(origin),
      destinations: fmt(destination),
      key,
      units: "imperial", // change to metric if you prefer
      region: "gb",
    });

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;

    const res = await fetch(url, { next: { revalidate: 0 } });
    const data = await res.json();

    const ok = data.status === "OK" && data.rows?.[0]?.elements?.[0]?.status === "OK";
    if (!ok) {
      return NextResponse.json({ error: "No route", raw: data }, { status: 400 });
    }

    const el = data.rows[0].elements[0];
    return NextResponse.json({
      distance: el.distance.value,      // meters
      duration: el.duration.value,      // seconds
      textDistance: el.distance.text,   // e.g. "2.1 mi"
      textDuration: el.duration.text,   // e.g. "11 mins"
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
