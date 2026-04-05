import { ContentBlocksManager } from '@/components/admin/ContentBlocksManager';
import { SiteSettingsManager } from '@/components/admin/SiteSettingsManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  BookOpenText,
  CalendarDays,
  CircleHelp,
  Home,
  Image as ImageIcon,
  Info,
  Mail,
  Settings2,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type ContentFolder = {
  key: string;
  label: string;
  description: string;
  livePath?: string;
  pageKey?: string;
  icon: LucideIcon;
  relatedLinks?: Array<{ label: string; href: string }>;
  type?: 'content' | 'settings';
};

const CONTENT_FOLDERS: ContentFolder[] = [
  {
    key: 'home',
    label: 'Home',
    description: 'Homepage copy and hero text.',
    livePath: '/',
    pageKey: 'home',
    icon: Home,
    relatedLinks: [{ label: 'Homepage Slideshow', href: '/admin/slideshow' }],
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    description: 'Portfolio landing text, albums, and image folders.',
    livePath: '/portfolio',
    pageKey: 'portfolio',
    icon: ImageIcon,
    relatedLinks: [
      { label: 'Portfolio Albums', href: '/admin/albums' },
      { label: 'Portfolio Images', href: '/admin/images' },
    ],
  },
  {
    key: 'projects',
    label: 'Projects',
    description: 'Project page text and featured project messaging.',
    livePath: '/projects',
    pageKey: 'projects',
    icon: Briefcase,
  },
  {
    key: 'workshops',
    label: 'Workshops',
    description: 'Workshop headlines, descriptions, and calls to action.',
    livePath: '/workshops',
    pageKey: 'workshops',
    icon: BookOpenText,
  },
  {
    key: 'events',
    label: 'Events',
    description: 'Event page text blocks and messaging.',
    livePath: '/events',
    pageKey: 'events',
    icon: CalendarDays,
  },
  {
    key: 'about',
    label: 'About',
    description: 'Biography, artist statement, and about-page copy.',
    livePath: '/about',
    pageKey: 'about',
    icon: Info,
  },
  {
    key: 'contact',
    label: 'Contact',
    description: 'Contact page text and intro messaging.',
    livePath: '/contact',
    pageKey: 'contact',
    icon: Mail,
  },
  {
    key: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions and helpful notes.',
    livePath: '/faq',
    pageKey: 'faq',
    icon: CircleHelp,
  },
  {
    key: 'open-edition',
    label: 'Open Edition',
    description: 'Open edition shop copy and supporting text.',
    livePath: '/open-edition',
    pageKey: 'open-edition',
    icon: ShoppingBag,
  },
  {
    key: 'print-shop',
    label: 'Print Shop',
    description: 'Print shop copy and sales messaging.',
    livePath: '/print-shop',
    pageKey: 'print-shop',
    icon: ShoppingBag,
  },
  {
    key: 'site-settings',
    label: 'Site Settings',
    description: 'Global contact emails and scheduling links used across the site.',
    icon: Settings2,
    type: 'settings',
  },
];

export const ContentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedKey = searchParams.get('section') || 'home';

  const activeFolder = useMemo(() => {
    return CONTENT_FOLDERS.find((folder) => folder.key === selectedKey) || CONTENT_FOLDERS[0];
  }, [selectedKey]);

  const selectFolder = (key: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('section', key);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Website Content Folders</h2>
        <p className="text-muted-foreground">
          Navigate the backend the same way you think about the website. Pick a folder below to edit that section.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CONTENT_FOLDERS.map((folder) => {
          const Icon = folder.icon;
          const isActive = folder.key === activeFolder.key;

          return (
            <button
              key={folder.key}
              type="button"
              onClick={() => selectFolder(folder.key)}
              className={`rounded-xl border p-5 text-left transition-all ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-accent/20'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`rounded-lg p-2 ${isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{folder.label}</h3>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {folder.type === 'settings' ? 'Global Settings' : `/${folder.key}`}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{folder.description}</p>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{activeFolder.label}</CardTitle>
          <CardDescription>{activeFolder.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          {activeFolder.livePath ? (
            <Button variant="outline" onClick={() => window.open(activeFolder.livePath, '_blank')}>
              View Live Page
            </Button>
          ) : null}

          {activeFolder.relatedLinks?.map((link) => (
            <Button key={link.href} asChild variant="secondary">
              <Link to={link.href}>{link.label}</Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {activeFolder.type === 'settings' ? (
        <SiteSettingsManager />
      ) : (
        <ContentBlocksManager
          forcedPageKey={activeFolder.pageKey}
          hidePageSelector
          title={`${activeFolder.label} Folder`}
          description={`Edit the saved text blocks for ${activeFolder.label}. These blocks are organized like folders so the backend matches the website structure.`}
        />
      )}
    </div>
  );
};
