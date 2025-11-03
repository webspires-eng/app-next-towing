"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="mb-4 text-6xl">⚠️</div>
          <h1 className="text-4xl font-bold text-white">Something Went Wrong</h1>
          <p className="mt-4 text-lg text-white/70">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-300">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/50">
          Need immediate assistance? Call us at{" "}
          <a href="tel:+441234567890" className="text-yellow-300 hover:underline">
            +44 1234 567890
          </a>
        </p>
      </div>
    </div>
  );
}
