import { Activity, Clock, Shield, Users, Wrench } from "lucide-react";

export const metadata = {
  title: "About Next Towing | 24/7 Vehicle Recovery Experts",
  description:
    "Learn how Next Towing delivers rapid 24/7 vehicle recovery across Greater Manchester with insured drivers, transparent pricing, and modern dispatch tech.",
};

const stats = [
  { label: "Vehicles recovered", value: "18,500+" },
  { label: "Average dispatch", value: "12 mins" },
  { label: "Customer rating", value: "4.8 / 5" },
  { label: "Trusted partners", value: "120+" },
];

const pillars = [
  {
    title: "Rapid Response",
    copy: "We operate 24/7 with on-call teams positioned around Greater Manchester for sub-hour arrivals.",
    Icon: Clock,
  },
  {
    title: "Certified & Insured",
    copy: "Fully PAS43 compliant with vetted drivers, specialist equipment, and public liability insurance.",
    Icon: Shield,
  },
  {
    title: "Human Support",
    copy: "Real coordinators follow every recovery with updates, ETA tracking, and aftercare guidance.",
    Icon: Users,
  },
  {
    title: "Repair First",
    copy: "Whenever possible we diagnose and repair roadside before towing to keep customers moving.",
    Icon: Wrench,
  },
];

const milestones = [
  {
    year: "2015",
    title: "Next Towing launches",
    detail:
      "Started with a single truck covering inner-city Manchester with the promise of transparent, fixed pricing.",
  },
  {
    year: "2018",
    title: "24/7 control centre",
    detail:
      "Opened our Salford dispatch hub and rolled out GPS tracking so customers receive accurate ETAs by SMS.",
  },
  {
    year: "2021",
    title: "Fleet expansion",
    detail:
      "Grew to a multi-vehicle fleet including heavy winch units, low loaders, and motorcycle recovery specialists.",
  },
  {
    year: "2023",
    title: "Trusted by partners",
    detail:
      "Signed long-term roadside assistance contracts with insurers, dealerships, and national breakdown clubs.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative flex justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_60%)]" />
        <div className="container-1300 relative z-10 w-full px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Our Story
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Built for drivers who need help <span className="text-yellow-300">right now</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Next Towing was founded to make emergency vehicle recovery feel human, fast, and transparent.
                From first contact to safe drop-off, we pair experienced recovery specialists with live dispatch
                technology so you always know what is happening.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.45)]"
                  >
                    <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                    <div className="mt-2 text-sm uppercase tracking-[0.15em] text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-yellow-300" />
                <p className="text-sm uppercase tracking-[0.18em] text-white/60">24/7 Control Centre</p>
              </div>
              <p className="mt-6 text-lg text-white/80">
                Every recovery begins with our dispatch team who triage jobs, assign the nearest unit, and share live
                ETAs. Our coordinators remain on the line until you are safely on the move again.
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">Coverage</p>
                  <p className="mt-2 text-white/70">Greater Manchester • Cheshire • Lancashire motorway network</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">Fleet</p>
                  <p className="mt-2 text-white/70">Low loaders, winch trucks, incident response vans, EV-ready support</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">Guarantee</p>
                  <p className="mt-2 text-white/70">Fixed upfront pricing with zero call-out surprises</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center border-t border-white/10 bg-neutral-950/80 py-20">
        <div className="container-1300 w-full px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              What drives us
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Principles behind every call-out</h2>
            <p className="mt-4 text-white/70">
              People remember how we made them feel on their worst day. These pillars keep our standards high whether
              you are stranded at home, the office, or the M60.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(({ title, copy, Icon }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_14px_36px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400/15">
                  <Icon className="h-6 w-6 text-yellow-300" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center bg-black py-20">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-12 lg:grid-cols-[0.85fr,1.15fr]">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Milestones
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From one truck to a rapid-response fleet</h2>
              <p className="mt-4 text-white/70">
                We invest in people, training, and equipment so our customers never feel left behind. Here is how the
                journey unfolded.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-yellow-300/60 to-transparent lg:block" />
              <ol className="space-y-6">
                {milestones.map((milestone) => (
                  <li
                    key={milestone.year}
                    className="relative rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.45)] lg:pl-20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/15 text-sm font-semibold text-yellow-300">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-white/70">{milestone.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center border-t border-white/10 bg-neutral-950/80 py-20">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr,0.9fr]">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Always-on support
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready when the unexpected happens</h2>
              <p className="mt-4 text-white/70">
                Whether you are stuck in a multi-storey car park or need motorway recovery at 3&nbsp;AM, our
                coordinators line up the right specialist and keep you informed. No scripts—just experienced people
                solving real problems fast.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+440000000000"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
                >
                  Call our control centre
                </a>
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                >
                  Book online in minutes
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {["Live job tracking", "Specialist EV tooling", "Approved partner network", "In-house training academy"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-5"
                  >
                    <span className="text-white/80">{item}</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">Included</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
