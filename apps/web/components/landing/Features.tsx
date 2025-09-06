'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Terminal, MessageCircle, BarChart3, Zap, Globe, Shield } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Terminal,
      title: 'Git-connected Deploys',
      description: 'From localhost to https, in seconds.',
      subtitle: 'Deploy from Git or your CLI.',
    },
    {
      icon: MessageCircle,
      title: 'Collaborative Pre-production',
      description: 'Every deploy is remarkable.',
      subtitle: 'Chat with your team on real, production-grade UI, not just designs.',
    },
    {
      icon: BarChart3,
      title: 'Route-aware observability',
      description: 'Monitor and analyze the performance and traffic of your projects.',
      subtitle: 'Real-time insights into your application performance.',
    },
    {
      icon: Zap,
      title: 'NovaHost AI Gateway',
      description: 'Deploy AI in seconds.',
      subtitle: 'Access all major models through a single, unified interface.',
    },
    {
      icon: Globe,
      title: 'Global Edge Network',
      description: 'Deploy globally, instantly.',
      subtitle: 'Serve your applications from the edge for maximum performance.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Go ahead, deploy on Friday.',
      subtitle: 'Safely manage releases with automated rollbacks and security scanning.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden -mx-6 sm:-mx-8 lg:-mx-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Develop with your favorite tools{' '}
            <span className="text-emerald-400">▷</span>
            <br />
            Launch globally, instantly{' '}
            <span className="text-emerald-400">🌐</span>{' '}
            Keep pushing{' '}
            <span className="text-emerald-400">🚀</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:border-emerald-500/50 group cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-black" />
                  </div>
                </div>

                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <span className="text-emerald-400 mr-2">▷</span>
                  <span>{feature.title}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {feature.description}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}