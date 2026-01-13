/**
 * URL utilities for structured data and canonical references
 *
 * Migration Note: Enhanced during Phase 1 to support dynamic site configuration.
 * Existing pages will be migrated to use Astro.site?.href in subsequent plans.
 */

/**
 * Converts a relative or absolute URL to a fully qualified absolute URL
 * @param maybeUrl - URL string (relative or absolute) or null/undefined
 * @param siteUrl - Base site URL (default: 'https://www.parrotspeciesguide.com')
 *                  Pass Astro.site?.href from page context for dynamic configuration
 * @returns Absolute URL with domain, or undefined if input is null/undefined
 *
 * @example
 * toAbsoluteUrl('/uploads/image.jpg') // => 'https://www.parrotspeciesguide.com/uploads/image.jpg'
 * toAbsoluteUrl('uploads/image.jpg') // => 'https://www.parrotspeciesguide.com/uploads/image.jpg'
 * toAbsoluteUrl('https://example.com/image.jpg') // => 'https://example.com/image.jpg'
 * toAbsoluteUrl(null) // => undefined
 * toAbsoluteUrl('/path', Astro.site?.href) // => Uses site config from astro.config.mjs
 *
 * Migration Note: Function accepts optional siteUrl parameter for centralized URL management.
 * Callers should pass Astro.site?.href when available. Default fallback provided for
 * backward compatibility during migration period.
 */
export const toAbsoluteUrl = (
  maybeUrl: string | undefined | null,
  siteUrl: string = 'https://www.parrotspeciesguide.com'
): string | undefined => {
  if (!maybeUrl) return undefined;

  // Already absolute - return as-is
  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;

  // Normalize to leading slash
  const normalized = maybeUrl.startsWith("/") ? maybeUrl : `/${maybeUrl}`;

  // Remove trailing slash from siteUrl if present
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  // Prepend domain
  return `${baseUrl}${normalized}`;
};
