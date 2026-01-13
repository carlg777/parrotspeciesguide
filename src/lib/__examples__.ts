/**
 * Usage examples for utility modules
 *
 * NOTE: This file demonstrates usage patterns for the utility modules created
 * during Phase 1. Delete this file after migration is complete.
 */

// Import all utilities
import { escapeJsonLd } from './structuredData';
import { truncateWithEllipsis } from './stringUtils';
import { toAbsoluteUrl } from './urlUtils';

/**
 * Example 1: Structured data escaping
 * Replaces: JSON.stringify(data).replace(/</g, '\\u003c')
 */
const exampleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  name: 'Blue and Gold Macaw <Ara ararauna>',
};
const escapedJson = escapeJsonLd(exampleStructuredData);
// Output: {"@context":"https://schema.org","@type":"Article","name":"Blue and Gold Macaw \\u003cAra ararauna>"}

/**
 * Example 2: String truncation with ellipsis
 * Replaces: text.substring(0, 150) or text.slice(0, 120)
 */
const longDescription = 'The Blue and Gold Macaw is a large South American parrot with blue top parts and yellow under parts. It is a member of the large group of neotropical parrots known as macaws. It inhabits forest and woodland of tropical South America.';

const truncated150 = truncateWithEllipsis(longDescription);
// Output: "The Blue and Gold Macaw is a large South American parrot with blue top parts and yellow under parts. It is a member of the large group of neotr..."

const truncated80 = truncateWithEllipsis(longDescription, 80);
// Output: "The Blue and Gold Macaw is a large South American parrot with blue top parts..."

const shortText = 'Short text';
const notTruncated = truncateWithEllipsis(shortText, 150);
// Output: "Short text" (no ellipsis added)

/**
 * Example 3: URL conversion with default site
 * Replaces: `https://www.parrotspeciesguide.com${path}`
 */
const relativeUrl = '/species/blue-and-gold-macaw';
const absoluteUrl = toAbsoluteUrl(relativeUrl);
// Output: "https://www.parrotspeciesguide.com/species/blue-and-gold-macaw"

const urlWithoutSlash = 'uploads/image.jpg';
const absoluteUrl2 = toAbsoluteUrl(urlWithoutSlash);
// Output: "https://www.parrotspeciesguide.com/uploads/image.jpg"

const alreadyAbsolute = 'https://example.com/image.jpg';
const absoluteUrl3 = toAbsoluteUrl(alreadyAbsolute);
// Output: "https://example.com/image.jpg" (unchanged)

/**
 * Example 4: URL conversion with custom site (Astro.site)
 * Future usage pattern for pages after migration
 */
// In page context:
// const siteUrl = Astro.site?.href || 'https://www.parrotspeciesguide.com';
// const canonicalUrl = toAbsoluteUrl('/species/blue-and-gold-macaw', siteUrl);
const customSite = 'https://staging.parrotspeciesguide.com';
const customAbsoluteUrl = toAbsoluteUrl('/species/test', customSite);
// Output: "https://staging.parrotspeciesguide.com/species/test"

/**
 * Example 5: Combined usage in a page
 */
const pageData = {
  title: 'Blue and Gold Macaw - Complete Care Guide and Species Information',
  description: 'Comprehensive guide to the Blue and Gold Macaw (Ara ararauna). Learn about care requirements, behavior, diet, habitat, and conservation status of this stunning parrot species.',
  slug: '/species/blue-and-gold-macaw',
};

// Create structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: pageData.title,
  description: truncateWithEllipsis(pageData.description, 160),
  url: toAbsoluteUrl(pageData.slug),
  image: toAbsoluteUrl('/uploads/blue-and-gold-macaw.jpg'),
};

const jsonLdString = escapeJsonLd(structuredData);
// Ready for embedding: <script type="application/ld+json">{jsonLdString}</script>
