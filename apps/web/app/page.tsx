'use client';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/landing/Hero';
import { UptimeChart } from '@/components/landing/UptimeChart';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';
import { TracingBeam } from '@/components/ui/tracing-beam';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <Header />

      {/* Tracing beam positioned at left edge */}
      <TracingBeam className="absolute left-0 top-0 h-full" />

      {/* Main content with proper spacing for fixed header */}
      <main className="pt-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative">
        <div className="space-y-40">
          <Hero />
          <section id="uptime">
            <UptimeChart />
          </section>
          <section id="features">
            <Features />
          </section>
        </div>
        <div className="mt-40">
          <CTA />
        </div>
      </main>
    </div>
  );
}