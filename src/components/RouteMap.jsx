"use client";

import { useEffect, useRef } from "react";

/**
 * origin / destination can be:
 *  - a { lat, lng } object
 *  - or a string (postcode / address)
 *
 * onLeg(leg) is called with { distanceText, durationText } from first route.
 */
export default function RouteMap({ origin, destination, onLeg, compact = true }) {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const dirSvc = useRef(null);
  const dirRen = useRef(null);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  // ---- tiny helpers ----
  const g = () => (typeof window !== "undefined" ? window.google : undefined);

  const toLatLng = (val) => {
    const google = g();
    if (!google) return null;
    if (!val) return null;
    if (typeof val === "string") return val; // let DirectionsService geocode it
    if (typeof val.lat === "number" && typeof val.lng === "number") {
      return new google.maps.LatLng(val.lat, val.lng);
    }
    return null;
  };

  // ---- init map once ----
  useEffect(() => {
    const google = g();
    if (!google || !mapEl.current || mapRef.current) return;

    mapRef.current = new google.maps.Map(mapEl.current, {
      center: { lat: 53.4808, lng: -2.2426 }, // Manchester
      zoom: 11,
      gestureHandling: "greedy",
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
      styles: MAP_STYLE_REFERENCE, // 👈 styled like your screenshot
    });

    dirSvc.current = new google.maps.DirectionsService();
    dirRen.current = new google.maps.DirectionsRenderer({
      map: mapRef.current,
      preserveViewport: true,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#1E66F5", // rich blue
        strokeOpacity: 0.95,
        strokeWeight: 5,
      },
    });
  }, []);

  // ---- re-route when inputs change ----
  useEffect(() => {
    const google = g();
    if (!google || !dirSvc.current || !dirRen.current) return;

    const o = toLatLng(origin);
    const d = toLatLng(destination);
    if (!o || !d) return;

    dirSvc.current.route(
      {
        origin: o,
        destination: d,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      },
      (res, status) => {
        if (status !== "OK" || !res?.routes?.[0]) return;

        const route = res.routes[0];
        const leg = route.legs?.[0];
        dirRen.current.setDirections(res);

        // fit bounds
        const bounds = new google.maps.LatLngBounds();
        route.overview_path.forEach((p) => bounds.extend(p));
        mapRef.current.fitBounds(bounds, 40);

        // place pretty markers
        placeMarkers(leg?.start_location, leg?.end_location);

        if (leg && onLeg) {
          onLeg({ distanceText: leg.distance?.text, durationText: leg.duration?.text });
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  // ---- helpers: markers ----
  function placeMarkers(startLL, endLL) {
    const google = g();
    if (!google || !mapRef.current) return;

    // Start: small black flag (like screenshot)
    if (!startMarker.current) {
      startMarker.current = new google.maps.Marker({
        map: mapRef.current,
        clickable: false,
        zIndex: 10,
        icon: FLAG_ICON,
      });
    }
    startMarker.current.setPosition(startLL);

    // End: red pin with golden dot (like screenshot)
    if (!endMarker.current) {
      endMarker.current = new google.maps.Marker({
        map: mapRef.current,
        clickable: false,
        zIndex: 20,
        icon: PIN_ICON,
      });
    }
    endMarker.current.setPosition(endLL);
  }

  return <div ref={mapEl} className={`route-map ${compact ? "route-map--compact" : ""}`} />;
}

/* ---------- Map style to match your reference (clean, desaturated, POIs off) ---------- */
const MAP_STYLE_REFERENCE = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  {
    elementType: "geometry",
    stylers: [{ saturation: -50 }, { lightness: 15 }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "water",
    stylers: [{ saturation: -20 }, { lightness: 10 }],
  },
];

/* ---------- SVG marker icons (flag + pin) ---------- */
const FLAG_ICON = {
  url:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg width="26" height="40" viewBox="0 0 26 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 38 V8" stroke="#111" stroke-width="2" />
        <path d="M5 9 L5 3 L20 3 L17 9 L5 9 Z" fill="#111" stroke="#111" stroke-width="2"/>
      </svg>
    `),
  anchor: { x: 5, y: 38 },
  scaledSize: { width: 26, height: 40 },
};

const PIN_ICON = {
  url:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg width="36" height="48" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="s" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="rgba(0,0,0,.25)"/>
          </filter>
        </defs>
        <g filter="url(#s)">
          <path d="M18 2 C26 2 33 8 33 16 C33 26 22 36 18 46 C14 36 3 26 3 16 C3 8 10 2 18 2 Z"
                fill="#EB4B3D"/>
          <circle cx="18" cy="16" r="7" fill="#fff"/>
          <circle cx="18" cy="40" r="6" fill="#F59E0B"/>
        </g>
      </svg>
    `),
  anchor: { x: 18, y: 44 },
  scaledSize: { width: 36, height: 48 },
};
