'use client';

import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Toggle Button - Fixed positioning */}
      <button
        className={`fixed top-4 z-50 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-2 rounded-lg transition-all hover:bg-white/20 cursor-pointer ${isCollapsed ? 'left-20' : 'left-4'
          }`}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ease-in-out ${isCollapsed
          ? isMobile
            ? '-translate-x-full w-64'
            : 'w-16'
          : 'w-64 translate-x-0'
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center p-6 border-b border-white/10 ${isCollapsed ? 'justify-center p-4' : 'justify-between'}`}>
            {!isCollapsed ? (
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl">NovaHost</span>
              </Link>
            ) : (
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </Link>
            )}
          </div>

          {/* Navigation */}
          <nav className={`flex-1 py-6 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg transition-all duration-200 group cursor-pointer ${isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3 py-2'
                    } ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className={`border-t border-white/10 space-y-2 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <Button
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer ${isCollapsed ? 'justify-center p-3' : 'justify-start'
                }`}
              onClick={() => router.push('/dashboard/new-project')}
              title={isCollapsed ? 'New Project' : undefined}
            >
              <Plus className={`h-4 w-4 ${!isCollapsed ? 'mr-2' : ''}`} />
              {!isCollapsed && 'New Project'}
            </Button>

            <Button
              variant="ghost"
              className={`w-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${isCollapsed ? 'justify-center p-3' : 'justify-start'
                }`}
              onClick={handleLogout}
              title={isCollapsed ? 'Sign out' : undefined}
            >
              <LogOut className={`h-4 w-4 ${!isCollapsed ? 'mr-2' : ''}`} />
              {!isCollapsed && 'Sign out'}
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile when sidebar is open */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}