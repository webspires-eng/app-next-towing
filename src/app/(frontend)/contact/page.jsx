import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact Next Towing | 24/7 Vehicle Recovery Support",
  description:
    "Speak with the Next Towing control centre any time of day. Call, email, or send a message for rapid vehicle recovery support across Greater Manchester.",
};

const contactOptions = [
  {
    Icon: Phone,
    title: "Emergency dispatch",
    value: "+44 0000 000000",
    href: "tel:+440000000000",
    blurb: "Fastest response. We answer within a few rings, collect key details, and deploy the nearest truck.",
  },
  {
    Icon: Mail,
    title: "Email our coordinators",
    value: "support@nexttowing.co.uk",
    href: "mailto:support@nexttowing.co.uk",
    blurb: "Share booking references, insurance paperwork, or planned transport requests.",
  },
  {
    Icon: MapPin,
    title: "Control centre",
    value: "Unit 12, Recovery Way, Salford, M5 3TT",
    blurb: "Visits by appointment only. Located 5 minutes from the M602 with secure vehicle storage.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative flex justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_55%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.08),transparent_65%)]" />
        <div className="container-1300 relative z-10 w-full px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                24/7 Support
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Talk with our <span className="text-yellow-300">recovery team</span> anytime
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Whether you need an immediate dispatch, want to arrange a scheduled transport, or have questions about
                an existing booking, our coordinators are ready to help.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+440000000000"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
                >
                  Call dispatch now
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                >
                  Send us a message
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-4 text-sm text-white/60">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Clock className="h-4 w-4 text-yellow-300" /> <span>Average response time: 45 minutes</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-yellow-300" /> <span>PAS43 certified &amp; insured</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <h2 className="text-xl font-semibold text-white">Rapid reference</h2>
              <p className="mt-3 text-sm text-white/70">
                Keep these details handy when you contact us. They help us get moving quicker and pair you with the
                right recovery specialist.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                <li>• Vehicle registration number</li>
                <li>• Exact location or nearby landmark</li>
                <li>• Nature of the issue (accident, mechanical, puncture, EV, etc.)</li>
                <li>• Whether you have passengers or special requirements</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-5 text-sm text-yellow-100">
                <p className="font-semibold uppercase tracking-[0.2em] text-yellow-300">Heads up</p>
                <p className="mt-2 text-white/80">
                  For motorway recoveries please move behind the barrier if safe, wear hi-vis if available, and call our
                  emergency line right away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center border-t border-white/10 bg-neutral-950/80 py-20">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {contactOptions.map(({ Icon, title, value, href, blurb }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.45)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400/15">
                  <Icon className="h-6 w-6 text-yellow-300" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 text-base font-semibold text-yellow-300 transition-colors hover:text-yellow-200"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-base font-semibold text-white/80">{value}</p>
                )}
                <p className="mt-3 text-sm text-white/60">{blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="flex justify-center bg-black py-20">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-12 lg:grid-cols-[1.05fr,0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                Message us
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Need a quote or callback?</h2>
              <p className="mt-4 text-white/70">
                Fill in the form and our coordinators will call you back with availability, pricing, and next steps. We
                typically respond within 30 minutes during the day and within the hour overnight.
              </p>
              <div className="mt-8 space-y-4 text-sm text-white/60">
                <p className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/15 text-xs font-semibold text-yellow-300">
                    1
                  </span>
                  Share your location, destination (if needed), and the service required.
                </p>
                <p className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/15 text-xs font-semibold text-yellow-300">
                    2
                  </span>
                  We calculate an accurate ETA and confirm pricing before dispatching a driver.
                </p>
                <p className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/15 text-xs font-semibold text-yellow-300">
                    3
                  </span>
                  Receive SMS updates so you can track your recovery team on the way.
                </p>
              </div>
            </div>
            <form className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="field">
                  <span>Name</span>
                  <input type="text" name="name" className="input" placeholder="Your full name" required />
                </label>
                <label className="field">
                  <span>Phone number</span>
                  <input type="tel" name="phone" className="input" placeholder="Mobile number" required />
                </label>
                <label className="field md:col-span-2">
                  <span>Email</span>
                  <input type="email" name="email" className="input" placeholder="Optional, for confirmation" />
                </label>
                <label className="field md:col-span-2">
                  <span>Service required</span>
                  <input
                    type="text"
                    name="service"
                    className="input"
                    placeholder="Recovery, tow, transport, jump start..."
                  />
                </label>
                <label className="field md:col-span-2">
                  <span>How can we help?</span>
                  <textarea
                    name="message"
                    className="input"
                    rows={4}
                    placeholder="Share your location, vehicle, and what has happened."
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
              >
                Send message
              </button>
              <p className="mt-4 text-center text-xs text-white/50">
                We’ll call you back using the details provided. By submitting you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
