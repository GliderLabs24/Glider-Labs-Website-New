import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServicesPillarsSection } from '@/components/ServicesPillarsSection';
import { WhyGliderSection } from '@/components/WhyGliderSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FeaturedProductsSection } from '@/components/FeaturedProductsSection';
import { BlogInsightsSection } from '@/components/BlogInsightsSection';
import { PartnersSection } from '@/components/PartnersSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-page text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ServicesPillarsSection />
        <WhyGliderSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
        <BlogInsightsSection />
        <PartnersSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
