import { ShieldCheck } from 'lucide-react';

const partners = ['Aviva', 'LV=', 'Direct Line', 'Zurich', 'Axa', 'Admiral'];

export default function InsurancePartners() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center xl:px-0">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Insurance partners</p>
          <h2 className="text-balance text-4xl font-semibold text-slate-900">
            Approved recovery partner for major insurers
          </h2>
          <p className="text-base text-slate-600">
            We liaise directly with your insurer for authorisations, paperwork, and claims updates.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
          {partners.map((partner) => (
            <span key={partner} className="rounded-full border border-slate-200 px-5 py-2 text-slate-500">
              {partner}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Claims documentation emailed within 2 hours of job completion.
        </div>
      </div>
    </section>
  );
}
