import { GENERATED_ALBUMS } from '../lib/generatedAlbums';
import { getAlbumsByRegion } from '../lib/data';
import { B2Test } from '../components/B2Test';

export default function Debug() {
  const africaAlbums = getAlbumsByRegion('Africa');
  const egyptAlbum = africaAlbums.find(album => album.slug === 'egypt');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug Information</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>B2 System Test</h2>
        <B2Test />
      </div>
      
      <h2>Generated Albums</h2>
      <p>Total generated albums: {GENERATED_ALBUMS.length}</p>
      
      <h2>Africa Albums</h2>
      <p>Total Africa albums: {africaAlbums.length}</p>
      {africaAlbums.map(album => (
        <div key={album.slug}>
          <h3>{album.country} ({album.slug})</h3>
          <p>Images: {album.images.length}</p>
        </div>
      ))}
      
      <h2>Egypt Album Detail</h2>
      {egyptAlbum ? (
        <div>
          <p>Egypt images: {egyptAlbum.images.length}</p>
          <h3>First 3 images:</h3>
          {egyptAlbum.images.slice(0, 3).map((img, idx) => (
            <div key={idx}>
              <p>Image {idx + 1}: {img.desktop}</p>
              <img src={img.desktop} alt={`Egypt ${idx}`} style={{maxWidth: '200px'}} />
            </div>
          ))}
        </div>
      ) : (
        <p>Egypt album not found!</p>
      )}
    </div>
  );
}