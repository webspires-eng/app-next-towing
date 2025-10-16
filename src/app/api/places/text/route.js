export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { query, location, radius, sessiontoken } = await req.json();
    if (!query) return new Response(JSON.stringify({ error: "Missing query" }), { status: 400 });

    const params = new URLSearchParams({
      query,
      key: process.env.GOOGLE_MAPS_SERVER_KEY,
      region: "uk",
      radius: String(radius || 500000)
    });

    if (location && typeof location.lat === "number" && typeof location.lng === "number") {
      params.set("location", `${location.lat},${location.lng}`);
    }
    if (sessiontoken) params.set("sessiontoken", sessiontoken);

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`;
    const res = await fetch(url);
    const json = await res.json();

    if (json.status !== "OK" && json.status !== "ZERO_RESULTS") {
      return new Response(JSON.stringify({ error: json.status, body: json.error_message }), { status: 400 });
    }

    return new Response(JSON.stringify(json), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: e.message }), { status: 500 });
  }
}
