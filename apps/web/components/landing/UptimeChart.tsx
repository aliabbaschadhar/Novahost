'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const uptimeData = [
  { time: '00:00', uptime: 99.2 },
  { time: '04:00', uptime: 99.8 },
  { time: '08:00', uptime: 100 },
  { time: '12:00', uptime: 99.9 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 99.7 },
  { time: '24:00', uptime: 100 },
];

export function UptimeChart() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 transition-all duration-300 hover:bg-blue-500/15 hover:scale-105 cursor-pointer group relative overflow-hidden">
            <Activity className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-xs sm:text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors relative z-10">Real-time Monitoring</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Uptime at a Glance
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Monitor your application's health with beautiful, real-time analytics.
            Simple graphs that tell the complete story.
          </p>
        </div>

        {/* Graph Container */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm border border-gray-800/50 shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 group">
          {/* Graph Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-blue-100 transition-colors duration-300">
                Last 24 Hours
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
                  <span>Uptime Percentage</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>99.8% Average</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                  99.8%
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Current Uptime</div>
              </div>
            </div>
          </div>

          {/* Graph */}
          <div className="h-60 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis
                  domain={[99, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Uptime']}
                />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#065f46' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
            {[
              { label: 'Response Time', value: '247ms', change: '-12%', positive: true },
              { label: 'Incidents', value: '0', change: '0%', positive: true },
              { label: 'Regions', value: '12', change: '+2', positive: true },
              { label: 'Checks', value: '2,847', change: '+156', positive: true },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group/stat hover:scale-105 transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 relative overflow-hidden"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover/stat:text-blue-400 transition-colors duration-200 relative z-10">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mb-1 relative z-10">{stat.label}</div>
                <div className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'} relative z-10`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
