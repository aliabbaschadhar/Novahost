"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogoWithText } from "@/components/ui/logo";

export function Header() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Height of fixed header
      const targetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => router.push("/")}
          >
            <LogoWithText
              width={32}
              height={32}
              variant="white"
              textSize="text-2xl md:text-3xl"
              className="group-hover:scale-105 transition-transform duration-300"
              animate={true}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="relative text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer font-medium px-4 py-2 rounded-full group overflow-hidden"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
            <button
              onClick={() => scrollToSection("uptime")}
              className="relative text-gray-300 hover:text-gray-100 transition-all duration-300 cursor-pointer font-medium px-4 py-2 rounded-full group overflow-hidden"
            >
              <span className="relative z-10">Uptime</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="relative text-gray-300 hover:text-white cursor-pointer backdrop-blur-sm transition-all duration-300 font-medium group overflow-hidden"
              onClick={() => router.push("/auth/login")}
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white cursor-pointer shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 font-medium backdrop-blur-sm border border-white/10 group overflow-hidden"
              onClick={() => router.push("/auth/signup")}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
