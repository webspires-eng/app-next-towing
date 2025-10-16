// src/app/api/routes/compute/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { origin, destination } = await req.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "origin and destination are required" },
        { status: 400 }
      );
    }

    // Accept either strings ("lat,lng" or place text) or {lat,lng}
    const toWaypoint = (val) =>
      typeof val === "string"
        ? { location: { latLng: parseLatLng(val) ?? { address: val } } }
        : { location: { latLng: val } };

    const body = {
      origin: toWaypoint(origin),
      destination: toWaypoint(destination),
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      polylineEncoding: "ENCODED_POLYLINE",
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      languageCode: "en-GB",
      units: "METRIC",
    };

    const res = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_SERVER_KEY,
          // Ask only for what we need
          "X-Goog-FieldMask":
            "routes.distanceMeters,routes.duration," +
            "routes.polyline.encodedPolyline,routes.legs.startLocation," +
            "routes.legs.endLocation",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: txt }, { status: res.status });
    }

    const data = await res.json();
    const route = data.routes?.[0];
    if (!route) {
      return NextResponse.json({ error: "No route found" }, { status: 404 });
    }

    return NextResponse.json({
      distanceMeters: route.distanceMeters,
      duration: route.duration, // e.g. "2040s"
      encodedPolyline: route.polyline?.encodedPolyline ?? null,
      legStart: route.legs?.[0]?.startLocation?.latLng ?? null,
      legEnd:
        route.legs?.[route.legs.length - 1]?.endLocation?.latLng ?? null,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

function parseLatLng(s) {
  // "53.4808,-2.2426" → {lat: 53.48, lng: -2.24}
  const m = /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/.exec(String(s));
  if (!m) return null;
  return { latitude: Number(m[1]), longitude: Number(m[3]) };
}
