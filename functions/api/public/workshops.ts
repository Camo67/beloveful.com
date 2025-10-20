// Public API to fetch workshop images from Cloudinary folders
interface Env {
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

interface CloudinaryResource {
  secure_url: string;
  public_id: string;
  folder?: string;
  filename?: string;
}

async function cloudinarySearch(env: Env, expression: string, nextCursor?: string) {
  const auth = btoa(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`);
  const body: any = { expression, max_results: 500, with_field: 'context' };
  if (nextCursor) body.next_cursor = nextCursor;

  const res = await fetch(`https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Cloudinary search failed: ${res.status} ${txt}`);
  }
  return res.json();
}

function groupWorkshopImages(resources: CloudinaryResource[]) {
  // Heuristics by filename/public_id for grouping; adjust as needed
  const toItem = (r: CloudinaryResource) => ({ src: r.secure_url, alt: r.filename || r.public_id.split('/').pop() || 'Workshop image' });

  const chicagoKeywords = ['CHI-', 'Chicago', 'chi-'];

  const byId = (r: CloudinaryResource) => r.public_id.toLowerCase();
  const sorted = [...resources].sort((a,b) => byId(a).localeCompare(byId(b)));

  const containsAny = (s: string, ks: string[]) => ks.some(k => s.includes(k.toLowerCase()));

  const chicago = sorted.filter(r => containsAny(r.public_id.toLowerCase(), chicagoKeywords));

  // Simple split for private/group from filename hints; fallback to same list
  const privateSet = chicago.filter(r => r.public_id.toLowerCase().includes('private'));
  const groupSet = chicago.filter(r => r.public_id.toLowerCase().includes('group'));

  const restChicago = chicago.length ? chicago : sorted;

  return {
    chicagoPrivate: (privateSet.length ? privateSet : restChicago).map(toItem),
    chicagoGroup: (groupSet.length ? groupSet : restChicago).map(toItem),
    online: sorted.map(toItem),
    mentorship: sorted.map(toItem),
  };
}

export async function onRequestGet(context: any): Promise<Response> {
  const { env } = context as { env: Env };
  try {
    // Search primary workshop folder; also include Website beloveful.com and workshop-photos
    const expressions = [
      'folder="home/camo/new/beloveful.com/public/workshop-photos"',
      'folder="home/camo/new/beloveful.com/public/Website beloveful.com" AND filename:"Copy_of_*"',
      'folder="Website beloveful.com" AND filename:"Copy_of_*"'
    ];

    const all: CloudinaryResource[] = [];
    for (const expr of expressions) {
      let next: string | undefined;
      for (let i=0;i<3;i++) { // safety pages
        const data = await cloudinarySearch(env, expr, next);
        const items = (data.resources || []) as any[];
        for (const it of items) {
          all.push({ secure_url: it.secure_url, public_id: it.public_id, folder: it.folder, filename: it.filename });
        }
        next = data.next_cursor;
        if (!next) break;
      }
    }

    // De-duplicate by public_id
    const seen = new Set<string>();
    const dedup = all.filter(r => (seen.has(r.public_id) ? false : (seen.add(r.public_id), true)));

    const grouped = groupWorkshopImages(dedup);

    return new Response(JSON.stringify({ success: true, ...grouped }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message || 'Failed to fetch workshop images' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}