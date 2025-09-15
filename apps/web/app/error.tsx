"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertTriangle, Bug, Zap } from "lucide-react";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-orange-600/15 to-yellow-600/15 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-red-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern overlay - more visible */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlRmlsdGVyIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] bg-repeat" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full animate-bounce" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce delay-500" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Something went wrong!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-4">
            Houston, we have a problem! Our servers encountered an unexpected
            error.
          </p>
          <p className="text-gray-400 text-base">
            Don't worry, our engineering team has been notified and is working
            on a fix.
          </p>
        </div>

        {/* Error Details */}
        {error.digest && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-center mb-2">
              <Bug className="h-4 w-4 text-red-400 mr-2" />
              <span className="text-red-300 font-medium text-sm">Error ID</span>
            </div>
            <code className="text-red-200 text-xs font-mono bg-black/30 px-3 py-1 rounded">
              {error.digest}
            </code>
          </div>
        )}

        {/* Suggestions */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
            <Zap className="h-5 w-5 mr-2" />
            Try these solutions:
          </h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex items-center justify-center">
              <RefreshCw className="h-4 w-4 mr-2 text-blue-400" />
              Refresh the page to try again
            </div>
            <div className="flex items-center justify-center">
              <Home className="h-4 w-4 mr-2 text-purple-400" />
              Go back to the homepage
            </div>
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-orange-400" />
              Check your internet connection
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-red-500/25"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 text-blue-300 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
            >
              <Zap className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>
            If this problem persists, please{" "}
            <Link
              href="/contact"
              className="text-red-400 hover:text-red-300 transition-colors underline"
            >
              contact our support team
            </Link>{" "}
            with the error ID above.
          </p>
        </div>
      </div>

      {/* Floating Elements - Error themed */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-75" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75 delay-1000" />
      <div className="absolute bottom-32 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75 delay-500" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75 delay-1500" />
    </div>
  );
}
