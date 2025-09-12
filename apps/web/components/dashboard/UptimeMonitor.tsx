"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UptimeData {
  time: string;
  uptime: number;
}

interface UptimeMonitorProps {
  data?: UptimeData[];
  title?: string;
  subtitle?: string;
  currentUptime?: number;
  averageUptime?: number;
  showStats?: boolean;
  className?: string;
  variant?: "landing" | "dashboard";
}

const defaultData: UptimeData[] = [
  { time: "00:00", uptime: 99.2 },
  { time: "04:00", uptime: 99.8 },
  { time: "08:00", uptime: 100 },
  { time: "12:00", uptime: 99.9 },
  { time: "16:00", uptime: 100 },
  { time: "20:00", uptime: 99.7 },
  { time: "24:00", uptime: 100 },
];

const defaultStats = [
  { label: "Response Time", value: "247ms", change: "-12%", positive: true },
  { label: "Incidents", value: "0", change: "0%", positive: true },
  { label: "Regions", value: "12", change: "+2", positive: true },
  { label: "Checks", value: "2,847", change: "+156", positive: true },
];

export function UptimeMonitor({
  data = defaultData,
  title = "Last 24 Hours",
  subtitle = "Uptime Percentage",
  currentUptime = 99.8,
  averageUptime = 99.8,
  showStats = true,
  className = "",
  variant = "dashboard",
}: UptimeMonitorProps) {
  if (variant === "dashboard") {
    return (
      <Card
        className={`bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-white mb-1">
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span>{subtitle}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">
                {currentUptime}%
              </div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="h-48 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <YAxis
                  domain={[99, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                  formatter={(value: any) => [`${value}%`, "Uptime"]}
                />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 4, stroke: "#10b981", strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {showStats && (
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-800">
              <div className="text-center">
                <div className="text-sm font-medium text-white">
                  Response Time
                </div>
                <div className="text-xs text-gray-400">247ms</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-white">Incidents</div>
                <div className="text-xs text-gray-400">0</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-gray-900/80 to-black/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm border border-gray-800/50 shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 group ${className}`}
    >
      {/* Graph Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-emerald-100 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              <span>{subtitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>{averageUptime}% Average</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 group-hover:scale-105 transition-transform duration-300">
              {currentUptime}%
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Current Uptime
            </div>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="h-60 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              domain={[99, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              formatter={(value: any) => [`${value}%`, "Uptime"]}
            />
            <Line
              type="monotone"
              dataKey="uptime"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#065f46",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Row */}
      {showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          {defaultStats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group/stat hover:scale-105 transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover/stat:text-emerald-400 transition-colors duration-200">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mb-1">
                {stat.label}
              </div>
              <div
                className={`text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
