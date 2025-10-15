"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function BookingModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus first field when opened
  useEffect(() => {
    if (open) setTimeout(() => firstFieldRef.current?.focus(), 50);
  }, [open]);

  if (!open) return null;

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: send to your endpoint (email, db, etc.)
    // Example: await fetch("/api/booking", { method:"POST", body: new FormData(e.currentTarget) })
    await new Promise((r) => setTimeout(r, 800)); // fake delay

    setSubmitting(false);
    setSent(true);
    setTimeout(() => onClose?.(), 900);
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
      >
        <header className="modal-head">
          <h3 id="booking-title" className="modal-title">Request Towing / Car Recovery</h3>
          <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
        </header>

        <form className="modal-body" onSubmit={onSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input ref={firstFieldRef} name="name" type="text" className="input" placeholder="Name" />
            </label>

            <label className="field">
              <span>Phone <b>*</b></span>
              <input name="phone" type="tel" required className="input" placeholder="Phone" />
            </label>

            <label className="field">
              <span>Email <b>*</b></span>
              <input name="email" type="email" required className="input" placeholder="Email" />
            </label>

            <label className="field">
              <span>Car Registration <b>*</b></span>
              <input name="carReg" type="text" required className="input" placeholder="Car Registration" />
            </label>

            <label className="field">
              <span>Pick up location/postcode <b>*</b></span>
              <input name="pickup" type="text" required className="input" placeholder="Pick up location/postcode" />
            </label>

            <label className="field">
              <span>Drop off location/postcode <b>*</b></span>
              <input name="dropoff" type="text" required className="input" placeholder="Drop off location/postcode" />
            </label>

            <label className="field">
              <span>Date <b>*</b></span>
              <input name="date" type="date" required className="input" />
            </label>

            <label className="field">
              <span>Time <b>*</b></span>
              <input name="time" type="time" required className="input" />
            </label>
          </div>

          <fieldset className="field" style={{marginTop:6}}>
            <legend className="legend">Is car rolling for loading? <b>*</b></legend>
            <div className="radios">
              <label><input type="radio" name="rolling" value="yes" required /> Yes</label>
              <label><input type="radio" name="rolling" value="no"  required /> No</label>
            </div>
          </fieldset>

          <label className="field">
            <span>Other Details</span>
            <textarea name="message" className="input" rows={5} placeholder="Any landmarks, vehicle issues, special instructions…" />
          </label>

          <div className="modal-foot">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button className="btn" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : sent ? "Sent!" : "Send Message"}
            </button>
          </div>

          <p className="muted" style={{marginTop:8, fontSize:12}}>
            Need urgent help? Call us now: <Link className="link-inline" href="tel:+440000000000">+44 0000 000000</Link>
          </p>
        </form>
      </div>
    </>
  );
}
