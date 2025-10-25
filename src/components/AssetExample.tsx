import { useEffect, useState } from 'react';
import { loadCloudinaryIndex, loadCloudinaryAsset, loadPortfolioAsset } from '@/lib/assetLoader';

interface CloudinaryIndex {
  summary: {
    considered: number;
    skipped_already_foldered: number;
    matched_regions: number;
    unknown_count: number;
  };
  totals: {
    folders: number;
    assets: number;
  };
  folders: Array<{
    folder: string;
    path: string;
    type: string;
    count: number;
    assetsPath: string;
    region: string;
    country: string;
  }>;
}

export default function AssetExample() {
  const [cloudinaryIndex, setCloudinaryIndex] = useState<CloudinaryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const index = await loadCloudinaryIndex();
        setCloudinaryIndex(index);
        
        // Example of loading a specific asset
        if (index.folders.length > 0) {
          const firstFolder = index.folders[0];
          const folderData = await loadCloudinaryAsset(firstFolder.assetsPath.replace('cloudinary-assets/', ''));
          console.log('First folder data:', folderData);
        }
        
        // Example of loading a portfolio asset (if exists)
        try {
          // Assuming there's a Africa folder with urls.json
          const portfolioData = await loadPortfolioAsset('Africa/urls.json');
          console.log('Portfolio data:', portfolioData);
        } catch (err) {
          console.log('Portfolio asset might not exist or path is incorrect');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cloudinaryIndex) return <div>No data available</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cloudinary Assets</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <ul className="list-disc pl-5">
          <li>Total assets: {cloudinaryIndex.totals.assets}</li>
          <li>Total folders: {cloudinaryIndex.totals.folders}</li>
          <li>Considered: {cloudinaryIndex.summary.considered}</li>
          <li>Unknown: {cloudinaryIndex.summary.unknown_count}</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Folders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cloudinaryIndex.folders.map((folder, index) => (
            <div key={index} className="border p-3 rounded">
              <h4 className="font-medium">{folder.folder}</h4>
              <p>Type: {folder.type}</p>
              <p>Region: {folder.region}</p>
              {folder.country && <p>Country: {folder.country}</p>}
              <p>Count: {folder.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}