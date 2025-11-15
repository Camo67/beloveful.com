import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  loadCloudinaryAsset,
  loadCloudinaryIndex,
  loadPortfolioAsset,
} from '@/lib/assetLoader';
import fallbackIndex from '@/lib/cloudinary-assets/index.json';

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
  folders: FolderEntry[];
}

interface FolderEntry {
  folder: string;
  path: string;
  type: string;
  count: number;
  assetsPath: string;
  region?: string;
  country?: string;
  category?: string;
}

interface AssetEntry {
  url: string;
  filename?: string;
  format?: string;
  width?: string;
  height?: string;
  bytes?: string;
}

const encodedFallbackIndex = fallbackIndex as CloudinaryIndex;

function encodePathSegments(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function normalizeAssets(raw: any): AssetEntry[] {
  const list = Array.isArray(raw) ? raw : raw?.assets || [];
  return list
    .map((item: any) => {
      if (!item) return null;
      if (typeof item === 'string') {
        return { url: item };
      }
      const url = item.url || item.secure_url;
      if (!url) return null;
      return {
        url,
        filename: item.filename || item.public_id,
        format: item.format,
        width: typeof item.width === 'number' ? String(item.width) : item.width,
        height:
          typeof item.height === 'number' ? String(item.height) : item.height,
        bytes: typeof item.bytes === 'number' ? String(item.bytes) : item.bytes,
      };
    })
    .filter((entry): entry is AssetEntry => Boolean(entry?.url));
}

const TravelPortfolio = () => {
  const [indexData, setIndexData] = useState<CloudinaryIndex | null>(null);
  const [indexError, setIndexError] = useState<string | null>(null);
  const [loadingIndex, setLoadingIndex] = useState(true);

  const [selectedFolder, setSelectedFolder] = useState<FolderEntry | null>(null);
  const [assets, setAssets] = useState<AssetEntry[]>([]);
  const [assetsError, setAssetsError] = useState<string | null>(null);
  const [loadingAssets, setLoadingAssets] = useState(false);

  const assetCache = useRef<Map<string, AssetEntry[]>>(new Map());
  const pendingRequestId = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const fetchIndex = async () => {
      setLoadingIndex(true);
      setIndexError(null);
      try {
        const remoteIndex = await loadCloudinaryIndex();
        if (!cancelled) {
          setIndexData(remoteIndex as CloudinaryIndex);
        }
      } catch (error) {
        console.warn('Falling back to bundled Cloudinary index', error);
        if (!cancelled) {
          const message =
            error instanceof Error
              ? error.message
              : 'Unable to reach Cloudinary index';
          setIndexError(message);
          setIndexData(encodedFallbackIndex);
        }
      } finally {
        if (!cancelled) {
          setLoadingIndex(false);
        }
      }
    };

    fetchIndex();
    return () => {
      cancelled = true;
    };
  }, []);

  const regions = useMemo(() => {
    if (!indexData) return {};
    const grouped: Record<string, FolderEntry[]> = {};

    for (const folder of indexData.folders) {
      if (folder.type !== 'country') continue;
      const regionName = folder.region || 'Uncategorized';
      if (!grouped[regionName]) {
        grouped[regionName] = [];
      }
      grouped[regionName].push(folder);
    }

    Object.values(grouped).forEach((list) =>
      list.sort((a, b) =>
        (a.country || a.folder).localeCompare(b.country || b.folder),
      ),
    );

    return grouped;
  }, [indexData]);

  const totalCountries = useMemo(
    () =>
      Object.values(regions).reduce((sum, folders) => sum + folders.length, 0),
    [regions],
  );
  const totalImages = indexData?.totals?.assets ?? 0;

  const loadAssetsForSelection = useCallback(
    async (folder: FolderEntry) => {
      setSelectedFolder(folder);
      setAssets([]);
      setAssetsError(null);

      const cacheKey = folder.assetsPath || folder.path || folder.folder;
      if (assetCache.current.has(cacheKey)) {
        setAssets(assetCache.current.get(cacheKey)!);
        return;
      }

      const requestId = ++pendingRequestId.current;
      setLoadingAssets(true);

      try {
        // Try direct Cloudinary asset JSON first
        const cloudinaryPath = folder.assetsPath
          ? folder.assetsPath.replace(/^cloudinary-assets\//, '')
          : null;

        let rawAssets: any = null;
        if (cloudinaryPath) {
          try {
            rawAssets = await loadCloudinaryAsset(
              encodePathSegments(cloudinaryPath),
            );
          } catch (err) {
            console.warn(
              `Cloudinary asset JSON missing for ${folder.folder}, falling back`,
              err,
            );
          }
        }

        if (!rawAssets && folder.region && folder.country) {
          const fallbackPath = `${folder.region}/${folder.country}/urls.json`;
          rawAssets = await loadPortfolioAsset(
            encodePathSegments(fallbackPath),
          );
        }

        if (!rawAssets) {
          throw new Error(
            'No assets are available for this folder yet. Please try another country.',
          );
        }

        const normalized = normalizeAssets(rawAssets);
        if (!normalized.length) {
          throw new Error('Assets loaded but no valid image URLs were found.');
        }

        if (pendingRequestId.current !== requestId) {
          return;
        }

        assetCache.current.set(cacheKey, normalized);
        setAssets(normalized);
      } catch (error) {
        if (pendingRequestId.current !== requestId) {
          return;
        }
        const message =
          error instanceof Error ? error.message : 'Failed to load images.';
        setAssetsError(message);
      } finally {
        if (pendingRequestId.current === requestId) {
          setLoadingAssets(false);
        }
      }
    },
    [],
  );

  if (loadingIndex) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-32 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!indexData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-red-600">
          We could not load Cloudinary data right now. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Travel Portfolio
        </h1>
        <p className="text-gray-600">
          {totalCountries} countries • {totalImages} curated images
        </p>
        {indexError && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            {indexError}. Showing the cached Cloudinary index that ships with
            the app.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 h-[calc(100vh-12rem)]">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-24 h-full overflow-y-auto">
            {Object.keys(regions).length === 0 ? (
              <div className="p-4 text-sm text-gray-500">
                No country folders detected in Cloudinary yet.
              </div>
            ) : (
              Object.entries(regions).map(([region, countries]) => (
                <div key={region} className="border-b last:border-0">
                  <h2 className="font-semibold p-4 bg-gray-50 border-b">
                    {region}
                  </h2>
                  <ul className="divide-y">
                    {countries.map((country) => {
                      const isActive =
                        selectedFolder?.folder === country.folder;
                      return (
                        <li key={country.folder}>
                          <button
                            type="button"
                            onClick={() => loadAssetsForSelection(country)}
                            className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                              isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="font-medium">
                              {country.country || country.folder}
                            </span>
                            <span className="text-sm text-gray-500">
                              {country.count} images
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          {selectedFolder ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedFolder.country || selectedFolder.folder}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Folder: {selectedFolder.folder} • Expected images:{' '}
                    {selectedFolder.count}
                  </p>
                </div>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setSelectedFolder(null);
                    setAssets([]);
                    setAssetsError(null);
                  }}
                >
                  ← Back to all regions
                </button>
              </div>

              {assetsError && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {assetsError}
                </div>
              )}

              {loadingAssets ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-48 rounded-lg bg-gray-200 animate-pulse"
                    />
                  ))}
                </div>
              ) : assets.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {assets.map((asset, index) => (
                    <div
                      key={`${asset.url}-${index}`}
                      className="rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={asset.url}
                        alt={
                          asset.filename ||
                          `${selectedFolder.country || 'Travel'} image ${index + 1
                          }`
                        }
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      {asset.filename && (
                        <div className="px-3 py-2 text-xs text-gray-600 truncate">
                          {asset.filename}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-500">
                  No images found for this country yet.
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                Select a region and country to view travel photos
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                We will pull the latest Cloudinary assets on demand and cache
                them locally for faster browsing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPortfolio;
