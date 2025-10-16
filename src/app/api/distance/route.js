export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { origin, destination } = await req.json();
    if (!origin || !destination) {
      return new Response(JSON.stringify({ error: "Missing origin/destination" }), { status: 400 });
    }

    const params = new URLSearchParams({
      origins: typeof origin === "string" ? origin : `${origin.lat},${origin.lng}`,
      destinations: typeof destination === "string" ? destination : `${destination.lat},${destination.lng}`,
      key: process.env.GOOGLE_MAPS_SERVER_KEY,
      mode: "driving",
      units: "metric",
      region: "uk"
    });

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK") {
      return new Response(JSON.stringify({ error: json.status, body: json.error_message }), { status: 400 });
    }

    const row = json.rows?.[0]?.elements?.[0];
    if (!row || row.status !== "OK") {
      return new Response(JSON.stringify({ error: row?.status || "NO_ROUTE" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        meters: row.distance.value,
        seconds: row.duration.value,
        textDistance: row.distance.text,
        textDuration: row.duration.text
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: e.message }), { status: 500 });
  }
}
