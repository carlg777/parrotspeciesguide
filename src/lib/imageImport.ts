import type { ImageMetadata } from 'astro';

// Import all images from the src/assets directory
// We include common image formats
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/**/*.{jpeg,jpg,png,gif,webp}');

export function getImageImport(path: string) {
    // Convert public path to src path if needed
    // e.g. "/assets/img/parrots/budgie.webp" -> "/src/assets/img/parrots/budgie.webp"
    // e.g. "assets/img/parrots/budgie.webp" -> "/src/assets/img/parrots/budgie.webp"

    let normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // If it points to public assets, map it to src assets
    if (normalizedPath.startsWith('/assets/img/')) {
        normalizedPath = normalizedPath.replace('/assets/img/', '/src/assets/img/');
    }

    if (!images[normalizedPath]) {
        console.error(`Image not found: ${normalizedPath}`);
        // Fallback or re-throw depending on preference. 
        // Throwing ensures we catch missing images at build time (if used in getStaticPaths) 
        // or runtime (dev).
        throw new Error(`Image not found in src/assets: ${normalizedPath}`);
    }

    return images[normalizedPath]();
}
