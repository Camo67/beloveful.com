import { CountryAlbum } from './data';
import type { LatLngExpression } from 'leaflet';

// Marker centers (lat/lng) keyed by album slug to avoid case/typo mismatches in `country` labels.
// Expand this as you add new locations.
const COORDS_BY_SLUG: Record<string, LatLngExpression> = {
  argentina: [-34.6037, -58.3816], // Buenos Aires
  jordan: [31.9539, 35.9106], // Amman
  india: [28.6139, 77.209], // New Delhi
  spain: [40.4168, -3.7038], // Madrid
  france: [48.8566, 2.3522], // Paris
  greece: [37.9838, 23.7275], // Athens
  italy: [41.9028, 12.4964], // Rome
  portugal: [38.7223, -9.1393], // Lisbon
  'uk-ireland': [51.5074, -0.1278], // London (proxy for UK & Ireland)
  chicago: [41.8379, -87.6828],
  'new-york': [40.7143, -74.006],
  'puerto-rico': [18.4655, -66.1057], // San Juan
  caribbean: [18.2208, -66.5901], // Caribbean (proxy)
  cuba: [21.5218, -77.7812], // Havana
  mexico: [19.4326, -99.1332], // Mexico City
  morocco: [31.7917, -7.0926], // Morocco
  egypt: [30.0444, 31.2357], // Cairo
  ethiopia: [9.145, 40.4897], // Ethiopia (national center)
  'south-africa': [-25.7479, 28.2293], // Pretoria
  namibia: [-22.5609, 17.0658], // Windhoek
  nepal: [27.7172, 85.324], // Kathmandu
  thailand: [13.7563, 100.5018], // Bangkok
  vietnam: [21.0278, 105.8342], // Hanoi
  'hong-kong': [22.3193, 114.1694],
  japan: [35.6762, 139.6503], // Tokyo
  myanmar: [19.7633, 96.0785], // Naypyidaw
  'israel-palestine': [31.7683, 35.2137], // Jerusalem (proxy)
  phillipines: [14.5995, 120.9842], // Manila (legacy slug)
};

function normalizeSlug(input: string): string {
  return (input || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to generate map markers from album data
export function generateMapMarkers(albums: CountryAlbum[]): any[] {
  return (albums as CountryAlbum[])
    .filter(
      (album) =>
        album.region !== 'Erasing Borders' &&
        album.region !== 'Logo' &&
        Array.isArray(album.images) &&
        album.images.length > 0,
    )
    .map((album: CountryAlbum) => {
      const slug = normalizeSlug(album.slug || album.country);
      const position = COORDS_BY_SLUG[slug] || [20, 0];

      // Use the mobile variant for marker thumbnails to save bandwidth.
      const imageUrl = album.images?.[0]?.mobile || album.images?.[0]?.desktop || undefined;
      const regionSlug = album.region.toLowerCase().replace(/[^a-z]/g, "");

      return {
        id: album.slug,
        position,
        title: `${album.country}, ${album.region}`,
        imageUrl,
        regionSlug,
        countrySlug: album.slug,
      };
    });
}
