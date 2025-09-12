"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  MoreHorizontal,
  Clock,
  Globe,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    status: "deployed" | "building" | "failed" | "draft";
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
      case "deployed":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "building":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "building":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework.toLowerCase()) {
      case "react":
        return "⚛️";
      case "vue":
        return "🟢";
      case "angular":
        return "🔺";
      case "next.js":
        return "▲";
      case "nuxt":
        return "💚";
      default:
        return "🌐";
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">
                {getFrameworkIcon(project.framework)}
              </span>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {project.name}
              </h3>
            </div>
            {project.description && (
              <p className="text-gray-300 text-sm mb-3">
                {project.description}
              </p>
            )}
            <div className="flex items-center space-x-2">
              {getStatusIcon(project.status)}
              <Badge
                variant="outline"
                className={getStatusColor(project.status)}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span>{project.deployments} deployments</span>
          <span>{project.lastDeploy}</span>
        </div>

        <div className="flex items-center space-x-2">
          {project.url && (
            <Button
              size="sm"
              variant="outline"
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Globe className="h-4 w-4 mr-1" />
              Visit
            </Button>
          )}
          {project.repository && (
            <Button
              size="sm"
              variant="outline"
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Github className="h-4 w-4 mr-1" />
              Repo
            </Button>
          )}
          <Button
            size="sm"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white flex-1 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
