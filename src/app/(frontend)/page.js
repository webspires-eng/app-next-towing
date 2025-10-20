import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import CoverageCTA from "@/components/CoverageCTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import LiveStats from "@/components/LiveStats";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <LiveStats />
      <WhyChooseUs />
      <ServicesGrid />
      <HowItWorks />
      <CoverageCTA />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
