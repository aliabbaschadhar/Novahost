"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Grid3X3, List, SortAsc } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock project data
  const projects = [
    {
      id: "1",
      name: "my-react-app",
      description:
        "A modern React application with TypeScript and Tailwind CSS",
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
      description:
        "Personal portfolio built with Next.js and showcasing my work",
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
    {
      id: "4",
      name: "e-commerce-store",
      description: "Full-stack e-commerce application with payment integration",
      status: "deployed" as const,
      url: "https://e-commerce-store.novahost.app",
      repository: "github.com/user/e-commerce-store",
      framework: "Next.js",
      lastDeploy: "1 day ago",
      deployments: 42,
    },
    {
      id: "5",
      name: "blog-platform",
      description: "Content management system built with Nuxt.js",
      status: "deployed" as const,
      url: "https://blog-platform.novahost.app",
      repository: "github.com/user/blog-platform",
      framework: "Nuxt",
      lastDeploy: "2 days ago",
      deployments: 18,
    },
    {
      id: "6",
      name: "weather-app",
      description: "Real-time weather application with geolocation",
      status: "deployed" as const,
      url: "https://weather-app.novahost.app",
      repository: "github.com/user/weather-app",
      framework: "React",
      lastDeploy: "1 week ago",
      deployments: 7,
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      color: "text-blue-400",
    },
    {
      label: "Active Deployments",
      value: projects.filter((p) => p.status === "deployed").length,
      color: "text-green-400",
    },
    {
      label: "Building",
      value: projects.filter((p) => p.status === "building").length,
      color: "text-blue-400",
    },
    {
      label: "Failed",
      value: projects.filter((p) => p.status === "failed").length,
      color: "text-red-400",
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                <p className="text-gray-300">
                  Manage and monitor all your deployed projects
                </p>
              </div>
              <Link href="/dashboard/new-project">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
                <div className="flex items-center bg-white/5 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`cursor-pointer ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`cursor-pointer ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="py-16 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {searchQuery
                      ? "Try adjusting your search criteria"
                      : "Get started by creating your first project"}
                  </p>
                  {!searchQuery && (
                    <Link href="/dashboard/new-project">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Project
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
