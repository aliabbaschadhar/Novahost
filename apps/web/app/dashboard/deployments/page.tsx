'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  ExternalLink,
  GitBranch,
  Calendar,
  Timer,
  RefreshCw
} from 'lucide-react';

export default function DeploymentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock deployment data
  const deployments = [
    {
      id: '1',
      project: 'my-react-app',
      commit: 'feat: add user authentication',
      commitHash: 'a3b2c1d',
      branch: 'main',
      status: 'deployed' as const,
      url: 'https://my-react-app-abc123.novahost.app',
      deployedAt: '2 minutes ago',
      duration: '45s',
      initiator: 'aliabbaschadhar',
    },
    {
      id: '2',
      project: 'portfolio-site',
      commit: 'update: redesign landing page',
      commitHash: 'f4e5d6c',
      branch: 'main',
      status: 'building' as const,
      deployedAt: '5 minutes ago',
      duration: '1m 20s',
      initiator: 'aliabbaschadhar',
    },
    {
      id: '3',
      project: 'vue-dashboard',
      commit: 'fix: API integration issues',
      commitHash: 'g7h8i9j',
      branch: 'develop',
      status: 'failed' as const,
      deployedAt: '1 hour ago',
      duration: '30s',
      initiator: 'aliabbaschadhar',
      error: 'Build failed: Missing environment variables',
    },
    {
      id: '4',
      project: 'my-react-app',
      commit: 'chore: update dependencies',
      commitHash: 'k1l2m3n',
      branch: 'main',
      status: 'deployed' as const,
      url: 'https://my-react-app-def456.novahost.app',
      deployedAt: '3 hours ago',
      duration: '1m 15s',
      initiator: 'aliabbaschadhar',
    },
    {
      id: '5',
      project: 'portfolio-site',
      commit: 'feat: add blog section',
      commitHash: 'o4p5q6r',
      branch: 'feature/blog',
      status: 'deployed' as const,
      url: 'https://portfolio-site-ghi789.novahost.app',
      deployedAt: '1 day ago',
      duration: '2m 10s',
      initiator: 'aliabbaschadhar',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'building':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'building':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

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

      <div className={`transition-all duration-300 ease-in-out relative z-10 ${sidebarCollapsed ? 'md:ml-16 p-6' : 'md:ml-64 pl-12 pr-6 pt-6 pb-6'
        } ml-0`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Deployments</h1>
                <p className="text-gray-300">Track and manage your deployment history</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Deployments List */}
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <Card key={deployment.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(deployment.status)}
                          <Badge variant="outline" className={getStatusColor(deployment.status)}>
                            {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-white font-semibold">{deployment.project}</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-300 mb-2">{deployment.commit}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <GitBranch className="h-4 w-4" />
                            <span>{deployment.branch}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-mono">{deployment.commitHash}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{deployment.deployedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Timer className="h-4 w-4" />
                            <span>{deployment.duration}</span>
                          </div>
                        </div>
                      </div>

                      {deployment.error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-red-300 text-sm">{deployment.error}</p>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        {deployment.url && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          View Logs
                        </Button>
                        {deployment.status === 'failed' && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
                          >
                            Redeploy
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Deployed by</p>
                      <p className="text-white font-medium">{deployment.initiator}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              Load More Deployments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
