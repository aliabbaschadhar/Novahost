"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Zap, Globe } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern overlay - more visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlRmlsdGVyIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] bg-repeat" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text animate-pulse">
              404
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce delay-300" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-700" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-2">
            The page you&apos;re looking for seems to have vanished into the
            digital void.
          </p>
          <p className="text-gray-400 text-base">
            Don&apos;t worry, even the best rockets sometimes miss their target!
            🚀
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            What you can do:
          </h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex items-center justify-center">
              <Zap className="h-4 w-4 mr-2 text-blue-400" />
              Check the URL for typos
            </div>
            <div className="flex items-center justify-center">
              <Globe className="h-4 w-4 mr-2 text-purple-400" />
              Visit our homepage to start fresh
            </div>
            <div className="flex items-center justify-center">
              <Home className="h-4 w-4 mr-2 text-cyan-400" />
              Go back to where you came from
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>

          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/25">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 text-purple-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
            >
              <Zap className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>
            If you believe this is an error, please{" "}
            <Link
              href="/contact"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              contact our support team
            </Link>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 delay-1000" />
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75 delay-500" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75 delay-1500" />
    </div>
  );
}
