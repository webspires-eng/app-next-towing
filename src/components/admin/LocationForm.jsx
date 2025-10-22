'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const defaultData = Object.freeze({
  name: "",
  slug: "",
  type: "CITY",
});

export default function LocationForm({
  action,
  headline,
  subheading,
  backHref,
  submitLabel,
  initialData,
  locationId,
}) {
  const data = useMemo(() => ({ ...defaultData, ...(initialData || {}) }), [initialData]);
  const [name, setName] = useState(data.name);
  const [slug, setSlug] = useState(data.slug);
  const [autoSlug, setAutoSlug] = useState(!data.slug);
  const [type, setType] = useState(data.type || "CITY");

  useEffect(() => {
    if (autoSlug) {
      setSlug(slugify(name));
    }
  }, [name, autoSlug]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (autoSlug) {
      setSlug(slugify(value));
    }
  };

  const handleSlugChange = (event) => {
    setSlug(slugify(event.target.value));
    setAutoSlug(false);
  };

  const handleSlugBlur = () => {
    setSlug((current) => slugify(current));
  };

  return (
    <div className="grid gap-8">
      {(headline || subheading || backHref) && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            {headline && <h1 className="text-3xl font-semibold text-[#0E172B]">{headline}</h1>}
            {subheading && <p className="text-sm text-[#0E172B]/60">{subheading}</p>}
          </div>
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
            >
              ← Back to locations
            </Link>
          )}
        </div>
      )}

      <form
        action={action}
        className="grid gap-6 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg max-w-3xl"
      >
        {locationId && <input type="hidden" name="id" value={locationId} />}

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#0E172B]">Name</span>
            <input
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              className="input bg-white"
              placeholder="Manchester"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-sm font-semibold text-[#0E172B]">
              Slug
              {autoSlug ? (
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0E172B]/40">auto</span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugify(name));
                    setAutoSlug(true);
                  }}
                  className="text-xs font-semibold text-[#0E172B]/60 hover:text-[#0E172B]"
                >
                  Reset
                </button>
              )}
            </span>
            <input
              name="slug"
              value={slug}
              onChange={handleSlugChange}
              onBlur={handleSlugBlur}
              className="input bg-white font-mono text-sm tracking-wide"
              placeholder="manchester"
            />
            <span className="text-xs text-[#0E172B]/50">Used in URLs and landing pages.</span>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-[#0E172B]">Location type</span>
          <select
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="input bg-white"
          >
            <option value="CITY">City / Town</option>
            <option value="MOTORWAY">Motorway / Route</option>
          </select>
        </label>

        <div className="flex items-center justify-end gap-3">
          <Link
            href={backHref || "/dashboard/locations"}
            className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(250,204,20,0.45)] transition hover:bg-[#ffe05a]"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
