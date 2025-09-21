"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  FolderOpen,
  BarChart3,
  Rocket,
  Globe,
  Settings,
  Plus,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { LogoWithText, Logo } from "@/components/ui/logo";

interface DashboardSidebarProps {
  isCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export function DashboardSidebar({
  isCollapsed: externalCollapsed,
  onToggle,
}: DashboardSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use external state if provided, otherwise use internal state
  const isCollapsed =
    externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle(!isCollapsed);
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return session?.user?.email?.[0]?.toUpperCase() || "U";
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
    { name: "Deployments", href: "/dashboard/deployments", icon: Rocket },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (status === "loading") {
    return (
      <div className="flex h-full w-64 flex-col bg-gray-900 border-r border-gray-800">
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <div className="animate-pulse bg-gray-700 h-8 w-32 rounded"></div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-700 h-10 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button - Fixed positioning */}
      <button
        className={`fixed top-4 z-50 bg-white/10 backdrop-blur-sm border border-white/20 text-white p-2 rounded-lg transition-all hover:bg-white/20 cursor-pointer ${isCollapsed ? "left-20" : "left-4"
          }`}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ease-in-out ${isCollapsed
            ? isMobile
              ? "-translate-x-full w-64"
              : "w-16"
            : "w-64 translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center p-6 border-b border-white/10 ${isCollapsed ? "justify-center p-4" : "justify-between"}`}
          >
            {!isCollapsed ? (
              <LogoWithText
                width={24}
                height={24}
                variant="white"
                textSize="text-xl"
                className="hover:opacity-80 transition-opacity"
                animate={true}
              />
            ) : (
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <Logo
                  width={24}
                  height={24}
                  variant="white"
                  animate={true}
                />
              </Link>
            )}
          </div>

          {/* Navigation */}
          <nav
            className={`flex-1 py-6 space-y-2 ${isCollapsed ? "px-2" : "px-4"}`}
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg transition-all duration-200 group cursor-pointer ${isCollapsed ? "justify-center p-3" : "space-x-3 px-3 py-2"
                    } ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon
                    className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div
            className={`border-t border-white/10 space-y-2 ${isCollapsed ? "p-2" : "p-4"}`}
          >
            <Button
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer ${isCollapsed ? "justify-center p-3" : "justify-start"
                }`}
              onClick={() => router.push("/dashboard/new-project")}
              title={isCollapsed ? "New Project" : undefined}
            >
              <Plus className={`h-4 w-4 ${!isCollapsed ? "mr-2" : ""}`} />
              {!isCollapsed && "New Project"}
            </Button>

            <Button
              variant="ghost"
              className={`w-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${isCollapsed ? "justify-center p-3" : "justify-start"
                }`}
              onClick={handleLogout}
              title={isCollapsed ? "Sign out" : undefined}
            >
              <LogOut className={`h-4 w-4 ${!isCollapsed ? "mr-2" : ""}`} />
              {!isCollapsed && "Sign out"}
            </Button>
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-800 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full p-2 h-auto hover:bg-gray-800 ${isCollapsed ? "flex justify-center items-center" : "justify-start"}`}
                >
                  <div
                    className={`flex items-center w-full ${isCollapsed ? "justify-center" : "space-x-3"}`}
                  >
                    <Avatar className="h-8 w-8" />
                    {/* Only show name/email if not collapsed */}
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white truncate">
                          {session?.user?.name || "User"}
                        </p>
                        <p
                          className="text-xs text-gray-400 truncate block max-w-[140px] md:max-w-[180px]"
                          title={session?.user?.email as string}
                        >
                          {session?.user?.email}
                        </p>
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  {/* Avatar content */}
                  <span className="sr-only">Open user menu</span>
                  <span className="absolute">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-800 border-gray-700"
              >
                <DropdownMenuLabel className="text-gray-200">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
