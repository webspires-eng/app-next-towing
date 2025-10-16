export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { origin, destination } = await req.json();
    if (!origin || !destination) {
      return new Response(JSON.stringify({ error: "Missing origin/destination" }), { status: 400 });
    }

    const params = new URLSearchParams({
      origin: typeof origin === "string" ? origin : `${origin.lat},${origin.lng}`,
      destination: typeof destination === "string" ? destination : `${destination.lat},${destination.lng}`,
      key: process.env.GOOGLE_MAPS_SERVER_KEY,
      mode: "driving",
      region: "uk",
      units: "metric"
    });

    // Using classic Directions API (easier with Maps JS DirectionsRenderer)
    const url = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK") {
      return new Response(JSON.stringify({ error: json.status, body: json.error_message }), { status: 400 });
    }

    const route = json.routes?.[0];
    const leg = route?.legs?.[0];

    return new Response(
      JSON.stringify({
        polyline: route.overview_polyline?.points || null,
        bounds: route.bounds || null,
        summary: route.summary || "",
        distanceText: leg?.distance?.text || "",
        durationText: leg?.duration?.text || "",
        startAddress: leg?.start_address || "",
        endAddress: leg?.end_address || ""
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: e.message }), { status: 500 });
  }
}
