/**
 * Boulevard platform adapter
 * Handles Boulevard-specific URL formats and conventions
 */

import type {
  PlatformAdapter,
  SalonConfig,
  MonetizationLinks,
  ValidationResult,
  ProgramType,
} from '../contracts';
import { buildUrlWithUTM, buildProgramUTM } from '../attribution';

export class BoulevardAdapter implements PlatformAdapter {
  readonly platformName = 'boulevard' as const;

  getMonetizationLinks(config: SalonConfig): MonetizationLinks {
    const { links, branding, metadata } = config;

    return {
      giftCards: this.buildLink(
        'giftCards',
        links.giftCards,
        config,
        branding?.giftCardDisplayName || 'Purchase Gift Card'
      ),
      membership: this.buildLink(
        'membership',
        links.membership,
        config,
        branding?.membershipDisplayName || 'Become a Member'
      ),
      rewards: this.buildLink(
        'rewards',
        links.rewards || { purchaseUrl: null },
        config,
        branding?.rewardsDisplayName || 'Loyalty Program'
      ),
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
        return `Call us${phoneText} to purchase a gift card`;
      case 'membership':
        return `Contact us${phoneText} to explore membership benefits`;
      case 'rewards':
        return 'Enroll in our loyalty program at your next appointment';
      default:
        return `Contact us${phoneText} for more information`;
    }
  }

  validateConfig(config: SalonConfig): ValidationResult {
    const errors = [];
    const warnings = [];

    // Platform-specific validation
    if (config.platform !== 'boulevard') {
      errors.push({
        field: 'platform',
        message: 'Platform must be "boulevard" for BoulevardAdapter',
        code: 'INVALID_PLATFORM',
      });
    }

    // Validate Boulevard-specific URLs
    if (config.links.giftCards?.purchaseUrl) {
      const url = config.links.giftCards.purchaseUrl;
      if (!this.isBoulevardUrl(url)) {
        warnings.push({
          field: 'links.giftCards.purchaseUrl',
          message: 'URL does not appear to be a Boulevard URL',
          suggestion: 'Verify this is the correct Boulevard URL (should contain joinblvd.com)',
        });
      }
    }

    if (config.links.membership?.purchaseUrl) {
      const url = config.links.membership.purchaseUrl;
      if (!this.isBoulevardUrl(url)) {
        warnings.push({
          field: 'links.membership.purchaseUrl',
          message: 'URL does not appear to be a Boulevard URL',
          suggestion: 'Verify this is the correct Boulevard URL',
        });
      }
    }

    // Boulevard supports direct loyalty program links
    if (config.links.rewards?.purchaseUrl && !this.isBoulevardUrl(config.links.rewards.purchaseUrl)) {
      warnings.push({
        field: 'links.rewards.purchaseUrl',
        message: 'URL does not appear to be a Boulevard URL',
        suggestion: 'Verify this is the correct Boulevard loyalty program URL',
      });
    }

    // Validate security allowlist includes Boulevard domain
    if (config.security?.allowedDomains) {
      const allowlist = config.security.allowedDomains;
      const hasBoulevardDomain = allowlist.some(domain => 
        domain.includes('joinblvd.com') || domain.includes('boulevard.io')
      );

      if (!hasBoulevardDomain) {
        warnings.push({
          field: 'security.allowedDomains',
          message: 'Allowlist should include Boulevard domains',
          suggestion: 'Add "joinblvd.com" to allowedDomains',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private isBoulevardUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      return hostname.includes('joinblvd.com') || hostname.includes('boulevard.io');
    } catch {
      return false;
    }
  }

  getDefaultDisplayNames(): Record<ProgramType, string> {
    return {
      giftCards: 'Purchase Gift Card',
      membership: 'Become a Member',
      rewards: 'Loyalty Program',
    };
  }
}
