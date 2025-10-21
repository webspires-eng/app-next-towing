import ServicesGrid from '@/components/ServicesGrid';

export default function Services() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Comprehensive roadside support
          </div>
          <h2 className="section-title text-[#0E172B]">
            From quick jumps to long-distance transport, we cover every scenario
          </h2>
          <p className="section-description">
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
