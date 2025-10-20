// Proxy to backup Cloudinary dataset until automated build is configured
import { CLOUDINARY_ALBUMS as CLOUDINARY_ALBUMS_BACKUP } from './cloudinaryAlbums.backup';
export const CLOUDINARY_ALBUMS = CLOUDINARY_ALBUMS_BACKUP;
