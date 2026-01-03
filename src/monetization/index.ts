/**
 * Monetization Module
 * 
 * Entry point for the monetization module that provides gift cards,
 * loyalty/rewards, and membership functionality through platform link-outs.
 */

import type { SalonConfig, MonetizationLinks, ValidationResult } from './contracts';
import { getPlatformAdapter } from './platformRegistry';

/**
 * Get monetization links for a salon configuration
 * 
 * This is the main entry point for the module. It takes a salon config
 * and returns properly formatted, attributed links for all monetization programs.
 * 
 * @param config Complete salon configuration
 * @returns Monetization links for all programs
 * @throws Error if configuration is invalid
 * 
 * @example
 * ```typescript
 * const config = {
 *   platform: 'square',
 *   links: {
 *     giftCards: { purchaseUrl: 'https://square.site/book/ABC/gift-cards' },
 *     membership: { purchaseUrl: 'https://square.site/book/ABC/membership' }
 *   },
 *   utm: {
 *     defaults: { source: 'website', medium: 'referral', campaign: 'monetization' }
 *   },
 *   security: {
 *     allowedDomains: ['square.site', 'squareup.com']
 *   }
 * };
 * 
 * const links = getMonetizationLinks(config);
 * // Use links.giftCards.url, links.membership.url, etc.
 * ```
 */
export function getMonetizationLinks(config: SalonConfig): MonetizationLinks {
  // Validate configuration first
  const validation = validateConfiguration(config);
  
  if (!validation.valid) {
    const errorMessages = validation.errors.map(e => `${e.field}: ${e.message}`).join(', ');
    throw new Error(`Invalid configuration: ${errorMessages}`);
  }

  // Get appropriate platform adapter
  const adapter = getPlatformAdapter(config.platform);
  
  // Generate links using the adapter
  return adapter.getMonetizationLinks(config);
}

/**
 * Validate a salon configuration
 * 
 * Validates the configuration and returns any errors or warnings.
 * Use this before calling getMonetizationLinks to check for issues.
 * 
 * @param config Configuration to validate
 * @returns Validation result with errors and warnings
 * 
 * @example
 * ```typescript
 * const validation = validateConfiguration(config);
 * 
 * if (!validation.valid) {
 *   console.error('Configuration errors:', validation.errors);
 * }
 * 
 * if (validation.warnings.length > 0) {
 *   console.warn('Configuration warnings:', validation.warnings);
 * }
 * ```
 */
export function validateConfiguration(config: SalonConfig): ValidationResult {
  const adapter = getPlatformAdapter(config.platform);
  return adapter.validateConfig(config);
}

// Re-export commonly used types and utilities
export type {
  SalonConfig,
  MonetizationLinks,
  MonetizationLink,
  PlatformType,
  ProgramType,
  UTMParams,
  ValidationResult,
  PlatformAdapter,
} from './contracts';

export {
  getPlatformAdapter,
  getPlatformInfo,
  getSupportedPlatforms,
  isPlatformSupported,
  getAllPlatforms,
} from './platformRegistry';

export {
  buildUrlWithUTM,
  buildAttributionUrl,
  isUrlAllowed,
  mergeUTMParams,
  buildProgramUTM,
  sanitizeUrl,
  validateUTMParams,
} from './attribution';
