/**
 * Structured data utilities for JSON-LD embedding
 *
 * Migration Note: Created during Phase 1 to reduce duplication.
 * Existing pages will be migrated to use these utilities in subsequent plans.
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
