'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Github, 
  MoreHorizontal, 
  Clock, 
  Globe,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    status: 'deployed' | 'building' | 'failed' | 'draft';
    url?: string;
    repository?: string;
    framework: string;
    lastDeploy: string;
    deployments: number;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
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
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'building':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework.toLowerCase()) {
      case 'react':
        return '⚛️';
      case 'vue':
        return '🟢';
      case 'angular':
        return '🔺';
      case 'next.js':
        return '▲';
      case 'nuxt':
        return '💚';
      default:
        return '🌐';
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:border-gray-700 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{getFrameworkIcon(project.framework)}</span>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {project.name}
              </h3>
            </div>
            {project.description && (
              <p className="text-gray-400 text-sm mb-3">{project.description}</p>
            )}
            <div className="flex items-center space-x-2">
              {getStatusIcon(project.status)}
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>{project.deployments} deployments</span>
          <span>{project.lastDeploy}</span>
        </div>

        <div className="flex items-center space-x-2">
          {project.url && (
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Globe className="h-4 w-4 mr-1" />
              Visit
            </Button>
          )}
          {project.repository && (
            <Button 
              size="sm" 
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Github className="h-4 w-4 mr-1" />
              Repo
            </Button>
          )}
          <Button 
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}