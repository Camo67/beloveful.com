import { useQuery } from '@tanstack/react-query';

export interface SiteSettings {
  contact_email: string;
  print_email: string;
  calendly_url: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  contact_email: 'tony@beloveful.com',
  print_email: 'tony@beloveful.com',
  calendly_url: import.meta.env.VITE_CALENDLY_LINK ?? '',
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch('/api/settings/public');
    if (!response.ok) {
      return DEFAULT_SETTINGS;
    }

    const data = await response.json();
    if (!data?.success || !data?.settings) {
      return DEFAULT_SETTINGS;
    }

    return {
      contact_email: data.settings.contact_email || DEFAULT_SETTINGS.contact_email,
      print_email: data.settings.print_email || data.settings.contact_email || DEFAULT_SETTINGS.print_email,
      calendly_url: data.settings.calendly_url || DEFAULT_SETTINGS.calendly_url,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: fetchSiteSettings,
    staleTime: 1000 * 60 * 5,
    initialData: DEFAULT_SETTINGS,
  });
}
