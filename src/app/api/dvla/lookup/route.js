import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { vrm } = await req.json();

    if (!vrm || typeof vrm !== "string") {
      return NextResponse.json({ error: "Missing vrm" }, { status: 400 });
    }

    // Normalise: remove spaces and uppercase (DVLA requirement)
    const registrationNumber = vrm.replace(/\s+/g, "").toUpperCase();

    const url =
      process.env.DVLA_API_URL ||
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": process.env.DVLA_API_KEY, // <-- your key
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ registrationNumber }),
    });

    // DVLA returns JSON on success; on errors it can still be JSON,
    // but we’ll capture plain text just in case.
    const text = await res.text();
    if (!res.ok) {
      // Pass through DVLA’s message so you can see “Missing VRM”, “Forbidden”, etc.
      return NextResponse.json(
        { error: "DVLA lookup failed", status: res.status, body: text },
        { status: 502 }
      );
    }

    // Parse once we know it’s OK
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Lookup crashed", detail: String(err) },
      { status: 500 }
    );
  }
}
