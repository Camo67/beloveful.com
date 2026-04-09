# Development Quick Start Guide for Beloveful.com

This guide contains tips and tricks to help you develop faster on the beloveful.com project.

## Quick Commands

### Essential Commands
- `npm run dev` - Start the development server
- `npm run dev:enhanced` - Start with enhanced logging and clearer output
- `npm run quick` - Access quick development utilities
- `npm run quick:status` - View project status
- `npm run quick:clean` - Clean caches and build artifacts
- `npm run quick:reset-db` - Reset the local database
- `npm run build` - Create a production build

### Image and Album Management
- `npm run portfolio:fetch` - Fetch from Cloudinary
- `npm run data:generate` - Generate album data from images
- `npm run images:list` - List all images
- `npm run portfolio:audit` - Audit image collection
- `npm run portfolio:cleanup` - Clean up image filenames

### Database Commands
- `npm run db:init:local` - Initialize local database
- `npm run db:migrate:local` - Apply schema migrations locally
- `npm run db:reset:local` - Completely reset local DB

## Development Tips

### 1. Faster Iteration Cycle
- Use `npm run dev:enhanced` for better process monitoring
- Leverage hot module replacement (HMR) by editing components
- Keep the React DevTools and browser dev tools open during development
- Use TanStack Query dev tools for API debugging (`http://localhost:8080/__rq-devtools`)

### 2. Efficient Image Management
- Store images in `/public/images/[Region]/[country-slug]/` format
- Use lowercase country names (e.g., `/images/Asia/india/`, not `/images/Asia/India/`)
- Remember to regenerate album data after adding new images: `npm run data:generate`

### 3. Debugging
- Enable TanStack Query devtools by visiting `http://localhost:8080/__rq-devtools`
- Use `console.log` in combination with browser dev tools
- Check the API responses at `http://localhost:8787/api/*`
- Use the `npm run images:serve` command to serve images locally for testing

### 4. Common Issues and Solutions

#### Port Conflicts
- The dev script automatically finds available ports
- If you encounter issues, manually kill processes: `lsof -ti:8080 | xargs kill -9`

#### Slow Build Times
- The Vite config excludes many files from watching to improve performance
- If builds are still slow, clean the cache: `npm run quick:clean`

#### Image Loading Issues
- Ensure your image paths follow the format: `/images/[Region]/[country-slug]/image.jpg`
- Check that region names have proper capitalization and country names are lowercase
- Make sure to run `npm run data:generate` after adding new images

### 5. Key Project Structure

```
src/
├── components/           # Reusable React components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
│   └── privacy/         # Privacy compliance logic
├── api/                 # API utilities
├── config/              # Configuration files
└── types/               # TypeScript type definitions
```

### 6. VSCode Shortcuts and Extensions

Recommended extensions:
- TypeScript, JavaScript, React/JSX snippets
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Cloudinary extension for image management

Useful shortcuts:
- `Ctrl+Shift+P` -> "TypeScript: Restart TS Server" when TS gets confused
- `Ctrl+Shift+P` -> "Developer: Reload Window" to refresh everything
- Use "Go to Symbol in Workspace" (`Ctrl+T`) to find files quickly

### 7. Performance Optimization

- Components use memoization to prevent unnecessary renders
- API requests are cached with TanStack Query
- Images are optimized through Cloudinary's CDN
- Use React DevTools Profiler to identify performance bottlenecks

### 8. Troubleshooting

If the development server becomes unresponsive:
```bash
# Clean caches
npm run quick:clean

# Kill any lingering processes
lsof -ti:8080,8787 | xargs kill -9

# Restart development environment
npm run dev
```

For database issues:
```bash
# Reset the local database
npm run quick:reset-db
```

Remember: If you make changes to the database schema, update `server/schema.sql` and run migration commands.