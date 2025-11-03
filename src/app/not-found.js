import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yellow-300">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>
          <p className="mt-4 text-lg text-white/70">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
          >
            ← Back to Home
          </Link>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
          >
            Book a Service
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/services"
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:border-yellow-300/60 hover:bg-white/10"
          >
            <div className="text-2xl">🧰</div>
            <div className="mt-2 font-semibold">Our Services</div>
          </Link>
          <Link
            href="/areas"
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:border-yellow-300/60 hover:bg-white/10"
          >
            <div className="text-2xl">📍</div>
            <div className="mt-2 font-semibold">Coverage Areas</div>
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:border-yellow-300/60 hover:bg-white/10"
          >
            <div className="text-2xl">📞</div>
            <div className="mt-2 font-semibold">Contact Us</div>
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
