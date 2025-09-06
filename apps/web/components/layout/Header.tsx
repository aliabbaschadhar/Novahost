'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Glass effect background */}
      <div className="absolute inset-0 glass-navbar">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent hover:from-emerald-300 hover:to-blue-400 transition-all duration-300">
              NovaHost
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer font-medium hover:bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer font-medium hover:bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer font-medium hover:bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              Docs
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer backdrop-blur-sm transition-all duration-300 font-medium"
              onClick={() => router.push('/auth/login')}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white cursor-pointer shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 font-medium backdrop-blur-sm border border-white/10"
              onClick={() => router.push('/auth/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}