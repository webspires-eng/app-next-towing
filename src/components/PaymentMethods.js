import { CreditCard, Smartphone, ShieldCheck, Landmark } from 'lucide-react';

const methods = [
  {
    icon: CreditCard,
    title: 'All major cards & Apple Pay',
    description: 'Secure chip-and-pin terminals in every vehicle with instant receipts.',
  },
  {
    icon: Smartphone,
    title: 'Contactless & mobile pay links',
    description: 'SMS payment links and contactless tap available for remote handovers.',
  },
  {
    icon: Landmark,
    title: 'Fleet accounts & invoicing',
    description: '30-day terms with consolidated digital statements for partners.',
  },
  {
    icon: ShieldCheck,
    title: 'Fully PCI compliant',
    description: 'Payment data encrypted end-to-end, handled by FCA regulated provider.',
  },
];

export default function PaymentMethods() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Flexible payment methods</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">
            Pay roadside or remotely with secure, instant confirmation
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {methods.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
