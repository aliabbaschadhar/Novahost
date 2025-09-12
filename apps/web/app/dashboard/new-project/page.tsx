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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Github,
  ArrowLeft,
  Search,
  ExternalLink,
  GitBranch,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [step, setStep] = useState(1);
  const [repoUrl, setRepoUrl] = useState("");

  // Mock repository data
  const repositories = [
    {
      name: "my-awesome-app",
      description:
        "A modern React application with TypeScript and Tailwind CSS",
      language: "TypeScript",
      stars: 42,
      lastUpdated: "2 days ago",
      private: false,
    },
    {
      name: "portfolio-website",
      description: "Personal portfolio built with Next.js",
      language: "JavaScript",
      stars: 8,
      lastUpdated: "1 week ago",
      private: true,
    },
    {
      name: "vue-dashboard",
      description: "Admin dashboard using Vue 3 and Composition API",
      language: "Vue",
      stars: 15,
      lastUpdated: "3 days ago",
      private: false,
    },
  ];

  const frameworks = [
    {
      name: "React",
      icon: "⚛️",
      description: "A JavaScript library for building user interfaces",
      preset: "create-react-app",
    },
    {
      name: "Next.js",
      icon: "▲",
      description: "The React framework for production",
      preset: "nextjs",
    },
    {
      name: "Vue.js",
      icon: "🟢",
      description: "The progressive JavaScript framework",
      preset: "vue",
    },
    {
      name: "Angular",
      icon: "🔺",
      description: "Platform for building mobile and desktop applications",
      preset: "angular",
    },
    {
      name: "Nuxt.js",
      icon: "💚",
      description: "The intuitive Vue framework",
      preset: "nuxtjs",
    },
    {
      name: "Static HTML",
      icon: "🌐",
      description: "Plain HTML, CSS, and JavaScript",
      preset: "static",
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

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:6rem_6rem]" />

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create New Project
            </h1>
            <p className="text-gray-400">
              Deploy your project in seconds with zero configuration.
            </p>
          </div>

          {/* Steps */}
          <div className="flex items-center space-x-4 mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step > stepNumber ? "bg-emerald-600" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Import Git Repository
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect your GitHub repository for continuous deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="https://github.com/username/repository"
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                        <Github className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => setStep(2)}
                      >
                        Import
                      </Button>
                    </div>

                    <div className="text-center text-gray-500 text-sm">
                      or select from your repositories
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Search className="h-4 w-4" />
                        <Input
                          placeholder="Search repositories..."
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      {repositories.map((repo, index) => (
                        <Card
                          key={index}
                          className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-semibold text-white">
                                    {repo.name}
                                  </h3>
                                  {repo.private && (
                                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                      Private
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                  {repo.description}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>{repo.language}</span>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 mr-1" />
                                    {repo.stars}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {repo.lastUpdated}
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => setStep(2)}
                              >
                                Import
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-gray-500 mb-4">
                  Don't have a repository? Start with a template
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {frameworks.map((framework, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:border-emerald-500/50 transition-all cursor-pointer group"
                      onClick={() => setStep(2)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{framework.icon}</div>
                        <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {framework.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {framework.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Configure Project</CardTitle>
                <CardDescription className="text-gray-400">
                  Set up your project settings and deployment configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-gray-300">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="my-awesome-project"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="framework" className="text-gray-300">
                      Framework Preset
                    </Label>
                    <select className="w-full h-10 px-3 rounded-md bg-gray-800 border-gray-700 text-white">
                      <option>Auto-detect</option>
                      <option>React</option>
                      <option>Next.js</option>
                      <option>Vue.js</option>
                      <option>Angular</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buildCommand" className="text-gray-300">
                    Build Command
                  </Label>
                  <Input
                    id="buildCommand"
                    placeholder="npm run build"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outputDirectory" className="text-gray-300">
                    Output Directory
                  </Label>
                  <Input
                    id="outputDirectory"
                    placeholder="dist"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <label className="text-gray-300 text-sm">
                    Enable automatic deployments on push
                  </label>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setStep(3)}
                  >
                    Deploy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Deploying your project...
                </h3>
                <p className="text-gray-400 mb-6">
                  This usually takes 30-60 seconds
                </p>

                <div className="space-y-2 text-left max-w-md mx-auto">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-300">Cloning repository</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">
                      Installing dependencies
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-500">Building project</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-500">Deploying to edge</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
