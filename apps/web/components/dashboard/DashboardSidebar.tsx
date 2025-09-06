'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Zap,
  LayoutDashboard,
  Rocket,
  Github,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface DashboardSidebarProps {
  isCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export function DashboardSidebar({ isCollapsed: externalCollapsed, onToggle }: DashboardSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Use external state if provided, otherwise use internal state
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle(!isCollapsed);
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: Rocket },
    { name: 'Deployments', href: '/dashboard/deployments', icon: Github },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Handle logout logic
    router.push('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-black/50 backdrop-blur-sm border border-white/20 text-white p-2 rounded-lg transition-all hover:bg-black/70 cursor-pointer"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      {/* Desktop toggle button */}
      <button
        className="hidden md:block fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-2 rounded-lg transition-all hover:bg-black/70 cursor-pointer"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">NovaHost</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Button
              className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
              onClick={() => router.push('/dashboard/new-project')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}