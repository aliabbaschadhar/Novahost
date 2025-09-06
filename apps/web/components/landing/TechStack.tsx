'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import {
  siReact,
  siVuedotjs,
  siAngular,
  siSvelte,
  siHtml5,
  siVite,
} from 'simple-icons';

export function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const technologies = [
    {
      name: 'React',
      icon: siReact,
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Vue.js',
      icon: siVuedotjs,
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Angular',
      icon: siAngular,
      color: 'from-red-400 to-red-600',
    },
    {
      name: 'Svelte',
      icon: siSvelte,
      color: 'from-orange-400 to-red-500',
    },
    {
      name: 'HTML/CSS/JS',
      icon: siHtml5,
      color: 'from-orange-400 to-orange-600',
    },

    {
      name: 'Vite',
      icon: siVite,
      color: 'from-blue-400 to-purple-500',
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 relative -mx-6 sm:-mx-8 lg:-mx-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-emerald-400">Tech Stack</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent">
            Deploy Any Framework
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Zero configuration deployments for all modern frontend frameworks.
            We automatically detect and optimize your project.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // @ts-ignore
            WebkitScrollbar: { display: 'none' }
          }}
        >
          <div className="flex gap-6 animate-scroll">
            {[...technologies, ...technologies].map((tech, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-emerald-500/50 hover:scale-105 group cursor-pointer flex-shrink-0 min-w-[180px]"
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-r ${tech.color} p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div
                      className="w-8 h-8 text-white flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: tech.icon.svg.replace('<svg', '<svg class="w-full h-full" fill="currentColor"')
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors text-sm">
                    {tech.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}