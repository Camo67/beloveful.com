# Beloveful – Style Spec (v1)

1) Logo
- Variants: Full (mark + wordmark), Icon (mark only), Mono (wordmark only)
- Files: public/logo/beloveful-logo-full.svg, -icon.svg, -mono.svg
- Usage:
  - Light bg: text-black
  - Dark bg: text-white
  - Size: h-6 md:h-10 w-auto; preserveAspectRatio set to avoid stretching

2) Typography
- Font stack: Inter, Poppins, ui-sans-serif, system-ui
- Weights: 300/400/600
- Sizes:
  - Title: clamp(2.25rem, 4vw, 3.5rem)
  - Body: 1.125rem; UI: 1rem; Caption: 0.9375rem

3) Colors (CSS variables)
- background: hsl(0 0% 100%), dark: hsl(0 0% 5%)
- foreground: hsl(0 0% 5%), dark: hsl(0 0% 98%)
- border: hsl(0 0% 88%) (dark: 20%)
- accent-neutral: hsl(222 13% 25%)

4) Spacing and Layout
- Header: desktop px-6 py-3; mobile p-3
- Logo: reduced from h-16/40 to h-6/10
- Card containers: no background, no shadow, no border (content-card)
- Dropdown: subtle border, shadow-md, rounded-md

5) Imagery
- Dedup: Remove thumbnails/NGG exports ("nggid", 120x90/180x0) and duplicates; keep first high-quality Cloudinary URL
- Slideshow: 14s duration, subtle Ken Burns; protection enabled

6) Accessibility
- Focus ring: accent-neutral
- Prefers-reduced-motion respected
- Contrast targets ≥ 4.5:1 for text
