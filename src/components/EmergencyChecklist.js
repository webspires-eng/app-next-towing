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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="section-heading section-heading--left m-0">
            <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Emergency checklist</div>
            <h2 className="section-title text-[#0E172B]">Stay safe while you wait for us to arrive</h2>
            <p className="section-description text-left">
              Keep this quick checklist handy so your insurance claim and roadside experience stay stress-free.
            </p>
          </div>
          <div className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 text-sm text-[#0E172B] shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
            <div className="flex items-center gap-3 text-[#0E172B]">
              <ClipboardList className="h-5 w-5" aria-hidden />
              <p>Downloadable guide sent via SMS when you book a recovery.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {checklist.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B]/5 text-[#0E172B]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-lg font-semibold text-[#0E172B]">{title}</p>
              <p className="mt-2 text-sm text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
