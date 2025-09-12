"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Clock,
  Activity,
  BarChart3,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  RefreshCw,
} from "lucide-react";

export default function AnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock analytics data
  const projects = [
    {
      id: "1",
      name: "my-react-app",
      url: "https://my-react-app.novahost.app",
      visitors: 15420,
      visitorsChange: 12.5,
      pageViews: 45830,
      pageViewsChange: 8.3,
      bounceRate: 32.1,
      bounceRateChange: -4.2,
      avgSessionDuration: "3m 24s",
      uptime: 99.8,
    },
    {
      id: "2",
      name: "portfolio-site",
      url: "https://portfolio-site.novahost.app",
      visitors: 8930,
      visitorsChange: -2.1,
      pageViews: 23440,
      pageViewsChange: 5.7,
      bounceRate: 28.9,
      bounceRateChange: -1.8,
      avgSessionDuration: "4m 12s",
      uptime: 99.9,
    },
    {
      id: "3",
      name: "vue-dashboard",
      url: "https://vue-dashboard.novahost.app",
      visitors: 3240,
      visitorsChange: 18.7,
      pageViews: 12890,
      pageViewsChange: 15.2,
      bounceRate: 41.3,
      bounceRateChange: 2.4,
      avgSessionDuration: "2m 48s",
      uptime: 98.9,
    },
  ];

  const topPages = [
    { page: "/", views: 12340, percentage: 35.2 },
    { page: "/dashboard", views: 8920, percentage: 25.4 },
    { page: "/projects", views: 6780, percentage: 19.3 },
    { page: "/analytics", views: 4230, percentage: 12.1 },
    { page: "/settings", views: 2800, percentage: 8.0 },
  ];

  const deviceData = [
    { device: "Desktop", users: 18240, percentage: 62.1 },
    { device: "Mobile", users: 8930, percentage: 30.4 },
    { device: "Tablet", users: 2200, percentage: 7.5 },
  ];

  const recentActivity = [
    {
      action: "Page view",
      page: "/dashboard",
      time: "2 minutes ago",
      country: "US",
    },
    {
      action: "User signup",
      page: "/signup",
      time: "5 minutes ago",
      country: "CA",
    },
    { action: "Page view", page: "/", time: "7 minutes ago", country: "UK" },
    {
      action: "Form submission",
      page: "/contact",
      time: "12 minutes ago",
      country: "DE",
    },
    {
      action: "Page view",
      page: "/projects",
      time: "15 minutes ago",
      country: "AU",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
      />

      <div
        className={`transition-all duration-300 ease-in-out relative z-10 ${
          sidebarCollapsed ? "md:ml-16 p-6" : "md:ml-64 pl-12 pr-6 pt-6 pb-6"
        } ml-0`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Analytics
                </h1>
                <p className="text-gray-300">
                  Monitor your website performance and user engagement
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Project Analytics Cards */}
          <div className="space-y-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {project.url}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`${project.uptime >= 99.5 ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}
                    >
                      {project.uptime}% Uptime
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        <div
                          className={`flex items-center text-sm ${project.visitorsChange >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {project.visitorsChange >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(project.visitorsChange)}%
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {project.visitors.toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm">Unique Visitors</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Eye className="h-5 w-5 text-purple-400" />
                        <div
                          className={`flex items-center text-sm ${project.pageViewsChange >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {project.pageViewsChange >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(project.pageViewsChange)}%
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {project.pageViews.toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-sm">Page Views</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <MousePointer className="h-5 w-5 text-orange-400" />
                        <div
                          className={`flex items-center text-sm ${project.bounceRateChange <= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {project.bounceRateChange <= 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(project.bounceRateChange)}%
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {project.bounceRate}%
                      </p>
                      <p className="text-gray-400 text-sm">Bounce Rate</p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Clock className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {project.avgSessionDuration}
                      </p>
                      <p className="text-gray-400 text-sm">Avg. Session</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Top Pages */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium">{page.page}</p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${page.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-white font-medium">
                          {page.views.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {page.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Device Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        {device.device === "Desktop" && (
                          <Monitor className="h-5 w-5 text-blue-400" />
                        )}
                        {device.device === "Mobile" && (
                          <Smartphone className="h-5 w-5 text-green-400" />
                        )}
                        {device.device === "Tablet" && (
                          <Smartphone className="h-5 w-5 text-purple-400" />
                        )}
                        <span className="text-white">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          {device.users.toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {device.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          on {activity.page}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-gray-400 text-xs">
                            {activity.time}
                          </p>
                          <span className="text-gray-500">•</span>
                          <p className="text-gray-400 text-xs">
                            {activity.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
