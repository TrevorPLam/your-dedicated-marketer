/**
 * Attribution utilities for building URLs with UTM parameters
 * and validating domains
 */

import type { UTMParams, AttributionOptions, ProgramType } from './contracts';

/**
 * Build a URL with UTM parameters
 * @param baseUrl Base URL to add parameters to
 * @param utmParams UTM parameters to add
 * @returns URL with UTM parameters
 */
export function buildUrlWithUTM(baseUrl: string, utmParams: UTMParams): string {
  if (!baseUrl) {
    throw new Error('Base URL is required');
  }

  const url = new URL(baseUrl);
  
  if (utmParams.source) {
    url.searchParams.set('utm_source', utmParams.source);
  }
  if (utmParams.medium) {
    url.searchParams.set('utm_medium', utmParams.medium);
  }
  if (utmParams.campaign) {
    url.searchParams.set('utm_campaign', utmParams.campaign);
  }
  if (utmParams.term) {
    url.searchParams.set('utm_term', utmParams.term);
  }
  if (utmParams.content) {
    url.searchParams.set('utm_content', utmParams.content);
  }

  return url.toString();
}

/**
 * Merge UTM parameters with defaults
 * @param defaults Default UTM parameters
 * @param overrides Override UTM parameters
 * @returns Merged UTM parameters
 */
export function mergeUTMParams(
  defaults: UTMParams,
  overrides?: Partial<UTMParams>
): UTMParams {
  return {
    ...defaults,
    ...overrides,
  };
}

/**
 * Validate a URL against a domain allowlist
 * @param url URL to validate
 * @param allowlist Array of allowed domains
 * @returns True if URL is allowed, false otherwise
 */
export function isUrlAllowed(url: string, allowlist: string[]): boolean {
  if (!url || !allowlist || allowlist.length === 0) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    return allowlist.some(domain => {
      const normalizedDomain = domain.toLowerCase();
      // Exact match or subdomain match
      return hostname === normalizedDomain || hostname.endsWith(`.${normalizedDomain}`);
    });
  } catch (error) {
    // Invalid URL
    return false;
  }
}

/**
 * Extract domain from URL
 * @param url URL to extract domain from
 * @returns Domain or null if invalid
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return null;
  }
}

/**
 * Build a redirect URL for attribution tracking
 * @param options Attribution options
 * @returns Redirect URL or direct URL with attribution
 */
export function buildAttributionUrl(options: AttributionOptions): string {
  const { baseUrl, utm, useRedirect = false, program, allowlist = [] } = options;

  if (!baseUrl) {
    throw new Error('Base URL is required');
  }

  // Validate URL if allowlist is provided
  if (allowlist.length > 0 && !isUrlAllowed(baseUrl, allowlist)) {
    throw new Error(`URL domain not in allowlist: ${extractDomain(baseUrl)}`);
  }

  // Add UTM parameters to base URL
  const urlWithUTM = buildUrlWithUTM(baseUrl, utm);

  // Return direct URL if redirect is not requested
  if (!useRedirect) {
    return urlWithUTM;
  }

  // Build redirect URL
  if (!program) {
    throw new Error('Program type is required when using redirect endpoint');
  }

  const redirectUrl = new URL('/api/redirect', 
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  );
  
  redirectUrl.searchParams.set('to', encodeURIComponent(urlWithUTM));
  redirectUrl.searchParams.set('program', program);

  return redirectUrl.toString();
}

/**
 * Safely encode a URL for use in query parameters
 * @param url URL to encode
 * @returns Encoded URL
 */
export function safeEncodeUrl(url: string): string {
  return encodeURIComponent(url);
}

/**
 * Safely decode a URL from query parameters
 * @param encodedUrl Encoded URL
 * @returns Decoded URL or null if invalid
 */
export function safeDecodeUrl(encodedUrl: string): string | null {
  try {
    return decodeURIComponent(encodedUrl);
  } catch (error) {
    return null;
  }
}

/**
 * Validate UTM parameters
 * @param utm UTM parameters to validate
 * @returns True if valid, false otherwise
 */
export function validateUTMParams(utm: UTMParams): boolean {
  // At minimum, we should have source and medium
  return !!(utm.source && utm.medium);
}

/**
 * Sanitize URL to prevent XSS attacks
 * @param url URL to sanitize
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
    }

    return urlObj.toString();
  } catch (error) {
    return null;
  }
}

/**
 * Build UTM parameters for a specific program
 * @param programType Program type
 * @param defaults Default UTM parameters
 * @param overrides Optional overrides for this program
 * @returns Final UTM parameters
 */
export function buildProgramUTM(
  programType: ProgramType,
  defaults: UTMParams,
  overrides?: Partial<UTMParams>
): UTMParams {
  const programDefaults: Partial<UTMParams> = {
    content: programType,
  };

  return mergeUTMParams(defaults, { ...programDefaults, ...overrides });
}
