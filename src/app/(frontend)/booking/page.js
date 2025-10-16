"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import VehicleSummary from "@/components/VehicleSummary";
// import RouteMap from "@/components/RouteMap"; // not used now
import CreativeRouteCard, { staticMapUrlFrom } from "@/components/CreativeRouteCard";
import JourneyCard from "@/components/JourneyCard";


// Google expects a global callback name in the URL (?callback=initGoogle)
if (typeof window !== "undefined") {
  window.initGoogle = () => {
    // no-op: silences the console warning and ensures Maps is ready
  };
}

/** Turn DVLA response into a friendly error card */
function formatDvlaError(payload) {
  const e = payload?.errors?.[0];
  if (e) {
    return {
      heading: e.title || "Bad Request",
      detail:
        e.detail ||
        "We couldn’t validate that registration. Double-check the format and try again.",
      code: e.code || e.status || "400",
    };
  }
  return {
    heading: "Lookup failed",
    detail:
      payload?.message ||
      payload?.error ||
      "Something went wrong talking to DVLA. Please try again.",
    code: "ERR",
  };
}

export default function BookingPage() {
  // ---------- Step wizard ----------
  const [step, setStep] = useState(1); // 1 | 2 | 3

  // ---------- Step 1: locations & service ----------
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [originLL, setOriginLL] = useState(null); // {lat,lng}
  const [destLL, setDestLL] = useState(null);     // {lat,lng}
  const [eta, setEta] = useState(null);           // { textDistance, textDuration }
  const [usingGeo, setUsingGeo] = useState(false);

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

  // Distance Matrix (calls your /api/distance)
  function computeEta() {
    const origin = originLL ?? pickup;
    const destination = destLL ?? dropoff;
    if (!origin || !destination) return;
    fetchEta(origin, destination);
  }

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

  // ---------- Step 2: DVLA lookup ----------
  const [vrmInput, setVrmInput] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [dvlaError, setDvlaError] = useState(null); // { heading, detail, code } | null

  async function handleLookup() {
    setDvlaError(null);
    setVehicle(null);

    const raw = vrmInput.trim();
    if (!raw) {
      setDvlaError({
        heading: "Missing VRM",
        detail: "Please enter a registration number (e.g. OO07 HAD).",
        code: "EMPTY",
      });
      return;
    }

    const res = await fetch("/api/dvla/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vrm: raw }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      setDvlaError({
        heading: "Invalid response",
        detail: "DVLA returned an unexpected response. Please try again.",
        code: "PARSE",
      });
      return;
    }

    if (!res.ok) {
      setDvlaError(formatDvlaError(data));
      return;
    }

    setVehicle(data);
  }

  // ---------- Step 3: confirm/contact ----------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    // TODO: send to your backend/email/DB
    alert(
      JSON.stringify(
        {
          pickup,
          dropoff,
          service,
          eta,
          vrm: vrmInput,
          vehicle,
          name,
          phone,
          email,
          notes,
        },
        null,
        2
      )
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
          <li className={`step ${step === 1 ? "active" : ""}`}>Location & Service</li>
          <li className={`step ${step === 2 ? "active" : ""}`}>Vehicle Details</li>
          <li className={`step ${step === 3 ? "active" : ""}`}>Confirm & Contact</li>
        </ol>

        <section className="card-xl" style={{ padding: 16 }}>
          {/* ---------- STEP 1 ---------- */}
          {step === 1 && (
  <div>
    {/* ...Use My Location button... */}

    <div className="field">
      <label className="label">Need a different pickup point?</label>
      <input
        ref={pickupRef}
        className="booking-input"
        placeholder="Start typing your pickup location…"
        defaultValue={pickup}
        onBlur={(e) => setPickup(e.currentTarget.value)}
      />
    </div>

    {/* INSERT HERE */}


                <JourneyCard
      originLabel={pickup || "Pickup"}
      destLabel={dropoff || "Destination"}
      distanceText={eta?.textDistance || "—"}
      durationText={eta?.textDuration || "—"}
      onEditPickup={() => pickupRef.current?.focus()}
      onEditDropoff={() => dropoffRef.current?.focus()}
      onSwap={() => {
        setPickup((p) => {
          const next = dropoff;
          setDropoff(p);
          setOriginLL((o) => {
            const d = destLL;
            setDestLL(o);
            return d;
          });
          return next;
        });
      }}
      // loading={!eta && (pickup || originLL) && (dropoff || destLL)}
    />


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
                  onBlur={(e) => setDropoff(e.currentTarget.value)}
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
                <Link className="btn btn-outline" href="/">
                  Cancel
                </Link>
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

          {/* ---------- STEP 2 ---------- */}
          {step === 2 && (
            <div>
              <h2 style={{ marginTop: 0 }}>Vehicle Details</h2>
              <p className="muted">Enter your vehicle registration below to auto-fill DVLA details.</p>

              <div className="row" style={{ gap: 8 }}>
                <div className="field" style={{ flex: 1 }}>
                  <label className="label">Vehicle registration</label>
                  <input
                    className={`booking-input ${dvlaError ? "input-error" : ""}`}
                    placeholder="e.g. OO07 HAD"
                    value={vrmInput}
                    onChange={(e) => setVrmInput(e.target.value.toUpperCase())}
                  />

                  {/* Pretty DVLA error card */}
                  {dvlaError && (
                    <div className="alert alert-error" role="alert" aria-live="polite">
                      <div className="alert-icon">⚠️</div>
                      <div className="alert-content">
                        <div className="alert-heading">
                          {dvlaError.heading}
                          {dvlaError.code && <span className="alert-tag">Code {dvlaError.code}</span>}
                        </div>
                        <p className="alert-text">{dvlaError.detail}</p>
                        <ul className="alert-hints">
                          <li>
                            Use standard UK format (e.g. <strong>OO07 HAD</strong>).
                          </li>
                          <li>
                            Try without space: <code>OO07HAD</code> or with a space: <code>OO07 HAD</code>.
                          </li>
                          <li>Private or very new plates may not return details yet.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ alignSelf: "end" }}>
                  <button className="btn" onClick={handleLookup}>
                    Lookup
                  </button>
                </div>
              </div>

              {/* Vehicle summary card */}
              {vehicle && <VehicleSummary data={vehicle} />}

              <div className="row end" style={{ marginTop: 12 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  className="btn"
                  onClick={() => setStep(3)}
                  disabled={!vehicle}
                  title={!vehicle ? "Lookup a valid VRM first" : ""}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ---------- STEP 3 ---------- */}
          {step === 3 && (
            <div>
              <h2 style={{ marginTop: 0 }}>Confirm & Contact</h2>
              <p className="muted">We’ll use these details to confirm your booking.</p>

              <div className="grid-2" style={{ marginTop: 12 }}>
                <div className="field">
                  <label className="label">Name</label>
                  <input className="booking-input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                  <label className="label">Phone</label>
                  <input className="booking-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <input className="booking-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label className="label">Notes</label>
                  <textarea
                    className="booking-input"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="row end" style={{ marginTop: 12 }}>
                <button className="btn btn-outline" onClick={() => setStep(2)}>
                  Back
                </button>
                <button className="btn" onClick={handleSubmit}>
                  Submit Booking →
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
