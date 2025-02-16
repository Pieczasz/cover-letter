'use client';

import HeroSection from '../components/layout/HeroSection';
import FeaturesSection from '../components/layout/FeaturesSection';
import TemplatesSection from '../components/layout/TemplatesSection';
import FAQSection from '../components/layout/FAQSection';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
