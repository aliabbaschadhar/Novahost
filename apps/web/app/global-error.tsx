"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, AlertTriangle, Skull, Zap } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-900" />

          {/* Animated gradient orbs - more dramatic for critical error */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -right-4 w-96 h-96 bg-gradient-to-r from-orange-600/25 to-red-600/25 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-red-600/25 to-pink-600/25 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Grid pattern overlay - more visible */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000020_1px,transparent_1px),linear-gradient(to_bottom,#ff000020_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            {/* Critical Error Icon */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-28 h-28 mx-auto bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center animate-pulse border-4 border-red-500/50">
                  <Skull className="h-14 w-14 text-white animate-bounce" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping delay-700" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-4 animate-pulse">
                CRITICAL ERROR
              </h1>
              <p className="text-red-200 text-xl md:text-2xl mb-4 font-semibold">
                System Failure Detected
              </p>
              <p className="text-gray-300 text-lg mb-2">
                A critical error has occurred that prevented the application
                from functioning.
              </p>
              <p className="text-gray-400 text-base">
                This is a severe issue that requires immediate attention.
              </p>
            </div>

            {/* Error Details */}
            {error.digest && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-2xl p-4 mb-8">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-300 mr-2" />
                  <span className="text-red-200 font-medium">
                    Critical Error ID
                  </span>
                </div>
                <code className="text-red-100 text-sm font-mono bg-black/50 px-4 py-2 rounded block">
                  {error.digest}
                </code>
              </div>
            )}

            {/* Emergency Actions */}
            <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8">
              <h3 className="text-red-300 font-bold mb-4 flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2" />
                Emergency Recovery:
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-red-400" />
                  Try restarting the application
                </div>
                <div className="flex items-center justify-center">
                  <Home className="h-4 w-4 mr-2 text-orange-400" />
                  Return to safe homepage
                </div>
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  Clear browser cache and cookies
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-red-500/25 border-2 border-red-500/50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Emergency Restart
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-black/50 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-medium rounded-lg transition-all duration-300 cursor-pointer"
              >
                <Home className="h-4 w-4 mr-2" />
                Safe Mode Home
              </a>
            </div>

            {/* Critical Support Message */}
            <div className="mt-12 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm font-medium mb-2">
                ⚠️ This is a critical system error
              </p>
              <p className="text-gray-300 text-sm">
                Please{" "}
                <a
                  href="mailto:support@novahost.dev"
                  className="text-red-400 hover:text-red-300 transition-colors underline font-medium"
                >
                  contact emergency support
                </a>{" "}
                immediately with the error ID above.
              </p>
            </div>
          </div>

          {/* Dramatic floating elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75 delay-1000" />
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-75 delay-500" />
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75 delay-1500" />

          {/* Additional dramatic effects */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-600 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-orange-600 rounded-full animate-pulse opacity-60 delay-300" />
        </div>
      </body>
    </html>
  );
}
