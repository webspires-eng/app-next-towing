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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Flexible payment methods
          </div>
          <h2 className="section-title text-[#0E172B]">
            Pay roadside or remotely with secure, instant confirmation
          </h2>
          <p className="section-description">
            Fast, compliant payments whether you are with the driver or coordinating from afar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {methods.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC14]/15 text-[#FACC14]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0E172B]">{title}</h3>
                <p className="mt-2 text-sm text-[#0E172B]/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
