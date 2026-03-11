import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Album {
  id: number;
  country: string;
  region: string;
  slug: string;
}

interface ImportSummary {
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  set_pin_thumbnail: boolean;
  create_missing_albums: boolean;
  base_url: string;
}

interface ImportResult {
  status: 'imported' | 'skipped' | 'error';
  input: string;
  reason?: string;
  album_id?: number;
  album_region?: string;
  album_country?: string;
  image_id?: number;
  public_url?: string;
}

interface CpanelImportResponse {
  success: boolean;
  summary?: ImportSummary;
  results?: ImportResult[];
  error?: string;
}

interface CpanelPathUploadProps {
  albums: Album[];
}

export const CpanelPathUpload = ({ albums }: CpanelPathUploadProps) => {
  const [pathsText, setPathsText] = useState('');
  const [baseUrl, setBaseUrl] = useState('/Website%20beloveful.com');
  const [createMissingAlbums, setCreateMissingAlbums] = useState(true);
  const [setPinThumbnail, setSetPinThumbnail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<CpanelImportResponse | null>(null);

  const parsedPaths = useMemo(
    () =>
      pathsText
        .split(/\r?\n/g)
        .map((line) => line.trim())
        .filter(Boolean),
    [pathsText],
  );

  const importPaths = async () => {
    if (!parsedPaths.length) {
      toast.error('Paste at least one cPanel image path');
      return;
    }

    setIsSubmitting(true);
    setReport(null);

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Not authenticated');
        return;
      }

      const response = await fetch('/api/images/upload-cpanel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paths: parsedPaths,
          base_url: baseUrl,
          create_missing_albums: createMissingAlbums,
          set_pin_thumbnail: setPinThumbnail,
        }),
      });

      const data = (await response.json()) as CpanelImportResponse;
      setReport(data);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to import cPanel paths');
      }

      const imported = data.summary?.imported ?? 0;
      const failed = data.summary?.failed ?? 0;
      if (imported > 0) {
        toast.success(`Imported ${imported} image${imported === 1 ? '' : 's'} from cPanel paths`);
      }
      if (failed > 0) {
        toast.warning(`${failed} path${failed === 1 ? '' : 's'} failed to import`);
      }
      if (imported === 0 && failed === 0) {
        toast.info('No new images were imported');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to import cPanel paths');
    } finally {
      setIsSubmitting(false);
    }
  };

  const summary = report?.summary;
  const results = report?.results || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import From cPanel Paths</CardTitle>
          <CardDescription>
            Paste one path per line. Region and country are auto-detected from paths like
            {' '}
            <code>/Website beloveful.com/Africa/Egypt/DSCF1234.jpg</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cpanel-base-url">Public Base URL</Label>
              <Input
                id="cpanel-base-url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="/Website%20beloveful.com"
              />
              <p className="text-xs text-muted-foreground">
                Used when pasted paths are local/server paths instead of full URLs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="create-missing-albums"
                  checked={createMissingAlbums}
                  onCheckedChange={(checked) => setCreateMissingAlbums(Boolean(checked))}
                />
                <div className="space-y-1">
                  <Label htmlFor="create-missing-albums">Auto-create missing country albums</Label>
                  <p className="text-xs text-muted-foreground">
                    If an album does not exist for a parsed region/country, create it automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="set-pin-thumbnail"
                  checked={setPinThumbnail}
                  onCheckedChange={(checked) => setSetPinThumbnail(Boolean(checked))}
                />
                <div className="space-y-1">
                  <Label htmlFor="set-pin-thumbnail">Auto-set map pin thumbnail per country</Label>
                  <p className="text-xs text-muted-foreground">
                    First imported image per country is promoted for Portfolio map thumbnail.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpanel-paths">
              cPanel Paths
              {' '}
              <span className="text-muted-foreground">({parsedPaths.length} queued)</span>
            </Label>
            <Textarea
              id="cpanel-paths"
              rows={10}
              value={pathsText}
              onChange={(e) => setPathsText(e.target.value)}
              placeholder={[
                '/Website beloveful.com/Africa/Egypt/DSCF1234.jpg',
                '/Website beloveful.com/Africa/Egypt/DSCF1235.jpg',
                '/Website beloveful.com/Asia/Japan/IMG_0001.webp',
              ].join('\n')}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Existing albums available:
              {' '}
              <strong>{albums.length}</strong>
            </p>
            <Button onClick={importPaths} disabled={isSubmitting || parsedPaths.length === 0}>
              {isSubmitting ? 'Importing...' : 'Import Paths'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Import Report</CardTitle>
            <CardDescription>
              {summary.total}
              {' '}
              processed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Imported: {summary.imported}</Badge>
              <Badge variant="secondary">Skipped: {summary.skipped}</Badge>
              <Badge variant={summary.failed > 0 ? 'destructive' : 'outline'}>
                Failed: {summary.failed}
              </Badge>
              <Badge variant="outline">Base URL: {summary.base_url}</Badge>
            </div>

            <div className="max-h-80 overflow-y-auto rounded-md border">
              <div className="divide-y">
                {results.map((result, index) => (
                  <div key={`${result.input}-${index}`} className="space-y-1 p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          result.status === 'imported'
                            ? 'default'
                            : result.status === 'error'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {result.status}
                      </Badge>
                      {result.album_region && result.album_country && (
                        <span className="text-muted-foreground">
                          {result.album_region}
                          {' / '}
                          {result.album_country}
                        </span>
                      )}
                    </div>
                    <p className="break-all font-mono text-xs">{result.input}</p>
                    {result.reason && <p className="text-xs text-muted-foreground">{result.reason}</p>}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
