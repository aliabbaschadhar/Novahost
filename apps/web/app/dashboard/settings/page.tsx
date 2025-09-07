'use client';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
  Globe,
  Trash2,
  Save,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    deployments: true,
    failures: true,
    security: true,
    updates: false,
  });

  const apiKey = 'nv_1234567890abcdef1234567890abcdef';

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-300">Manage your account and application preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue="Ali Abbas"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue="Chadhar"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="aliabbaschadhar@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-200">Username</Label>
                  <Input
                    id="username"
                    defaultValue="aliabbaschadhar"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white cursor-pointer">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Keys
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your API keys for programmatic access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">Personal Access Token</h4>
                      <p className="text-gray-400 text-sm">Full access to your account</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-black/30 rounded px-3 py-2 font-mono text-sm">
                      <span className="text-gray-300">
                        {showApiKey ? apiKey : '••••••••••••••••••••••••••••••••'}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Generate New Token
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Deployment Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified when deployments succeed</p>
                    </div>
                    <Switch
                      checked={notifications.deployments}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, deployments: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Failure Alerts</h4>
                      <p className="text-gray-400 text-sm">Get notified when deployments fail</p>
                    </div>
                    <Switch
                      checked={notifications.failures}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, failures: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Security Alerts</h4>
                      <p className="text-gray-400 text-sm">Get notified about security events</p>
                    </div>
                    <Switch
                      checked={notifications.security}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, security: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Product Updates</h4>
                      <p className="text-gray-400 text-sm">Get notified about new features</p>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Usage
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">Current Plan</h4>
                      <p className="text-gray-400 text-sm">Pro Plan - $20/month</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300">Active</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Projects</p>
                      <p className="text-white font-medium">6 / 50</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Bandwidth</p>
                      <p className="text-white font-medium">234 GB / 1 TB</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Build Minutes</p>
                      <p className="text-white font-medium">1,240 / 5,000</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white cursor-pointer">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    View Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Change Password</h4>
                      <p className="text-gray-400 text-sm">Update your account password</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-red-500/10 border border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-red-300">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Delete Account</h4>
                    <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
