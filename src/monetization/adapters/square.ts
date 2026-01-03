/**
 * Square platform adapter
 * Handles Square-specific URL formats and conventions
 */

import type {
  PlatformAdapter,
  SalonConfig,
  MonetizationLinks,
  ValidationResult,
  ProgramType,
} from '../contracts';
import { buildUrlWithUTM, isUrlAllowed, buildProgramUTM } from '../attribution';

export class SquareAdapter implements PlatformAdapter {
  readonly platformName = 'square' as const;

  getMonetizationLinks(config: SalonConfig): MonetizationLinks {
    const { links, branding, metadata } = config;

    return {
      giftCards: this.buildLink(
        'giftCards',
        links.giftCards,
        config,
        branding?.giftCardDisplayName || 'Buy Gift Card'
      ),
      membership: this.buildLink(
        'membership',
        links.membership,
        config,
        branding?.membershipDisplayName || 'Join Membership'
      ),
      rewards: {
        url: null,
        displayName: branding?.rewardsDisplayName || 'Square Loyalty',
        fallbackCta: 'Earn rewards automatically when you pay with Square',
        usesRedirect: false,
      },
    };
  }

  private buildLink(
    program: ProgramType,
    linkConfig: { purchaseUrl: string | null; displayName?: string },
    config: SalonConfig,
    defaultDisplayName: string
  ) {
    const { purchaseUrl, displayName } = linkConfig;

    if (!purchaseUrl) {
      return {
        url: null,
        displayName: displayName || defaultDisplayName,
        fallbackCta: this.getFallbackCta(program, config.metadata?.contactPhone),
        usesRedirect: false,
      };
    }

    // Build UTM parameters for this program
    const utmParams = buildProgramUTM(
      program,
      config.utm.defaults,
      config.utm.overrides?.[program]
    );

    // Add UTM parameters to URL
    const urlWithAttribution = buildUrlWithUTM(purchaseUrl, utmParams);

    return {
      url: urlWithAttribution,
      displayName: displayName || defaultDisplayName,
      usesRedirect: false,
    };
  }

  private getFallbackCta(program: ProgramType, contactPhone?: string): string {
    const phoneText = contactPhone ? ` at ${contactPhone}` : '';
    
    switch (program) {
      case 'giftCards':
        return `Visit us in-salon or call${phoneText} to purchase`;
      case 'membership':
        return `Contact us${phoneText} to learn about membership options`;
      case 'rewards':
        return 'Ask about Square Loyalty during your next visit';
      default:
        return `Contact us${phoneText} for more information`;
    }
  }

  validateConfig(config: SalonConfig): ValidationResult {
    const errors = [];
    const warnings = [];

    // Platform-specific validation
    if (config.platform !== 'square') {
      errors.push({
        field: 'platform',
        message: 'Platform must be "square" for SquareAdapter',
        code: 'INVALID_PLATFORM',
      });
    }

    // Validate Square-specific URLs
    if (config.links.giftCards?.purchaseUrl) {
      const url = config.links.giftCards.purchaseUrl;
      if (!this.isSquareUrl(url)) {
        warnings.push({
          field: 'links.giftCards.purchaseUrl',
          message: 'URL does not appear to be a Square URL',
          suggestion: 'Verify this is the correct Square Online URL (e.g., square.site or squareup.com)',
        });
      }
    }

    if (config.links.membership?.purchaseUrl) {
      const url = config.links.membership.purchaseUrl;
      if (!this.isSquareUrl(url)) {
        warnings.push({
          field: 'links.membership.purchaseUrl',
          message: 'URL does not appear to be a Square URL',
          suggestion: 'Verify this is the correct Square Online URL',
        });
      }
    }

    // Square Loyalty is typically tracked at checkout, not direct link
    if (config.links.rewards?.purchaseUrl) {
      warnings.push({
        field: 'links.rewards.purchaseUrl',
        message: 'Square Loyalty is typically tracked at checkout',
        suggestion: 'Consider setting purchaseUrl to null and trackAtCheckout to true',
      });
    }

    // Validate security allowlist includes Square domains
    if (config.security?.allowedDomains) {
      const allowlist = config.security.allowedDomains;
      const hasSquareDomain = allowlist.some(domain => 
        domain.includes('square.site') || 
        domain.includes('squareup.com')
      );

      if (!hasSquareDomain) {
        warnings.push({
          field: 'security.allowedDomains',
          message: 'Allowlist should include Square domains',
          suggestion: 'Add "square.site" and "squareup.com" to allowedDomains',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private isSquareUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      return hostname.includes('square.site') || 
             hostname.includes('squareup.com') ||
             hostname.includes('square.com');
    } catch {
      return false;
    }
  }

  getDefaultDisplayNames(): Record<ProgramType, string> {
    return {
      giftCards: 'Buy Gift Card',
      membership: 'Join Membership',
      rewards: 'Square Loyalty',
    };
  }
}
