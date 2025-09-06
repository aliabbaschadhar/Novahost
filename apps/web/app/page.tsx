'use client';
'use client';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TechStack } from '@/components/landing/TechStack';
import { CTA } from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <Header />
      <Hero />
      <Features />
      <TechStack />
      <CTA />
    </div>
  );
}