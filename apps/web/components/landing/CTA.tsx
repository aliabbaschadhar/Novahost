'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CTA() {
  const router = useRouter();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to deploy?{' '}
          <span className="text-gray-400">Start building with a free account.</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Speak to an expert for your{' '}
          <span className="text-blue-400 font-semibold">Pro</span>{' '}
          or{' '}
          <span className="text-purple-400 font-semibold">Enterprise</span>{' '}
          needs.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg group"
            onClick={() => router.push('/auth/signup')}
          >
            Start Deploying
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
          >
            Talk to an Expert
          </Button>
        </div>
        
        <div className="mt-12 text-right">
          <p className="text-gray-400 mb-2">
            <span className="text-emerald-400 font-semibold">Explore NovaHost Enterprise</span>{' '}
            with an interactive product tour, trial, or a personalized demo.
          </p>
          <Button
            variant="link"
            className="text-emerald-400 hover:text-emerald-300 p-0 font-semibold"
          >
            Explore Enterprise
          </Button>
        </div>
      </div>
    </section>
  );
}