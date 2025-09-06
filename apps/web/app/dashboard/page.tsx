'use client';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Rocket, 
  Globe, 
  Clock, 
  TrendingUp,
  Users,
  Activity,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  // Mock data
  const projects = [
    {
      id: '1',
      name: 'my-react-app',
      description: 'A modern React application with TypeScript',
      status: 'deployed' as const,
      url: 'https://my-react-app.novahost.app',
      repository: 'github.com/user/my-react-app',
      framework: 'React',
      lastDeploy: '2 minutes ago',
      deployments: 24,
    },
    {
      id: '2',
      name: 'portfolio-site',
      description: 'Personal portfolio built with Next.js',
      status: 'building' as const,
      repository: 'github.com/user/portfolio',
      framework: 'Next.js',
      lastDeploy: '1 hour ago',
      deployments: 8,
    },
    {
      id: '3',
      name: 'vue-dashboard',
      description: 'Admin dashboard using Vue 3 and Composition API',
      status: 'failed' as const,
      repository: 'github.com/user/vue-dashboard',
      framework: 'Vue',
      lastDeploy: '3 hours ago',
      deployments: 15,
    },
  ];

  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      icon: Rocket,
      change: '+2 this month',
      color: 'text-blue-500',
    },
    {
      title: 'Deployments',
      value: '47',
      icon: Globe,
      change: '+8 this week',
      color: 'text-emerald-500',
    },
    {
      title: 'Build Time',
      value: '2.4s',
      icon: Clock,
      change: '-0.8s avg',
      color: 'text-purple-500',
    },
    {
      title: 'Uptime',
      value: '99.9%',
      icon: Activity,
      change: 'Last 30 days',
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DashboardSidebar />
      
      <div className="md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-gray-400">Here's what's happening with your projects today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-800 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Deployments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest deployments and builds
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { project: 'my-react-app', status: 'deployed', time: '2 minutes ago', commit: 'Update header styles' },
                    { project: 'portfolio-site', status: 'building', time: '1 hour ago', commit: 'Add new project section' },
                    { project: 'vue-dashboard', status: 'failed', time: '3 hours ago', commit: 'Fix API integration' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'deployed' ? 'bg-emerald-500' :
                        activity.status === 'building' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.project}</p>
                        <p className="text-gray-400 text-sm">{activity.commit}</p>
                      </div>
                      <div className="text-gray-500 text-sm">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Zap className="h-4 w-4 mr-2" />
                  Import from Git
                </Button>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
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