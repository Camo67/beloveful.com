import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings2 } from 'lucide-react';

type SiteSettings = {
  contact_email: string;
  print_email: string;
  calendly_url: string;
  updated_at?: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  contact_email: 'tony@beloveful.com',
  print_email: 'tony@beloveful.com',
  calendly_url: '',
};

export const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('/api/settings/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(data?.error || 'Failed to load site settings');
        }

        setSettings({
          contact_email: data.settings.contact_email || DEFAULT_SETTINGS.contact_email,
          print_email: data.settings.print_email || DEFAULT_SETTINGS.print_email,
          calendly_url: data.settings.calendly_url || '',
          updated_at: data.settings.updated_at,
        });
      } catch (err: any) {
        setError(err?.message || 'Failed to load site settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/settings/admin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to save site settings');
      }

      setSettings((current) => ({
        ...current,
        updated_at: data.settings.updated_at,
      }));
      setSuccess('Site settings updated successfully.');
    } catch (err: any) {
      setError(err?.message || 'Failed to save site settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading site settings...</div>;
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Site Settings
        </CardTitle>
        <CardDescription>
          Manage contact details and external scheduling links used on the live site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="contact_email">Primary Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email}
              onChange={(event) =>
                setSettings((current) => ({ ...current, contact_email: event.target.value }))
              }
              placeholder="tony@beloveful.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="print_email">Print Inquiry Email</Label>
            <Input
              id="print_email"
              type="email"
              value={settings.print_email}
              onChange={(event) =>
                setSettings((current) => ({ ...current, print_email: event.target.value }))
              }
              placeholder="prints@beloveful.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calendly_url">Calendly URL</Label>
            <Input
              id="calendly_url"
              type="url"
              value={settings.calendly_url}
              onChange={(event) =>
                setSettings((current) => ({ ...current, calendly_url: event.target.value }))
              }
              placeholder="https://calendly.com/..."
            />
          </div>

          {settings.updated_at ? (
            <p className="text-xs text-muted-foreground">
              Last updated {new Date(settings.updated_at).toLocaleString()}
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Site Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
