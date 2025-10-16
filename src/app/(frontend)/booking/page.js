"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

// Google expects a global callback name in the URL (?callback=initGoogle)
if (typeof window !== "undefined") {
  window.initGoogle = () => {
    // no-op: just silences the console warning and ensures Maps is ready
  };
}

export default function BookingPage() {
  // step wizard
  const [step, setStep] = useState(1);

  // inputs + refs for Places Autocomplete
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [originLL, setOriginLL] = useState(null);   // {lat,lng}
  const [destLL, setDestLL] = useState(null);       // {lat,lng}

  // ETA from Distance Matrix
  const [eta, setEta] = useState(null); // { textDistance, textDuration }

  // "Use my location"
  const [usingGeo, setUsingGeo] = useState(false);

  // service choice
  const serviceChoices = useMemo(
    () => [
      "Vehicle Recovery",
      "Auction Collection",
      "Dealership Delivery",
      "Stuck Vehicle",
      "Impound Collection",
      "EU/International",
    ],
    []
  );
  const [service, setService] = useState(serviceChoices[0]);

  // Load Google Places on inputs
  useEffect(() => {
    if (!window.google?.maps?.places) return;

    const ac1 = new google.maps.places.Autocomplete(pickupRef.current, {
      fields: ["formatted_address", "geometry"],
      componentRestrictions: { country: ["gb"] },
    });
    ac1.addListener("place_changed", () => {
      const p = ac1.getPlace();
      setPickup(p.formatted_address || pickupRef.current.value);
      if (p.geometry?.location) {
        const ll = p.geometry.location;
        setOriginLL({ lat: ll.lat(), lng: ll.lng() });
      }
    });

    const ac2 = new google.maps.places.Autocomplete(dropoffRef.current, {
      fields: ["formatted_address", "geometry"],
      componentRestrictions: { country: ["gb"] },
    });
    ac2.addListener("place_changed", () => {
      const p = ac2.getPlace();
      setDropoff(p.formatted_address || dropoffRef.current.value);
      if (p.geometry?.location) {
        const ll = p.geometry.location;
        setDestLL({ lat: ll.lat(), lng: ll.lng() });
      }
    });
  }, []);

  // Server route -> Distance Matrix
  async function fetchEta(origin, destination) {
    const res = await fetch("/api/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination }),
    });
    if (!res.ok) {
      setEta(null);
      return;
    }
    const data = await res.json();
    setEta(data);
  }

  // Helper the effect can call
  function computeEta() {
    const origin = originLL ?? pickup;
    const destination = destLL ?? dropoff;
    if (!origin || !destination) return;
    fetchEta(origin, destination);
  }

  // Recompute when both sides are set
  useEffect(() => {
    if ((originLL || pickup) && (destLL || dropoff)) computeEta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originLL, destLL, pickup, dropoff]);

  function useMyLocation() {
    if (!("geolocation" in navigator)) return alert("Geolocation not supported in this browser.");
    setUsingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setPickup(value);
        setOriginLL({ lat: latitude, lng: longitude });
        setUsingGeo(false);
      },
      () => {
        setUsingGeo(false);
        alert("Could not fetch location.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  return (
    <>
      {/* Load Maps + Places (browser key) */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY}&libraries=places&loading=async&callback=initGoogle`}
        strategy="afterInteractive"
      />

      <main className="container-1300 page-pad">
        <header className="page-head">
          <h1 className="page-title">Booking</h1>
          <p className="muted">
            Tell us where the vehicle is and where it’s going — we’ll estimate time & distance instantly.
          </p>
        </header>

        {/* Stepper */}
        <ol className="stepper">
          <li className={`step ${step===1?"active":""}`}>Location & Service</li>
          <li className={`step ${step===2?"active":""}`}>Vehicle & Questions</li>
        </ol>

        <section className="card-xl" style={{ padding: 16 }}>
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <button className="btn btn-accent block" onClick={useMyLocation} disabled={usingGeo}>
                📍 {usingGeo ? "Finding your location…" : "Use My Location"}
              </button>

              <div className="field">
                <label className="label">Need a different pickup point?</label>
                <input
                  ref={pickupRef}
                  className="booking-input"
                  placeholder="Start typing your pickup location…"
                  defaultValue={pickup}
                  onBlur={(e)=>setPickup(e.currentTarget.value)}
                />
              </div>

              {/* Simple embedded map for preview */}
              <div className="map-box" aria-hidden="true">
                <iframe
                  title="map"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: 12 }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(pickup || "Manchester, UK")}&output=embed`}
                />
              </div>

              {/* distance/eta badge */}
              <div className="map-badge">
                <span className="pin">📍</span>
                <div>
                  <div className="bold">{eta?.textDistance ?? "—"}</div>
                  <div className="muted">{eta?.textDuration ?? "Set drop-off"}</div>
                </div>
              </div>

              <div className="confirm-box">
                {pickup ? `Is this your pickup spot? ${pickup}` : "Choose a pickup location."}
              </div>

              <div className="field">
                <label className="label">Where to deliver the vehicle?</label>
                <input
                  ref={dropoffRef}
                  className="booking-input"
                  placeholder="Start typing your destination…"
                  defaultValue={dropoff}
                  onBlur={(e)=>setDropoff(e.currentTarget.value)}
                />
              </div>

              <div className="field">
                <label className="label">What type of service do you need?</label>
                <div className="svc-grid">
                  {serviceChoices.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`svc-big ${service === s ? "active" : ""}`}
                      onClick={() => setService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="row end" style={{ marginTop: 12 }}>
                <Link className="btn btn-outline" href="/">Cancel</Link>
                <button
                  className="btn find-driver"
                  onClick={() => setStep(2)}
                  disabled={!pickup || !dropoff || !service}
                >
                  Find My Driver →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 (placeholder – plug your DVLA/vehicle questions here) */}
          {step === 2 && (
            <div>
              <h2 style={{marginTop:0}}>Vehicle & Recovery Details</h2>
              <p className="muted" style={{ marginTop: -4 }}>
                Continue with vehicle details (DVLA lookup, quick questions, notes). Submit to your API/DB or email.
              </p>

              <div className="row end" style={{ marginTop: 12 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn" onClick={() => alert("Submit to backend/email/DB here")}>Continue →</button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
