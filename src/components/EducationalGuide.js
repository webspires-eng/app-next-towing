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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Educational guide</div>
          <h2 className="section-title text-[#0E172B]">
            Understand each step of the recovery journey
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {guides.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B] text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-[#0E172B]">{title}</h3>
              </div>
              <p className="mt-4 text-sm text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
