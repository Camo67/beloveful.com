# Beloveful.com Website

This is the codebase for Beloveful.com, a travel photography website showcasing Tony Menias' work. The site features geographical photo galleries, limited edition prints, workshops, and editorial content.

## Features

- Geographical photo galleries (organized by regions and countries)
- Responsive image grid and lightbox
- Stripe integration for print sales
- Privacy center with region-aware consent tracking
- Mobile-friendly navigation and map integration
- Content management system
- SEO optimization
- Dark/light theme toggle
- Text-to-speech functionality for articles and content

## Tech Stack

- Frontend: React 18, TypeScript, Vite
- Styling: Tailwind CSS, Radix UI, shadcn/ui
- Data fetching: TanStack Query
- Maps: Leaflet with React bindings
- Forms: React Hook Form
- Icons: Lucide React
- Backend: Cloudflare Workers, D1, R2
- Image hosting: Cloudinary
- Text-to-Speech: Google Cloud Text-to-Speech API
- Deployment: Cloudflare Pages (with option for Bluehost)

## Development Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd beloveful.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment files:
   ```bash
   cp .env.example .env.local
   cp .dev.vars.example .dev.vars
   ```

4. Update environment variables in `.env.local` and `.dev.vars` with your actual values, including:
   - `VITE_GOOGLE_TTS_API_KEY` for text-to-speech functionality (optional)

5. Initialize local database:
   ```bash
   npm run db:init:local
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The site will be available at `http://localhost:8080` and the API at `http://localhost:8787`.

### Enhanced Development Experience

For a better development experience with color-coded logs and improved monitoring:

```bash
npm run dev:enhanced
```

### Quick Development Utilities

We've included several utility commands to speed up development:

```bash
# View project status
npm run quick:status

# Clean caches and build artifacts
npm run quick:clean

# Reset the local database
npm run quick:reset-db

# Check images and paths
npm run check:images

# View all available utilities
npm run quick
```

### Text-to-Speech Feature

The site includes a VoiceReader component that enables text-to-speech functionality using Google Cloud Text-to-Speech API:

1. Obtain a Google Cloud account and enable the Text-to-Speech API
2. Create credentials and get an API key
3. Add the key to your `.env.local` file as `VITE_GOOGLE_TTS_API_KEY`
4. Use the `<VoiceReader text="Your text here..." />` component in your pages

### VSCode Snippets

To speed up component creation, we've included custom snippets in `snippets/react.json`. To use them in VSCode:

1. Go to File > Preferences > Configure User Snippets
2. Select "Open User Snippets Folder"
3. Copy the contents of `snippets/react.json` into the appropriate language snippets file

Available snippets:
- `bcomp` - Create a new React component with query hook
- `bhook` - Create API hooks with TanStack Query
- `bpage` - Create a new page component

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Start the development server
- `npm run dev:enhanced` - Start with enhanced logging
- `npm run check:images` - Check image paths and accessibility
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Lint the codebase

Database management:
- `npm run db:init:local` - Initialize local database
- `npm run db:migrate:local` - Apply migrations locally
- `npm run db:reset:local` - Reset local database completely

Image and content management:
- `npm run data:generate` - Generate album data from images
- `npm run portfolio:fetch` - Fetch data from Cloudinary
- `npm run portfolio:audit` - Audit image collection
- `npm run images:list` - List all images

## Project Structure

```
src/
├── components/           # Reusable React components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   └── privacy/         # Privacy compliance logic
│   └── google-voice-service.ts # Google TTS service
├── api/                 # API utilities
├── config/              # Configuration files
└── types/               # TypeScript type definitions
```

## Image Management

Images are organized in the public directory following the structure:
`/images/[Region]/[country-slug]/[image-files]`

Examples:
- `/images/Asia/india/`
- `/images/Europe & Scandinavia/france/`
- `/images/Africa/morocco/`

After adding new images, run `npm run data:generate` to update the album data.

## Privacy Compliance

The site includes a privacy center that implements region-aware consent tracking for GDPR (EU), CCPA (California), and general privacy practices.

## Deployment

The site is designed to deploy to Cloudflare Pages, with a fallback option for Bluehost. See deployment documentation for details.

## Contributing

Feel free to submit issues and enhancement requests. We welcome community contributions to improve the site.