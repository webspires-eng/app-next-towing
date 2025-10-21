"use client";

import React from "react";

export default function JourneyCardMinimal({
  originLabel = "Pickup",
  destLabel = "Destination",
  distanceText = "—",
  durationText = "—",
  onEditPickup,
  onEditDropoff,
  onSwap,
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-5 text-white shadow-[0_20px_54px_rgba(0,0,0,0.45)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 60% at 0% 0%, rgba(250,204,21,0.15), transparent 60%), radial-gradient(120% 60% at 100% 100%, rgba(250,204,21,0.08), transparent 65%)",
        }}
      />
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="text-lg font-semibold">Your Route</div>
        <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200">
          <span>{durationText}</span>
          <span className="opacity-50">•</span>
          <span>{distanceText}</span>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-4">
        <button
          type="button"
          onClick={onEditPickup}
          className="group flex min-h-[84px] flex-col justify-center rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-left transition-colors hover:border-yellow-300/50 hover:bg-yellow-300/10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Pickup</span>
          <span className="mt-2 text-lg font-semibold text-white/90 group-hover:text-white">{originLabel}</span>
        </button>

        <button
          type="button"
          onClick={onSwap}
          title="Swap pickup & destination"
          aria-label="Swap"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition transform hover:-translate-y-0.5 hover:border-yellow-300/60 hover:bg-yellow-300/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-300"
          >
            <polyline points="16 3 21 8 16 13" />
            <line x1="21" y1="8" x2="9" y2="8" />
            <polyline points="8 21 3 16 8 11" />
            <line x1="15" y1="16" x2="3" y2="16" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onEditDropoff}
          className="group flex min-h-[84px] flex-col justify-center rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-right transition-colors hover:border-yellow-300/50 hover:bg-yellow-300/10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Destination</span>
          <span className="mt-2 text-lg font-semibold text-white/90 group-hover:text-white">{destLabel}</span>
        </button>
      </div>

      <div className="relative z-10 mt-8">
        <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="h-24 w-full">
          <defs>
            <linearGradient id="jc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(250,204,21,0.9)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0.4)" />
            </linearGradient>
          </defs>
          <path
            d="M10,70 C80,5 220,5 290,70"
            fill="none"
            stroke="url(#jc-grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 12"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="3.2s" repeatCount="indefinite" />
          </path>
          <circle r="5" fill="rgba(250,204,21,0.9)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M10,70 C80,5 220,5 290,70" />
          </circle>
        </svg>
      </div>
    </div>
  );
}
