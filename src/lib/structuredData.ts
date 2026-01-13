/**
 * Structured data utilities for JSON-LD embedding
 */

/**
 * Escapes JSON for safe embedding in HTML script tags
 * Prevents XSS by escaping < characters that could break out of script context
 * @param data - Object to serialize to JSON-LD
 * @returns JSON string with escaped < characters
 */
export function escapeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
