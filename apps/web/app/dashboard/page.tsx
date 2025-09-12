"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { UptimeMonitor } from "@/components/dashboard/UptimeMonitor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Rocket,
  Globe,
  Clock,
  TrendingUp,
  Users,
  Activity,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    //Redirect to login if not authenticated
    if (status === "unauthenticated") {
      useRouter().push("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return null; // Don't render anything if not authenticated
  }
  // Mock data
  const projects = [
    {
      id: "1",
      name: "my-react-app",
      description: "A modern React application with TypeScript",
      status: "deployed" as const,
      url: "https://my-react-app.novahost.app",
      repository: "github.com/user/my-react-app",
      framework: "React",
      lastDeploy: "2 minutes ago",
      deployments: 24,
    },
    {
      id: "2",
      name: "portfolio-site",
      description: "Personal portfolio built with Next.js",
      status: "building" as const,
      repository: "github.com/user/portfolio",
      framework: "Next.js",
      lastDeploy: "1 hour ago",
      deployments: 8,
    },
    {
      id: "3",
      name: "vue-dashboard",
      description: "Admin dashboard using Vue 3 and Composition API",
      status: "failed" as const,
      repository: "github.com/user/vue-dashboard",
      framework: "Vue",
      lastDeploy: "3 hours ago",
      deployments: 15,
    },
  ];

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: Rocket,
      change: "+2 this month",
      color: "text-blue-500",
    },
    {
      title: "Deployments",
      value: "47",
      icon: Globe,
      change: "+8 this week",
      color: "text-emerald-500",
    },
    {
      title: "Build Time",
      value: "2.4s",
      icon: Clock,
      change: "-0.8s avg",
      color: "text-purple-500",
    },
    {
      title: "Uptime",
      value: "99.9%",
      icon: Activity,
      change: "Last 30 days",
      color: "text-green-500",
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
      <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />

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
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-300">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-white/10 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Uptime Monitor */}
          <div className="mb-8">
            <UptimeMonitor
              variant="dashboard"
              title="Application Uptime"
              subtitle="Last 24 Hours"
              currentUptime={99.8}
              averageUptime={99.6}
              showStats={true}
              className="w-full"
            />
          </div>

          {/* Recent Deployments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest deployments and builds
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      project: "my-react-app",
                      status: "deployed",
                      time: "2 minutes ago",
                      commit: "Update header styles",
                    },
                    {
                      project: "portfolio-site",
                      status: "building",
                      time: "1 hour ago",
                      commit: "Add new project section",
                    },
                    {
                      project: "vue-dashboard",
                      status: "failed",
                      time: "3 hours ago",
                      commit: "Fix API integration",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "deployed"
                            ? "bg-emerald-500"
                            : activity.status === "building"
                              ? "bg-blue-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.project}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {activity.commit}
                        </p>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Import from Git
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Team Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              {/* Add New Project Card */}
              <Card className="bg-gray-900/30 border-gray-700 border-dashed hover:bg-gray-900/50 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center min-h-[200px]">
                  <div className="bg-gray-800 group-hover:bg-emerald-600 p-4 rounded-full mb-4 transition-colors duration-300">
                    <Plus className="h-8 w-8 text-gray-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-400 group-hover:text-white mb-2 transition-colors">
                    Create New Project
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Deploy a new project from Git or start from a template
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
