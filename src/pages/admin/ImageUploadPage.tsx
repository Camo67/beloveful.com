import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { CpanelPathUpload } from '@/components/admin/CpanelPathUpload';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const ImageUploadPage = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Array<{ id: number; country: string; region: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          setError('Not authenticated');
          return;
        }

        const response = await fetch('/api/albums/admin/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || 'Failed to load albums');
        }

        setAlbums(data.albums || []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load albums');
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const seedDefaultAlbums = async () => {
    try {
      setIsSeeding(true);
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Not authenticated');
        return;
      }

      const response = await fetch('/api/albums/admin/seed', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to seed albums');
      }

      toast.success(`Seeded albums (inserted ${data.inserted})`);

      // Reload album list
      setLoading(true);
      setError('');
      const albumsResp = await fetch('/api/albums/admin/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const albumsData = await albumsResp.json();
      if (!albumsResp.ok || !albumsData?.success) {
        throw new Error(albumsData?.error || 'Failed to load albums');
      }
      setAlbums(albumsData.albums || []);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to seed albums');
    } finally {
      setIsSeeding(false);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/images">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Images
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">Upload Images</h2>
          <p className="text-muted-foreground">
            Drag-and-drop upload to add new images to your albums
          </p>
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-8">Loading albums...</div>
      ) : albums.length === 0 ? (
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            No albums exist yet. Create the default country/location albums first, then upload images into them.
          </p>
          <Button onClick={seedDefaultAlbums} disabled={isSeeding}>
            {isSeeding ? 'Creating...' : 'Create Default Albums'}
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="local-upload" className="space-y-4">
          <TabsList className="justify-start">
            <TabsTrigger value="local-upload">Local File Upload</TabsTrigger>
            <TabsTrigger value="cpanel-paths">cPanel Path Import</TabsTrigger>
          </TabsList>

          <TabsContent value="local-upload">
            <ImageUpload albums={albums} onUploadComplete={() => navigate('/admin/images')} />
          </TabsContent>

          <TabsContent value="cpanel-paths">
            <CpanelPathUpload albums={albums} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
