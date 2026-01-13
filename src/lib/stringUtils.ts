/**
 * String manipulation utilities
 */

/**
 * Truncates text to specified length, appending ellipsis only if truncated
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation (default: 150)
 * @returns Truncated text with ellipsis if shortened, original if within limit
 */
export function truncateWithEllipsis(text: string, maxLength: number = 150): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}
