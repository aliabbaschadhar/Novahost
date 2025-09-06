'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { World } from '@/components/ui/globe-dynamic';

export function Hero() {
  const router = useRouter();

  // Sample data for the globe connections
  const connectionData = [
    // North America Routes
    {
      order: 1,
      startLat: 37.7749,
      startLng: -122.4194, // San Francisco
      endLat: 40.7589,
      endLng: -73.9851, // New York
      arcAlt: 0.3,
      color: '#10b981'
    },
    {
      order: 2,
      startLat: 43.6532,
      startLng: -79.3832, // Toronto
      endLat: 49.2827,
      endLng: -123.1207, // Vancouver
      arcAlt: 0.2,
      color: '#06d6a0'
    },
    {
      order: 3,
      startLat: 25.7617,
      startLng: -80.1918, // Miami
      endLat: 32.7767,
      endLng: -96.7970, // Dallas
      arcAlt: 0.15,
      color: '#14f195'
    },
    // Europe Routes
    {
      order: 4,
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      arcAlt: 0.1,
      color: '#10b981'
    },
    {
      order: 5,
      startLat: 52.5200,
      startLng: 13.4050, // Berlin
      endLat: 41.9028,
      endLng: 12.4964, // Rome
      arcAlt: 0.2,
      color: '#06d6a0'
    },
    {
      order: 6,
      startLat: 59.9311,
      startLng: 30.3609, // St. Petersburg
      endLat: 55.7558,
      endLng: 37.6173, // Moscow
      arcAlt: 0.15,
      color: '#14f195'
    },
    {
      order: 7,
      startLat: 40.4168,
      startLng: -3.7038, // Madrid
      endLat: 50.8503,
      endLng: 4.3517, // Brussels
      arcAlt: 0.18,
      color: '#10b981'
    },
    // Asia-Pacific Routes
    {
      order: 8,
      startLat: 35.6762,
      startLng: 139.6503, // Tokyo
      endLat: 37.5665,
      endLng: 126.9780, // Seoul
      arcAlt: 0.2,
      color: '#06d6a0'
    },
    {
      order: 9,
      startLat: 39.9042,
      startLng: 116.4074, // Beijing
      endLat: 31.2304,
      endLng: 121.4737, // Shanghai
      arcAlt: 0.15,
      color: '#14f195'
    },
    {
      order: 10,
      startLat: 1.3521,
      startLng: 103.8198, // Singapore
      endLat: 13.7563,
      endLng: 100.5018, // Bangkok
      arcAlt: 0.12,
      color: '#10b981'
    },
    {
      order: 11,
      startLat: -33.8688,
      startLng: 151.2093, // Sydney
      endLat: -37.8136,
      endLng: 144.9631, // Melbourne
      arcAlt: 0.1,
      color: '#06d6a0'
    },
    {
      order: 12,
      startLat: 28.6139,
      startLng: 77.2090, // Delhi
      endLat: 19.0760,
      endLng: 72.8777, // Mumbai
      arcAlt: 0.18,
      color: '#14f195'
    },
    // Intercontinental Routes
    {
      order: 13,
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 35.6762,
      endLng: 139.6503, // Tokyo
      arcAlt: 0.4,
      color: '#10b981'
    },
    {
      order: 14,
      startLat: 40.7589,
      startLng: -73.9851, // New York
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      arcAlt: 0.35,
      color: '#06d6a0'
    },
    {
      order: 15,
      startLat: 37.7749,
      startLng: -122.4194, // San Francisco
      endLat: 1.3521,
      endLng: 103.8198, // Singapore
      arcAlt: 0.45,
      color: '#14f195'
    },
    // South America Routes
    {
      order: 16,
      startLat: -23.5505,
      startLng: -46.6333, // São Paulo
      endLat: -34.6037,
      endLng: -58.3816, // Buenos Aires
      arcAlt: 0.15,
      color: '#10b981'
    },
    {
      order: 17,
      startLat: 4.7110,
      startLng: -74.0721, // Bogotá
      endLat: -12.0464,
      endLng: -77.0428, // Lima
      arcAlt: 0.2,
      color: '#06d6a0'
    },
    // Africa Routes
    {
      order: 18,
      startLat: -26.2041,
      startLng: 28.0473, // Johannesburg
      endLat: -33.9249,
      endLng: 18.4241, // Cape Town
      arcAlt: 0.12,
      color: '#14f195'
    },
    {
      order: 19,
      startLat: 30.0444,
      startLng: 31.2357, // Cairo
      endLat: 6.5244,
      endLng: 3.3792, // Lagos
      arcAlt: 0.25,
      color: '#10b981'
    },
    // Middle East Routes
    {
      order: 20,
      startLat: 25.2048,
      startLng: 55.2708, // Dubai
      endLat: 24.7136,
      endLng: 46.6753, // Riyadh
      arcAlt: 0.1,
      color: '#06d6a0'
    },
    // More Cross-Continental Routes
    {
      order: 21,
      startLat: 55.7558,
      startLng: 37.6173, // Moscow
      endLat: 25.2048,
      endLng: 55.2708, // Dubai
      arcAlt: 0.3,
      color: '#14f195'
    },
    {
      order: 22,
      startLat: 19.4326,
      startLng: -99.1332, // Mexico City
      endLat: 4.7110,
      endLng: -74.0721, // Bogotá
      arcAlt: 0.25,
      color: '#10b981'
    },
    {
      order: 23,
      startLat: -33.8688,
      startLng: 151.2093, // Sydney
      endLat: 35.6762,
      endLng: 139.6503, // Tokyo
      arcAlt: 0.4,
      color: '#06d6a0'
    },
    {
      order: 24,
      startLat: 30.0444,
      startLng: 31.2357, // Cairo
      endLat: 51.5074,
      endLng: -0.1278, // London
      arcAlt: 0.3,
      color: '#14f195'
    }
  ];

  const globeConfig = {
    pointSize: 6, // Increased from 2 to 6 for more visible dots
    globeColor: "#1a1a1a",
    showAtmosphere: true,
    atmosphereColor: "#10b981",
    atmosphereAltitude: 0.1,
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(16, 185, 129, 0.3)",
    ambientLight: "#10b981",
    directionalLeftLight: "#10b981",
    directionalTopLight: "#10b981",
    pointLight: "#10b981",
    arcTime: 3000,
    arcLength: 0.9,
    rings: 4, // Increased from 2 to 4 for more visible connection rings
    maxRings: 6, // Increased from 3 to 6 for more prominent arcs
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mx-6 sm:-mx-8 lg:-mx-12">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 green-gradient opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 green-gradient opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-black to-orange-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left side - Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              Deploy globally in{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent animate-pulse ">
                Seconds
              </span>
              .
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              NovaHost provides the developer tools and cloud infrastructure
              to build, scale, and secure a faster, more personalized web.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="relative group flex items-center">
                {/* Decorative gradient behind the button */}
                <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 opacity-30 blur-lg transform scale-105 transition-opacity duration-300 group-hover:opacity-60 -z-10 pointer-events-none" />

                <Button
                  size="lg"
                  className="relative overflow-hidden rounded-full px-8 py-4 font-semibold text-lg text-white transition-all duration-300 transform shadow-2xl shadow-green-900/40 hover:scale-105 cursor-pointer flex items-center gap-3 bg-gradient-to-r from-50% from-green-500 to-red-900"
                  onClick={() => router.push('/auth/signup')}
                  aria-label="Start deploying"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Deploying
                    <ArrowRight className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                  {/* Subtle glass base shimmer (kept above the gradient but below text) */}
                  <span className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none z-0" />

                  {/* Soft glow ring on hover */}
                  <span className="absolute -inset-0.5 rounded-full opacity-0 ring-1 ring-emerald-300/40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg cursor-pointer transition-all duration-300 hover:border-white/30"
              >
                Get a Demo
              </Button>
            </div>
          </div>

          {/* Right side - Globe Display */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="relative w-full h-full">
                <World data={connectionData} globeConfig={globeConfig} />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-orange-500/10 rounded-lg blur-xl" />
              </div>
            </div>

            {/* Floating Elements */}
            {/* <div className="absolute top-20 left-10 w-20 h-20 glass-effect green-gradient opacity-30 rounded-lg rotate-12 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-16 h-16 glass-effect green-gradient opacity-30 rounded-full animate-pulse delay-500" />
            <div className="absolute top-1/2 right-20 w-12 h-12 glass-effect green-gradient opacity-40 rounded-lg -rotate-12 animate-pulse delay-1000" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}