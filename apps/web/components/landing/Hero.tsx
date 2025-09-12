"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { World } from "@/components/ui/globe-dynamic";

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
      color: "#3b82f6",
    },
    {
      order: 2,
      startLat: 43.6532,
      startLng: -79.3832, // Toronto
      endLat: 49.2827,
      endLng: -123.1207, // Vancouver
      arcAlt: 0.2,
      color: "#8b5cf6",
    },
    {
      order: 3,
      startLat: 25.7617,
      startLng: -80.1918, // Miami
      endLat: 32.7767,
      endLng: -96.797, // Dallas
      arcAlt: 0.15,
      color: "#06b6d4",
    },
    // Europe Routes
    {
      order: 4,
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      arcAlt: 0.1,
      color: "#3b82f6",
    },
    {
      order: 5,
      startLat: 52.52,
      startLng: 13.405, // Berlin
      endLat: 41.9028,
      endLng: 12.4964, // Rome
      arcAlt: 0.2,
      color: "#8b5cf6",
    },
    {
      order: 6,
      startLat: 59.9311,
      startLng: 30.3609, // St. Petersburg
      endLat: 55.7558,
      endLng: 37.6173, // Moscow
      arcAlt: 0.15,
      color: "#06b6d4",
    },
    {
      order: 7,
      startLat: 40.4168,
      startLng: -3.7038, // Madrid
      endLat: 50.8503,
      endLng: 4.3517, // Brussels
      arcAlt: 0.18,
      color: "#3b82f6",
    },
    // Asia-Pacific Routes
    {
      order: 8,
      startLat: 35.6762,
      startLng: 139.6503, // Tokyo
      endLat: 37.5665,
      endLng: 126.978, // Seoul
      arcAlt: 0.2,
      color: "#8b5cf6",
    },
    {
      order: 9,
      startLat: 39.9042,
      startLng: 116.4074, // Beijing
      endLat: 31.2304,
      endLng: 121.4737, // Shanghai
      arcAlt: 0.15,
      color: "#06b6d4",
    },
    {
      order: 10,
      startLat: 1.3521,
      startLng: 103.8198, // Singapore
      endLat: 13.7563,
      endLng: 100.5018, // Bangkok
      arcAlt: 0.12,
      color: "#3b82f6",
    },
    {
      order: 11,
      startLat: -33.8688,
      startLng: 151.2093, // Sydney
      endLat: -37.8136,
      endLng: 144.9631, // Melbourne
      arcAlt: 0.1,
      color: "#8b5cf6",
    },
    {
      order: 12,
      startLat: 28.6139,
      startLng: 77.209, // Delhi
      endLat: 19.076,
      endLng: 72.8777, // Mumbai
      arcAlt: 0.18,
      color: "#06b6d4",
    },
    // Intercontinental Routes
    {
      order: 13,
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 35.6762,
      endLng: 139.6503, // Tokyo
      arcAlt: 0.4,
      color: "#3b82f6",
    },
    {
      order: 14,
      startLat: 40.7589,
      startLng: -73.9851, // New York
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      arcAlt: 0.35,
      color: "#8b5cf6",
    },
    {
      order: 15,
      startLat: 37.7749,
      startLng: -122.4194, // San Francisco
      endLat: 1.3521,
      endLng: 103.8198, // Singapore
      arcAlt: 0.45,
      color: "#06b6d4",
    },
    // South America Routes
    {
      order: 16,
      startLat: -23.5505,
      startLng: -46.6333, // São Paulo
      endLat: -34.6037,
      endLng: -58.3816, // Buenos Aires
      arcAlt: 0.15,
      color: "#3b82f6",
    },
    {
      order: 17,
      startLat: 4.711,
      startLng: -74.0721, // Bogotá
      endLat: -12.0464,
      endLng: -77.0428, // Lima
      arcAlt: 0.2,
      color: "#8b5cf6",
    },
    // Africa Routes
    {
      order: 18,
      startLat: -26.2041,
      startLng: 28.0473, // Johannesburg
      endLat: -33.9249,
      endLng: 18.4241, // Cape Town
      arcAlt: 0.12,
      color: "#06b6d4",
    },
    {
      order: 19,
      startLat: 30.0444,
      startLng: 31.2357, // Cairo
      endLat: 6.5244,
      endLng: 3.3792, // Lagos
      arcAlt: 0.25,
      color: "#3b82f6",
    },
    // Middle East Routes
    {
      order: 20,
      startLat: 25.2048,
      startLng: 55.2708, // Dubai
      endLat: 24.7136,
      endLng: 46.6753, // Riyadh
      arcAlt: 0.1,
      color: "#8b5cf6",
    },
    // More Cross-Continental Routes
    {
      order: 21,
      startLat: 55.7558,
      startLng: 37.6173, // Moscow
      endLat: 25.2048,
      endLng: 55.2708, // Dubai
      arcAlt: 0.3,
      color: "#14f195",
    },
    {
      order: 22,
      startLat: 19.4326,
      startLng: -99.1332, // Mexico City
      endLat: 4.711,
      endLng: -74.0721, // Bogotá
      arcAlt: 0.25,
      color: "#06b6d4",
    },
    {
      order: 23,
      startLat: -33.8688,
      startLng: 151.2093, // Sydney
      endLat: 35.6762,
      endLng: 139.6503, // Tokyo
      arcAlt: 0.4,
      color: "#06d6a0",
    },
    {
      order: 24,
      startLat: 25.033,
      startLng: 121.5654, // Taipei
      endLat: 14.5995,
      endLng: 120.9842, // Manila
      arcAlt: 0.25,
      color: "#06b6d4",
    },
    {
      order: 22,
      startLat: 30.0444,
      startLng: 31.2357, // Cairo
      endLat: 51.5074,
      endLng: -0.1278, // London
      arcAlt: 0.3,
      color: "#3b82f6",
    },
  ];

  const globeConfig = {
    pointSize: 6, // Increased from 2 to 6 for more visible dots
    globeColor: "#1a1a1a",
    showAtmosphere: true,
    atmosphereColor: "#3b82f6",
    atmosphereAltitude: 0.1,
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(59, 130, 246, 0.3)",
    ambientLight: "#3b82f6",
    directionalLeftLight: "#3b82f6",
    directionalTopLight: "#3b82f6",
    pointLight: "#3b82f6",
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
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen">
          {/* Left side - Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              Deploy globally in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Seconds
              </span>
              .
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              NovaHost provides the developer tools and cloud infrastructure to
              build, scale, and secure a faster, more personalized web.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="relative group flex items-center">
                {/* Animated gradient background */}
                <span className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-lg transform scale-105 transition-all duration-300 group-hover:opacity-70 group-hover:scale-110 -z-10 pointer-events-none" />

                <Button
                  size="lg"
                  className="relative overflow-hidden rounded-full px-8 py-4 font-semibold text-lg text-white transition-all duration-300 transform shadow-2xl shadow-purple-900/40 hover:scale-105 cursor-pointer flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 group/btn"
                  onClick={() => router.push("/auth/signup")}
                  aria-label="Start deploying"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Deploying
                    <ArrowRight className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>

                  {/* Enhanced glassmorphism effect */}
                  <span className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none z-0" />

                  {/* Animated gradient overlay on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

                  {/* Soft glow ring on hover */}
                  <span className="absolute -inset-0.5 rounded-full opacity-0 ring-2 ring-blue-300/40 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="relative border-white/20 text-white font-semibold px-8 py-4 text-lg cursor-pointer transition-all duration-300 backdrop-blur-sm group/outline overflow-hidden hover:scale-105"
              >
                <span className="relative z-10">Get a Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover/outline:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-white/30 rounded-lg opacity-0 group-hover/outline:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>

          {/* Right side - Globe Display */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="relative w-full h-full">
                <World data={connectionData} globeConfig={globeConfig} />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-lg blur-xl" />
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
