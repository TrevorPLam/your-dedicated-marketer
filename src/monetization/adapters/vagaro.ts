/**
 * Vagaro platform adapter
 * Handles Vagaro-specific URL formats and conventions
 */

import type {
  PlatformAdapter,
  SalonConfig,
  MonetizationLinks,
  ValidationResult,
  ProgramType,
} from '../contracts';
import { buildUrlWithUTM, buildProgramUTM } from '../attribution';

export class VagaroAdapter implements PlatformAdapter {
  readonly platformName = 'vagaro' as const;

  getMonetizationLinks(config: SalonConfig): MonetizationLinks {
    const { links, branding, metadata } = config;

    return {
      giftCards: this.buildLink(
        'giftCards',
        links.giftCards,
        config,
        branding?.giftCardDisplayName || 'Buy Gift Certificate'
      ),
      membership: this.buildLink(
        'membership',
        links.membership,
        config,
        branding?.membershipDisplayName || 'Join Membership'
      ),
      rewards: {
        url: null,
        displayName: branding?.rewardsDisplayName || 'Rewards Program',
        fallbackCta: 'Earn rewards with every visit - tracked automatically in Vagaro',
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
        return `Purchase in-salon or call${phoneText}`;
      case 'membership':
        return `Contact us${phoneText} for membership details`;
      case 'rewards':
        return 'Join our rewards program during your next appointment';
      default:
        return `Contact us${phoneText} for more information`;
    }
  }

  validateConfig(config: SalonConfig): ValidationResult {
    const errors = [];
    const warnings = [];

    // Platform-specific validation
    if (config.platform !== 'vagaro') {
      errors.push({
        field: 'platform',
        message: 'Platform must be "vagaro" for VagaroAdapter',
        code: 'INVALID_PLATFORM',
      });
    }

    // Validate Vagaro-specific URLs
    if (config.links.giftCards?.purchaseUrl) {
      const url = config.links.giftCards.purchaseUrl;
      if (!this.isVagaroUrl(url)) {
        warnings.push({
          field: 'links.giftCards.purchaseUrl',
          message: 'URL does not appear to be a Vagaro URL',
          suggestion: 'Verify this is the correct Vagaro URL (should contain vagaro.com)',
        });
      }
    }

    if (config.links.membership?.purchaseUrl) {
      const url = config.links.membership.purchaseUrl;
      if (!this.isVagaroUrl(url)) {
        warnings.push({
          field: 'links.membership.purchaseUrl',
          message: 'URL does not appear to be a Vagaro URL',
          suggestion: 'Verify this is the correct Vagaro URL',
        });
      }
    }

    // Vagaro rewards are typically tracked at checkout
    if (config.links.rewards?.purchaseUrl) {
      warnings.push({
        field: 'links.rewards.purchaseUrl',
        message: 'Vagaro rewards are typically tracked at checkout',
        suggestion: 'Consider setting purchaseUrl to null and trackAtCheckout to true',
      });
    }

    // Validate security allowlist includes Vagaro domain
    if (config.security?.allowedDomains) {
      const allowlist = config.security.allowedDomains;
      const hasVagaroDomain = allowlist.some(domain => domain.includes('vagaro.com'));

      if (!hasVagaroDomain) {
        warnings.push({
          field: 'security.allowedDomains',
          message: 'Allowlist should include Vagaro domain',
          suggestion: 'Add "vagaro.com" to allowedDomains',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private isVagaroUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      return hostname.includes('vagaro.com');
    } catch {
      return false;
    }
  }

  getDefaultDisplayNames(): Record<ProgramType, string> {
    return {
      giftCards: 'Buy Gift Certificate',
      membership: 'Join Membership',
      rewards: 'Rewards Program',
    };
  }
}
