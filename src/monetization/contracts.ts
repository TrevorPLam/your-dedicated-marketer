/**
 * Core type definitions for the Monetization Module
 * 
 * Defines interfaces for configuration, platform adapters, and monetization links
 */

/**
 * Supported platform types
 */
export type PlatformType = 'square' | 'vagaro' | 'boulevard' | 'other';

/**
 * Monetization program types
 */
export type ProgramType = 'giftCards' | 'membership' | 'rewards';

/**
 * UTM tracking parameters for attribution
 */
export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

/**
 * Link configuration for a monetization program
 */
export interface ProgramLinkConfig {
  /** URL to the purchase/signup page (null if not available) */
  purchaseUrl: string | null;
  /** Whether to track at checkout instead of direct link */
  trackAtCheckout?: boolean;
  /** Custom display name override */
  displayName?: string;
}

/**
 * Complete salon configuration
 */
export interface SalonConfig {
  /** Platform identifier */
  platform: PlatformType;
  
  /** Program-specific link configurations */
  links: {
    giftCards: ProgramLinkConfig;
    membership: ProgramLinkConfig;
    rewards?: ProgramLinkConfig;
  };
  
  /** UTM tracking configuration */
  utm: {
    defaults: UTMParams;
    overrides?: Record<ProgramType, Partial<UTMParams>>;
  };
  
  /** Security configuration */
  security: {
    /** Allowlist of domains that can be used for redirects */
    allowedDomains: string[];
  };
  
  /** Branding/display configuration */
  branding?: {
    giftCardDisplayName?: string;
    membershipDisplayName?: string;
    rewardsDisplayName?: string;
  };
  
  /** Salon metadata */
  metadata?: {
    salonName: string;
    contactPhone?: string;
    contactEmail?: string;
  };
}

/**
 * Generated monetization link with attribution
 */
export interface MonetizationLink {
  /** Final URL with UTM parameters (null if not available) */
  url: string | null;
  /** Display name for the CTA */
  displayName: string;
  /** Alternative call-to-action text when URL is not available */
  fallbackCta?: string;
  /** Whether this link uses the redirect endpoint */
  usesRedirect: boolean;
}

/**
 * Complete set of monetization links
 */
export interface MonetizationLinks {
  giftCards: MonetizationLink;
  membership: MonetizationLink;
  rewards: MonetizationLink;
}

/**
 * Configuration validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Configuration validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Configuration validation warning
 */
export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

/**
 * Platform adapter interface
 * 
 * Each platform (Square, Vagaro, etc.) implements this interface
 */
export interface PlatformAdapter {
  /**
   * Platform identifier
   */
  readonly platformName: PlatformType;
  
  /**
   * Generate monetization links for this platform
   * @param config Complete salon configuration
   * @returns Generated links for all programs
   */
  getMonetizationLinks(config: SalonConfig): MonetizationLinks;
  
  /**
   * Validate configuration for this platform
   * @param config Configuration to validate
   * @returns Validation result with errors and warnings
   */
  validateConfig(config: SalonConfig): ValidationResult;
  
  /**
   * Get platform-specific default display names
   */
  getDefaultDisplayNames(): Record<ProgramType, string>;
}

/**
 * Redirect endpoint parameters
 */
export interface RedirectParams {
  /** Destination URL (encoded) */
  to: string;
  /** Program type (for analytics) */
  program: ProgramType;
  /** UTM parameters (optional overrides) */
  utm?: UTMParams;
}

/**
 * Click event log entry
 */
export interface ClickEventLog {
  timestamp: number;
  program: ProgramType;
  destination: string;
  utmParams: UTMParams;
  sourcePage?: string;
  userAgent?: string;
}

/**
 * Attribution URL builder options
 */
export interface AttributionOptions {
  /** Base URL to add attribution to */
  baseUrl: string;
  /** UTM parameters to add */
  utm: UTMParams;
  /** Whether to use the redirect endpoint */
  useRedirect?: boolean;
  /** Program type (required if useRedirect is true) */
  program?: ProgramType;
  /** Domain allowlist for validation */
  allowlist?: string[];
}

/**
 * Platform registry entry
 */
export interface PlatformRegistryEntry {
  adapter: PlatformAdapter;
  displayName: string;
  description: string;
}
