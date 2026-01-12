/**
 * URL utilities for structured data and canonical references
 */

/**
 * Converts a relative or absolute URL to a fully qualified absolute URL
 * @param maybeUrl - URL string (relative or absolute) or null/undefined
 * @returns Absolute URL with domain, or undefined if input is null/undefined
 *
 * @example
 * toAbsoluteUrl('/uploads/image.jpg') // => 'https://www.findyourparrot.com/uploads/image.jpg'
 * toAbsoluteUrl('uploads/image.jpg') // => 'https://www.findyourparrot.com/uploads/image.jpg'
 * toAbsoluteUrl('https://example.com/image.jpg') // => 'https://example.com/image.jpg'
 * toAbsoluteUrl(null) // => undefined
 */
export const toAbsoluteUrl = (maybeUrl: string | undefined | null): string | undefined => {
  if (!maybeUrl) return undefined;

  // Already absolute - return as-is
  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;

  // Normalize to leading slash
  const normalized = maybeUrl.startsWith("/") ? maybeUrl : `/${maybeUrl}`;

  // Prepend domain
  return `https://www.findyourparrot.com${normalized}`;
};
