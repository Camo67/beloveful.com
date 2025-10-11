# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a photography portfolio website called "Beloveful Visions" built with modern web technologies. It's a React-based single-page application showcasing travel photography organized by regions and countries, with additional sections for workshops, print shop, and contact information.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes for theme management
- **Deployment**: Cloudflare Workers (configured via wrangler.toml)

## Common Development Commands

### Development
```bash
# Start development server (runs on port 8080)
npm run dev

# Install dependencies
npm install
```

### Building
```bash
# Production build
npm run build

# Development build (preserves debug info)
npm run build:dev

# Preview production build locally
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# ESLint is configured to ignore unused TypeScript variables
# and uses React Hooks and React Refresh plugins
```

### Testing
This project currently has no test suite configured. Consider adding Vitest for unit testing if implementing new features.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui component library
│   ├── Header.tsx      # Navigation header
│   ├── Slideshow.tsx   # Home page slideshow
│   ├── Gallery.tsx     # Image gallery component
│   ├── Lightbox.tsx    # Image lightbox modal
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Home page with slideshow
│   ├── Portfolio.tsx   # Portfolio overview
│   ├── CountryGallery.tsx  # Individual country galleries
│   ├── About.tsx       # About page
│   ├── Workshops.tsx   # Workshops page
│   ├── PrintShop.tsx   # Print shop page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
├── lib/                # Utility libraries
│   ├── data.ts         # Photo data and types
│   ├── images.ts       # Image utilities
│   └── utils.ts        # General utilities
├── hooks/              # Custom React hooks
│   ├── use-toast.ts    # Toast notifications
│   └── use-mobile.tsx  # Mobile detection
├── api/                # API-related code (if any)
└── App.tsx             # Main app component with routing
```

## Key Architecture Patterns

### Data Structure
The photography portfolio is organized using a hierarchical structure:
- **Regions**: Africa, Asia, Middle East, South America, North America, Europe, Oceania, Erasing Borders
- **Countries**: Each region contains multiple countries
- **Albums**: Each country has an album with multiple images

Data is centrally managed in `src/lib/data.ts` with TypeScript interfaces:
- `CountryAlbum`: Represents a country's photo collection
- `SlideshowImage`: Home page slideshow images
- `Region`: Type union for all geographical regions

### Routing Structure
```
/ (Index)                    # Home with slideshow
/portfolio                   # Portfolio overview
/portfolio/:region/:country  # Individual country galleries  
/about                       # About page
/workshops                   # Workshops page
/print-shop                  # Print shop
/shop/special               # Special edition shop
/contact                    # Contact page
/* (NotFound)               # 404 catch-all
```

### Component Architecture
- **App.tsx**: Root component with providers (QueryClient, ThemeProvider, TooltipProvider)
- **Pages**: Route-level components that compose smaller components
- **Components**: Reusable UI components, many from shadcn/ui
- **Custom Components**: Gallery, Lightbox, Header, Slideshow for photography-specific functionality

### Image Management
- All images hosted on Cloudinary CDN
- Responsive images with separate desktop/mobile URLs
- Images organized by country codes (e.g., EGY-, CHI-, HK-)
- Image data structured in arrays for easy management and display

### Styling System
- Uses Tailwind CSS with custom design tokens
- CSS variables for theming (colors, font sizes, transitions)
- shadcn/ui provides consistent component styling
- Custom color palette with overlay and hover states
- Responsive design with mobile-first approach

## Development Notes

### Adding New Countries/Regions
To add new photography content:
1. Add images to Cloudinary CDN
2. Update `ALBUMS` array in `src/lib/data.ts` with new `CountryAlbum` entry
3. Follow naming convention: `{COUNTRY-CODE}-{NUMBER}` for image filenames
4. Ensure both desktop and mobile image URLs are provided

### Component Development
- Use shadcn/ui components as building blocks
- Follow existing patterns in `/components/ui/` for new UI components  
- Custom components should be placed in `/components/` root
- Import paths use `@/` alias for `src/` directory

### Deployment
- Configured for Cloudflare Workers deployment via wrangler.toml
- Custom domain: beloveful.com (with www redirect)
- Build artifacts go to `dist/` directory
- No server-side rendering - pure client-side React app

### Development Server
- Vite dev server runs on port 8080
- Hot module replacement enabled
- TypeScript type checking integrated
- Component auto-tagging for development (lovable-tagger)

## Important Files to Understand

- `src/lib/data.ts`: Central data store for all photography content
- `src/App.tsx`: App structure, routing, and provider setup  
- `components.json`: shadcn/ui configuration
- `tailwind.config.ts`: Tailwind CSS customization and design tokens
- `vite.config.ts`: Build tool configuration
- `wrangler.toml`: Cloudflare Workers deployment config