// JourneyCardMinimal.jsx
"use client";

import React from "react";

/**
 * JourneyCardMinimal.jsx
 * A simplified, inline-styled card showing only route info (no animations/map).
 * Full width, as requested.
 *
 * Props:
 * - originLabel      string
 * - destLabel        string
 * - distanceText     string (e.g. "3.5 km")
 * - durationText     string (e.g. "10 mins")
 * - onEditPickup     () => void
 * - onEditDropoff    () => void
 * - onSwap           () => void
 */
export default function JourneyCardMinimal({
  originLabel = "OL8",
  destLabel = "OL9",
  distanceText = "3.5 KM",
  durationText = "10 MINS",
  onEditPickup,
  onEditDropoff,
  onSwap,
}) {
  const S = {
    card: {
      borderRadius: 16,
      border: "1px solid #eef0f3",
      background: "#fff",
      padding: 18,
      boxShadow:
        "0 10px 20px rgba(17,24,39,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
      width: "100%", // Full width
      boxSizing: "border-box", 
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: "#1f2937",
      letterSpacing: "-0.01em",
    },
    statPill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 14,
      border: "1px solid #ff7a45",
      backgroundColor: "#fffaf7",
      color: "#ff7a45",
      fontWeight: 700,
      fontSize: 14,
      textTransform: "uppercase", // Apply uppercase to the pill text
    },
    statIcon: {
      lineHeight: 1,
      color: "#ff7a45",
    },
    bullet: {
      opacity: 0.5,
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      gap: 14,
      alignItems: "stretch",
      marginTop: 6,
    },
    chip: {
      all: "unset", 
      boxSizing: "border-box",
      borderRadius: 14,
      border: "1px dashed #dfe4ea",
      padding: 14,
      minHeight: 72,
      display: "grid",
      alignContent: "center",
      gap: 4,
      cursor: "pointer",
      background:
        "linear-gradient(180deg, rgba(250,251,252,0.9), rgba(250,251,252,0.6))",
      textAlign: "left", 
      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    },
    chipTitle: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#6b7280",
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontWeight: 700,
    },
    chipValue: {
      fontSize: 20,
      fontWeight: 800,
      color: "#111827",
      letterSpacing: "-0.02em",
      wordBreak: "break-word",
      textTransform: "uppercase", // Crucial change: apply uppercase to the value
    },
    swapButton: {
      all: "unset", 
      boxSizing: "border-box",
      width: 44,
      height: 44,
      borderRadius: 12,
      border: "1px solid #e6e8ec",
      background:
        "linear-gradient(180deg,#fff,rgba(255,255,255,0.8)) padding-box, linear-gradient(180deg,#e6e8ec,#dfe3e8) border-box",
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
      alignSelf: "center",
      justifySelf: "center",
      transition: "transform .12s ease",
      color: "#6b7280",
    },
  };

  return (
    <div style={S.card}>
      <style>{`
        .jc-chip-hover:hover {
            border-color: #1b85e0;
            box-shadow: 0 0 0 3px rgba(27, 133, 224, 0.1);
        }
        .jc-swap-active:active {
            transform: scale(0.96);
        }
      `}</style>

      {/* HEADER */}
      <div style={S.header}>
        <div style={S.title}>Your Route</div>
        <div style={S.statPill}>
          <span style={S.statIcon}>
            {/* Clock icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          {/* Stat pill text is uppercase via S.statPill style */}
          <span>{durationText}</span>
          <span style={S.bullet}>•</span>
          <span>{distanceText}</span>
        </div>
      </div>

      {/* CHIPS + SWAP */}
      <div style={S.row}>
        <button
          type="button"
          onClick={onEditPickup}
          aria-label="Edit pickup"
          style={S.chip}
          className="jc-chip-hover"
        >
          <div style={S.chipTitle}>
            <span>🚩 PICKUP</span>
          </div>
          {/* Chip value is uppercase via S.chipValue style */}
          <div style={S.chipValue}>{originLabel}</div>
        </button>

        <button
          type="button"
          title="Swap pickup & destination"
          aria-label="Swap"
          onClick={onSwap}
          style={S.swapButton}
          className="jc-swap-active"
        >
          {/* Swap icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onEditDropoff}
          aria-label="Edit destination"
          style={S.chip}
          className="jc-chip-hover"
        >
          <div style={S.chipTitle}>
            <span>📍 DESTINATION</span>
          </div>
          {/* Chip value is uppercase via S.chipValue style */}
          <div style={S.chipValue}>{destLabel}</div>
        </button>
      </div>
    </div>
  );
}