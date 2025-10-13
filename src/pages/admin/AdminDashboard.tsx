import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Image, 
  FileText, 
  Palette, 
  Activity,
  TrendingUp,
  Users,
  Plus
} from 'lucide-react';

interface DashboardStats {
  albums: number;
  images: number;
  slideshowImages: number;
  contentBlocks: number;
  publishedAlbums: number;
  publishedImages: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    albums: 0,
    images: 0,
    slideshowImages: 0,
    contentBlocks: 0,
    publishedAlbums: 0,
    publishedImages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      // Fetch stats from various endpoints
      const [albumsRes, imagesRes, slideshowRes] = await Promise.all([
        fetch('/api/albums/admin/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/images/admin/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/images/admin/slideshow/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const albumsData = await albumsRes.json();
      const imagesData = await imagesRes.json();
      const slideshowData = await slideshowRes.json();

      if (albumsData.success && imagesData.success && slideshowData.success) {
        setStats({
          albums: albumsData.albums.length,
          publishedAlbums: albumsData.albums.filter((a: any) => a.is_published).length,
          images: imagesData.images.length,
          publishedImages: imagesData.images.filter((i: any) => i.is_published).length,
          slideshowImages: slideshowData.images.length,
          contentBlocks: 0, // Would fetch from content API
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Albums',
      value: stats.albums,
      published: stats.publishedAlbums,
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/albums'
    },
    {
      title: 'Images',
      value: stats.images,
      published: stats.publishedImages,
      icon: Image,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/images'
    },
    {
      title: 'Slideshow',
      value: stats.slideshowImages,
      published: stats.slideshowImages,
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/slideshow'
    },
    {
      title: 'Content Blocks',
      value: stats.contentBlocks,
      published: stats.contentBlocks,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/content'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Album',
      description: 'Create a new photo album',
      icon: Camera,
      href: '/admin/albums/new'
    },
    {
      title: 'Upload Images',
      description: 'Add images to existing albums',
      icon: Image,
      href: '/admin/images/upload'
    },
    {
      title: 'Manage Slideshow',
      description: 'Update homepage slideshow',
      icon: Palette,
      href: '/admin/slideshow'
    },
    {
      title: 'Edit Content',
      description: 'Update page content blocks',
      icon: FileText,
      href: '/admin/content'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} to={card.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  {card.published < card.value ? (
                    <p className="text-xs text-muted-foreground">
                      {card.published} published
                    </p>
                  ) : (
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      All published
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.href}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates to your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">System initialized</p>
                  <p className="text-xs text-muted-foreground">
                    Content management system is ready
                  </p>
                </div>
              </div>
              
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Activity will appear here as you make changes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Migration Helper */}
      <Card>
        <CardHeader>
          <CardTitle>Migration from Static Data</CardTitle>
          <CardDescription>
            Import your existing albums and images into the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">
                Import your current album data from the static files to get started with the CMS.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This will create database entries for all your existing content.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};