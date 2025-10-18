import { ImageManager } from '@/components/ImageManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ImageUploadPage = () => {
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
          <h2 className="text-2xl font-bold">B2 Image Manager</h2>
          <p className="text-muted-foreground">
            Upload and manage images with Backblaze B2 storage
          </p>
        </div>
      </div>

      {/* B2 Image Manager */}
      <div className="bg-white dark:bg-gray-800 rounded-lg">
        <ImageManager />
      </div>
    </div>
  );
};
