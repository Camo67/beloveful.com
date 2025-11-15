import { CountryAlbum } from './data';
import type { CountryCode } from '@/types/map';
import { COUNTRY_COORDS } from '@/lib/map-mappings';

// Function to get coordinates for a country
function getCoordinatesForCountry(countryCode: CountryCode) {
  return COUNTRY_COORDS[countryCode];
}

// Function to generate map markers from album data
export function generateMapMarkers(albums: CountryAlbum[]): any[] {
  const countryCodeMap: Record<string, CountryCode> = {
    'Argentina': 'ARG',
    'Jordan': 'JOR',
    'India': 'IND',
    'Spain': 'ESP',
    'France': 'FRA',
    'Greece': 'GRC',
    'Italy': 'ITA',
    'Portugal': 'PRT',
    'UK & Ireland': 'GBR',
    'Chicago': 'CHI',
    'New York': 'NYC',
    'Puerto Rico': 'PRI',
    'Caribbean': 'CAR',
    'Cuba': 'CUB',
    'Mexico': 'MEX',
    'Morocco': 'MAR',
    'Egypt': 'EGY',
    'Ethiopia': 'ETH',
    'South Africa': 'ZAF',
    'Namibia': 'NAM',
    'Nepal': 'NPL',
    'Thailand': 'THA',
    'Vietnam': 'VNM',
    'Hong Kong': 'HKG',
    'Japan': 'JPN',
    'Myanmar': 'MMR'
  };

  return (albums as CountryAlbum[])
    .filter(album => album.region !== 'Erasing Borders' && album.region !== 'Logo')
    .map((album: CountryAlbum) => {
      const countryCode = countryCodeMap[album.country];
      
      // Get coordinates for the country
      const position = countryCode ? 
        [getCoordinatesForCountry(countryCode).lat, getCoordinatesForCountry(countryCode).lng] : 
        [20, 0]; // Default center if country not found
      
      const imageUrl =
        album.images.length > 0 ? album.images[0].desktop : undefined;
      const regionSlug = album.region.toLowerCase().replace(/[^a-z]/g, "");

      return {
        id: album.slug,
        position,
        title: `${album.country}, ${album.region}`,
        imageUrl,
        regionSlug,
        countrySlug: album.slug,
        countryCode
      };
    });
}
