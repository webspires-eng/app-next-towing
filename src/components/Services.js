import ServicesGrid from '@/components/ServicesGrid';

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Comprehensive roadside support</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">
            From quick jumps to long-distance transport, we cover every scenario
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Choose from our core recovery services with transparent time estimates and specialist equipment mapped to your
            vehicle type.
          </p>
        </div>
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </div>
    </section>
  );
}
