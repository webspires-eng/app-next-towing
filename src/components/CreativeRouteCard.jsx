"use client";

import { useMemo } from "react";

/**
 * A creative, map-less route preview.
 * Props:
 * - originLabel: string
 * - destLabel: string
 * - distanceText: string (e.g., "14.0 miles")
 * - durationText: string (e.g., "34 min")
 * - staticMapUrl?: string (optional background texture)
 */
export default function CreativeRouteCard({
  originLabel = "Pickup",
  destLabel = "Destination",
  distanceText = "—",
  durationText = "—",
  staticMapUrl, // optional background texture
}) {
  // make a nice short label from long addresses
  const short = (s) =>
    (s || "")
      .replace(/, UK$/i, "")
      .replace(/, United Kingdom$/i, "")
      .replace(/\s{2,}/g, " ")
      .trim();

  const start = useMemo(() => short(originLabel), [originLabel]);
  const end = useMemo(() => short(destLabel), [destLabel]);

  return (
    <div className="route-card">
      {staticMapUrl && <div className="route-card__bg" style={{ backgroundImage: `url(${staticMapUrl})` }} />}

      {/* distance pill */}
      <div className="route-pill">
        <span className="route-pill__icon">📍</span>
        <div className="route-pill__text">
          <div className="route-pill__main">{distanceText}</div>
          <div className="route-pill__sub">{durationText}</div>
        </div>
      </div>

      <div className="route-row">
        {/* left side: pickup */}
        <div className="route-end">
          <div className="route-flag" aria-hidden="true" />
          <div className="route-label">
            <div className="route-label__kicker">Pickup</div>
            <div className="route-label__title" title={start}>{start || "—"}</div>
          </div>
        </div>

        {/* svg path */}
        <div className="route-svg">
          <svg viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rt-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E66F5" />
                <stop offset="100%" stopColor="#6CA8FF" />
              </linearGradient>
              <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(16,24,40,.15)" />
              </filter>
            </defs>

            {/* animated dashed line */}
            <path
              d="M10,70 C80,5 220,5 290,70"
              fill="none"
              stroke="url(#rt-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#soft)"
              strokeDasharray="8 10"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-180"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </path>

            {/* little glint moving along the path */}
            <circle r="5" fill="#ffffff" opacity="0.9">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                path="M10,70 C80,5 220,5 290,70"
              />
            </circle>
          </svg>
        </div>

        {/* right side: dropoff */}
        <div className="route-end route-end--right">
          <div className="route-label route-label--right">
            <div className="route-label__kicker">Destination</div>
            <div className="route-label__title" title={end}>{end || "—"}</div>
          </div>
          <div className="route-pin" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
