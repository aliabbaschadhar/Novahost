"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function CTA() {
  const router = useRouter();

  return (
    <section className="py-24 relative overflow-hidden -mx-6 sm:-mx-8 lg:-mx-12">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to deploy?{" "}
          <span className="text-gray-400">
            Start building with a free account.
          </span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Speak to an expert for your{" "}
          <span className="text-blue-400 font-semibold">Pro</span> or{" "}
          <span className="text-purple-400 font-semibold">Enterprise</span>{" "}
          needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold px-8 py-4 text-lg group cursor-pointer transition-all duration-300 hover:shadow-lg shadow-purple-500/25 hover:scale-105 overflow-hidden"
            onClick={() => router.push("/auth/signup")}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Deploying
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="relative border-white/20 text-white font-semibold px-8 py-4 text-lg cursor-pointer transition-all duration-300 backdrop-blur-sm group overflow-hidden hover:scale-105"
          >
            <span className="relative z-10">Talk to an Expert</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 border border-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>

        <div className="mt-12 text-right">
          <p className="text-gray-400 mb-2">
            <span className="text-blue-400 font-semibold">
              Explore NovaHost Enterprise
            </span>{" "}
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
