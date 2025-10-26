import { CountryAlbum } from './data';

// Coordinates for various locations around the world
const LOCATION_COORDINATES: Record<string, [number, number]> = {
  // Africa
  'Egypt': [26.8206, 30.8025],
  'Ethiopia': [9.1450, 40.4897],
  'Morocco': [31.7917, -7.0926],
  'Namibia': [-22.9576, 18.4904],
  'South Africa': [-30.5595, 22.9375],
  
  // Asia
  'Hong Kong': [22.3193, 114.1694],
  'Japan': [36.2048, 138.2529],
  'Myanmar': [21.9162, 95.9560],
  'Nepal': [28.3949, 84.1240],
  'Thailand': [15.8700, 100.9925],
  'Vietnam': [14.0583, 108.2772],
  
  // Middle East
  'Jordan': [30.5852, 36.2384],
  
  // North America
  'Chicago': [41.8781, -87.6298],
  'New York': [40.7128, -74.0060],
  
  // South America
  'Argentina': [-38.4161, -63.6167],
  
  // Default (center of the map)
  'default': [20, 0]
};

// Function to get coordinates for a country
function getCoordinatesForCountry(country: string): [number, number] {
  return LOCATION_COORDINATES[country] || LOCATION_COORDINATES['default'];
}

// Function to generate map markers from album data
export function generateMapMarkers(albums: CountryAlbum[]): any[] {
  return (albums as CountryAlbum[])
    .filter(album => album.region !== 'Erasing Borders' && album.region !== 'Logo')
    .map((album: CountryAlbum) => {
      // Get coordinates for the country
      const position = getCoordinatesForCountry(album.country);
      
      // Use the first image as the marker image
      const imageUrl = album.images.length > 0 ? album.images[0].desktop : undefined;
      
      return {
        id: album.slug,
        position,
        title: `${album.country}, ${album.region}`,
        imageUrl,
        region: album.region,
        country: album.slug
      };
    });
}