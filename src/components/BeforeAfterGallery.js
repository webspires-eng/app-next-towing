import Image from 'next/image';

const items = [
  {
    before: '/hero-recovery.jpeg',
    after: '/hero-recovery.jpeg',
    label: 'Motorway breakdown to garage drop-off',
  },
  {
    before: '/hero-recovery.jpeg',
    after: '/hero-recovery.jpeg',
    label: 'EV roadside rescue and charge handover',
  },
];

export default function BeforeAfterGallery() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Before & after</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">See how we restore control in roadside emergencies</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map(({ before, after, label }) => (
            <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[{ src: before, caption: 'Before' }, { src: after, caption: 'After' }].map(({ src, caption }) => (
                  <div key={caption} className="space-y-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={src} alt="" fill className="object-cover" sizes="(min-width: 1024px) 280px, 100vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">{caption}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
