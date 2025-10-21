import { ShieldCheck } from 'lucide-react';

const partners = ['Aviva', 'LV=', 'Direct Line', 'Zurich', 'Axa', 'Admiral'];

export default function InsurancePartners() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner flex w-full flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0E172B]">Insurance partners</p>
          <h2 className="text-balance text-4xl font-semibold text-[#0E172B]">
            Approved recovery partner for major insurers
          </h2>
          <p className="text-base text-[#0E172B]/70">
            We liaise directly with your insurer for authorisations, paperwork, and claims updates.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#0E172B]/50">
          {partners.map((partner) => (
            <span key={partner} className="rounded-full border border-[#0E172B]/10 px-5 py-2 text-[#0E172B]/70">
              {partner}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0E172B] px-6 py-3 text-sm font-semibold text-white">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Claims documentation emailed within 2 hours of job completion.
        </div>
      </div>
    </section>
  );
}
