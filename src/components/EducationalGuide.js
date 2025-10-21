import { BookOpenCheck, Car, Fuel, Zap } from 'lucide-react';

const guides = [
  {
    icon: Car,
    title: 'What to do after a breakdown',
    description: 'Step-by-step checklist for staying safe, from hazard lights to roadside assistance calls.',
  },
  {
    icon: Fuel,
    title: 'Dealing with misfuelling',
    description: 'Recognise the signs and understand the safe pump-out process to avoid engine damage.',
  },
  {
    icon: Zap,
    title: 'EV safe recovery',
    description: 'Why flatbeds are essential, how we manage high-voltage systems, and what to expect.',
  },
  {
    icon: BookOpenCheck,
    title: 'Insurance-ready paperwork',
    description: 'Collecting photos, job notes, and signatures so claims move quickly.',
  },
];

export default function EducationalGuide() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Educational guide</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">
            Understand each step of the recovery journey
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              </div>
              <p className="mt-4 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
