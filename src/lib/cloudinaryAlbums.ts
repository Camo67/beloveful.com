// Proxy to backup Cloudinary dataset until automated build is configured
import cloudinaryUrls from './cloudinary-urls.json';
import { CountryAlbum } from './data';

// Use albums from the main data file which now uses prefix-mapped.json
import { ALBUMS } from './data';

export const CLOUDINARY_ALBUMS = ALBUMS;
