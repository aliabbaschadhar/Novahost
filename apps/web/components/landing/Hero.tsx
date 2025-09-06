'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Triangle, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mx-6 sm:-mx-8 lg:-mx-12">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 green-gradient opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 green-gradient opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-black to-orange-500/20" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight tracking-tight">
          Build and deploy on the{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent animate-pulse">
            AI Cloud
          </span>
          .
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          NovaHost provides the developer tools and cloud infrastructure
          to build, scale, and secure a faster, more personalized web.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="group glass-effect green-gradient text-white px-8 py-4 rounded-full font-semibold text-lg hover:green-gradient-hover transition-all duration-300 flex items-center gap-2 shadow-2xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer"
            onClick={() => router.push('/auth/signup')}
          >
            <Triangle className="h-5 w-5 mr-2 fill-current" />
            Start Deploying
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg cursor-pointer transition-all duration-300 hover:border-white/30"
          >
            Get a Demo
          </Button>
        </div>

        {/* Hero Graphic */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-400 via-blue-500 to-orange-500 p-1 rounded-2xl">
            <div className="bg-black rounded-2xl p-8">
              <div className="relative">
                {/* Triangle Logo */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <Triangle className="h-32 w-32 text-white fill-current" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-orange-500 opacity-50 h-32 w-32 blur-xl" />
                  </div>
                </div>

                {/* Terminal-like Interface */}
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <div className="mb-1">▲ ~ git push</div>
                    <div className="text-emerald-400 mb-1">Enumerating objects: 1, done.</div>
                    <div className="text-emerald-400 mb-1">Counting objects: 100% (1/1), done.</div>
                    <div className="text-emerald-400 mb-1">Writing objects: 100% (1/1), 72 bytes, done.</div>
                    <div className="mb-1">To github.com:nova/nova-site.git</div>
                    <div className="text-blue-400">   21326a9..8 🚀 novahost.com</div>
                  </div>
                </div>

                {/* Play Button */}
                <div className="flex justify-center mt-6">
                  <button className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer group">
                    <Play className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 glass-effect green-gradient opacity-30 rounded-lg rotate-12 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-16 h-16 glass-effect green-gradient opacity-30 rounded-full animate-pulse delay-500" />
          <div className="absolute top-1/2 right-20 w-12 h-12 glass-effect green-gradient opacity-40 rounded-lg -rotate-12 animate-pulse delay-1000" />
        </div>
      </div>
    </section>
  );
}