'use client';

import { Card, CardContent } from '@/components/ui/card';

export function TechStack() {
  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Vue.js',
      icon: '🟢',
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Angular',
      icon: '🔺',
      color: 'from-red-400 to-red-600',
    },
    {
      name: 'HTML/CSS/JS',
      icon: '🌐',
      color: 'from-orange-400 to-orange-600',
    },
    {
      name: 'Next.js',
      icon: '▲',
      color: 'from-gray-600 to-gray-800',
    },
    {
      name: 'Nuxt.js',
      icon: '💚',
      color: 'from-emerald-400 to-emerald-600',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Supported Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Deploy any frontend framework with zero configuration. 
            NovaHost automatically detects and optimizes your project.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-emerald-500/50 hover:scale-105 group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className={`bg-gradient-to-r ${tech.color} p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {tech.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}