"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">Next Towing</h1>
          </Link>
          <p className="mt-2 text-sm text-white/60">Admin Panel Login</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-8 shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                role="alert"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 disabled:opacity-50"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 transition-colors focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-all hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-white/60 transition-colors hover:text-yellow-300"
            >
              ← Back to website
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          For security, only authorized administrators can access the dashboard.
        </p>
      </div>
    </div>
  );
}
