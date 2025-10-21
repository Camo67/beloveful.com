import React from 'react';
import LeafletWorldMap, { MapMarker } from '@/components/LeafletWorldMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const demoMarkers: MapMarker[] = [
  { id: '1', position: [30.0444, 31.2357], title: 'Cairo, Egypt', imageUrl: '/images/markers/cairo.jpg', albumSlug: 'africa/cairo' },
  { id: '2', position: [31.7917, -7.0926], title: 'Morocco', imageUrl: '/images/markers/morocco.jpg', albumSlug: 'africa/morocco' },
  { id: '3', position: [22.3193, 114.1694], title: 'Hong Kong', imageUrl: '/images/markers/hong-kong.jpg', albumSlug: 'asia/hong-kong' },
  { id: '4', position: [-13.1631, -72.5450], title: 'Machu Picchu, Peru', imageUrl: '/images/markers/machu-picchu.jpg', albumSlug: 'southamerica/machu-picchu' },
  { id: '5', position: [48.8566, 2.3522], title: 'Paris, France', imageUrl: '/images/markers/paris.jpg', albumSlug: 'europe/paris' },
];

const WorldMapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>World Map</CardTitle>
            <CardDescription>
              Smooth, theme-aware world map ready to link your Cloudinary photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeafletWorldMap markers={demoMarkers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorldMapPage;
