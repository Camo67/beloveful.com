import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { useTheme } from 'next-themes';
import { getAllAlbumsSorted } from '@/lib/data';
import { generateMapMarkers } from '@/lib/map-markers';

// Fix default icon paths for Leaflet in bundlers
// Using CDN fallbacks to prevent 404 errors when local assets aren't found
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MobileMapProps {
  isVisible: boolean;
}

const TileLayerWithFade: React.FC<{ themeMode: 'light' | 'dark'; }> = ({ themeMode }) => {
  const map = useMap();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleZoomStart = () => setOpacity(0.4);
    const handleMoveStart = () => setOpacity(0.7);
    const handleZoomEnd = () => setOpacity(1);
    const handleMoveEnd = () => setOpacity(1);

    map.on('zoomstart', handleZoomStart);
    map.on('movestart', handleMoveStart);
    map.on('zoomend', handleZoomEnd);
    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('zoomstart', handleZoomStart);
      map.off('movestart', handleMoveStart);
      map.off('zoomend', handleZoomEnd);
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);

  const { url, attribution } =
    themeMode === 'dark'
      ? {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      : {
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        };

  return (
    <TileLayer
      url={url}
      attribution={attribution}
      opacity={opacity}
      updateWhenZooming
      updateInterval={50}
      keepBuffer={4}
    />
  );
};

const ClusterLayer: React.FC<{ markers: any[]; }> = ({ markers }) => {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const themeMode: 'light' | 'dark' = (document.documentElement.classList.contains('dark') ? 'dark' : 'light') as any;

  const iconHtml = (title?: string) => `
    <div style="
      width:10px;height:10px;border-radius:50%;
      background:${themeMode === 'dark' ? '#fff' : '#000'};
      box-shadow:0 0 0 2px ${themeMode === 'dark' ? '#000' : '#fff'};
    " title="${title ?? ''}"></div>`;

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      animateAddingMarkers: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    });
    clusterRef.current = cluster;

    markers.forEach((m) => {
      let marker: L.Marker;

      if (m.imageUrl) {
        // create an icon using the imageUrl (thumbnail)
        const icon = L.icon({
          iconUrl: m.imageUrl,
          iconSize: [44, 44],
          className: 'rounded-full border',
        });
        marker = L.marker(m.position, { title: m.title, icon });
        marker.bindPopup(`<div style="max-width:220px"><img src="${m.imageUrl}" style="width:100%;height:auto;border-radius:8px"/><div style="margin-top:6px;font-weight:600">${m.title ?? ''}</div></div>`);
      } else {
        marker = L.marker(m.position, {
          title: m.title,
          icon: L.divIcon({
            className: 'custom-pin',
            html: iconHtml(m.title),
            iconSize: [10, 10],
          }),
        });
        if (m.title) marker.bindPopup(`<div style="padding:4px 6px;font-weight:600">${m.title}</div>`);
      }

      // If marker has an albumSlug, navigate to the album when clicked
      if (m.albumSlug) {
        marker.on('click', () => {
          // open album route in same app
          const slug = m.albumSlug;
          // navigate to region/slug path — if albumSlug contains region prefix just use it
          // We'll try opening /portfolio as a fallback
          const target = `/${slug}`;
          // Use location.assign to allow full page nav (SPA routers will also handle)
          window.location.assign(target);
        });
      }

      cluster.addLayer(marker);
    });

    map.addLayer(cluster);

    return () => {
      map.removeLayer(cluster);
    };
  }, [map, markers]);

  return null;
};

const MobileMap: React.FC<MobileMapProps> = ({ isVisible }) => {
  const { resolvedTheme } = useTheme();
  const themeMode: 'light' | 'dark' = (resolvedTheme === 'dark' ? 'dark' : 'light');
  const albums = getAllAlbumsSorted();
  
  // Generate map markers from albums
  const mapMarkers = useMemo(() => {
    return generateMapMarkers(albums);
  }, [albums]);

  const worldBounds = useMemo(() => L.latLngBounds([-85, -180], [85, 180]), []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        maxBounds={worldBounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="h-full w-full"
        fadeAnimation
        zoomAnimation
        preferCanvas
      >
        <TileLayerWithFade themeMode={themeMode} />
        {mapMarkers.length > 0 && <ClusterLayer markers={mapMarkers} />}
      </MapContainer>
    </div>
  );
};

export default MobileMap;