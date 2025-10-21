import { ClipboardList, Lightbulb, PhoneCall, FileText } from 'lucide-react';

const checklist = [
  {
    title: 'Move to safety',
    description: 'Turn on hazards, place warning triangle if safe, and keep passengers behind barriers.',
    icon: Lightbulb,
  },
  {
    title: 'Document the scene',
    description: 'Take photos of the vehicle, surroundings, and any damage for your insurer.',
    icon: FileText,
  },
  {
    title: 'Call Next Towing',
    description: 'We coordinate with highways, emergency services, and your insurer as needed.',
    icon: PhoneCall,
  },
];

export default function EmergencyChecklist() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Emergency checklist</p>
            <h2 className="text-balance text-4xl font-semibold">Stay safe while you wait for us to arrive</h2>
            <p className="text-base text-slate-300">
              Keep this quick checklist handy so your insurance claim and roadside experience stay stress-free.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5" aria-hidden />
              <p>Downloadable guide sent via SMS when you book a recovery.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {checklist.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{title}</p>
              <p className="mt-2 text-sm text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
