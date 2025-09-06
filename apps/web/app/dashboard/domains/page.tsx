'use client';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Plus,
  Search,
  ExternalLink,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

interface Domain {
  id: string;
  domain: string;
  status: 'active' | 'pending' | 'error' | 'expired';
  ssl: boolean;
  autoRenew: boolean;
  expiresAt: string;
  projectName: string;
  lastChecked: string;
}

const mockDomains: Domain[] = [
  {
    id: '1',
    domain: 'myapp.novahost.dev',
    status: 'active',
    ssl: true,
    autoRenew: true,
    expiresAt: '2024-12-31',
    projectName: 'My React App',
    lastChecked: '2 minutes ago'
  },
  {
    id: '2',
    domain: 'api.myproject.com',
    status: 'pending',
    ssl: false,
    autoRenew: true,
    expiresAt: '2024-11-15',
    projectName: 'API Server',
    lastChecked: '5 minutes ago'
  },
  {
    id: '3',
    domain: 'dashboard.startup.io',
    status: 'active',
    ssl: true,
    autoRenew: false,
    expiresAt: '2024-10-20',
    projectName: 'Startup Dashboard',
    lastChecked: '1 minute ago'
  },
  {
    id: '4',
    domain: 'old-site.example.com',
    status: 'error',
    ssl: false,
    autoRenew: false,
    expiresAt: '2024-09-01',
    projectName: 'Legacy Site',
    lastChecked: '1 hour ago'
  }
];

export default function DomainsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [domains] = useState<Domain[]>(mockDomains);

  const filteredDomains = domains.filter(domain =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Domain['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-300"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-300"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-300"><AlertCircle className="h-3 w-3 mr-1" />Error</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500/20 text-gray-300"><AlertCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      default:
        return null;
    }
  };

  const activeDomains = domains.filter(d => d.status === 'active').length;
  const totalDomains = domains.length;
  const sslEnabled = domains.filter(d => d.ssl).length;

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

      <DashboardSidebar />

      <div className="md:ml-64 p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Domains</h1>
                <p className="text-gray-300">Manage your custom domains and SSL certificates</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Add Domain
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Globe className="h-8 w-8 text-blue-400" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-white">{activeDomains}</p>
                      <p className="text-gray-300">Active Domains</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-400" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-white">{sslEnabled}</p>
                      <p className="text-gray-300">SSL Enabled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-purple-400" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-white">{totalDomains}</p>
                      <p className="text-gray-300">Total Domains</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Domains Table */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Domain Management</CardTitle>
              <CardDescription className="text-gray-300">
                Configure and monitor your custom domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium text-lg">{domain.domain}</h3>
                          {getStatusBadge(domain.status)}
                          {domain.ssl && (
                            <Badge className="bg-green-500/20 text-green-300">
                              <Shield className="h-3 w-3 mr-1" />
                              SSL
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-300 space-y-1 sm:space-y-0 sm:space-x-4">
                          <span>Project: {domain.projectName}</span>
                          <span>Expires: {domain.expiresAt}</span>
                          <span>Last checked: {domain.lastChecked}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:text-red-200 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {domain.status === 'error' && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                          <span className="text-red-300 text-sm">
                            DNS configuration error. Please check your domain settings.
                          </span>
                        </div>
                      </div>
                    )}

                    {domain.status === 'pending' && (
                      <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="text-yellow-300 text-sm">
                            Domain verification in progress. This may take up to 24 hours.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredDomains.length === 0 && (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No domains found</h3>
                    <p className="text-gray-400 mb-4">
                      {searchTerm ? 'No domains match your search.' : 'You haven\'t added any domains yet.'}
                    </p>
                    {!searchTerm && (
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Domain
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SSL Certificate Info */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                SSL Certificates
              </CardTitle>
              <CardDescription className="text-gray-300">
                Automatic SSL certificate management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Auto SSL</h4>
                    <p className="text-gray-400 text-sm">Automatically provision and renew SSL certificates</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-2">Certificate Authority</h5>
                    <p className="text-gray-300">Let's Encrypt</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-2">Renewal Period</h5>
                    <p className="text-gray-300">90 days (auto-renew)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
