/**
 * Generic link-out adapter for platforms not specifically supported
 * Uses URLs directly from configuration with basic validation
 */

import type {
  PlatformAdapter,
  SalonConfig,
  MonetizationLinks,
  ValidationResult,
  ProgramType,
} from '../contracts';
import { buildUrlWithUTM, isUrlAllowed, buildProgramUTM } from '../attribution';

export class GenericLinkOutAdapter implements PlatformAdapter {
  readonly platformName = 'other' as const;

  getMonetizationLinks(config: SalonConfig): MonetizationLinks {
    const { links, utm, branding, metadata } = config;

    return {
      giftCards: this.buildLink(
        'giftCards',
        links.giftCards,
        config,
        branding?.giftCardDisplayName || 'Gift Cards'
      ),
      membership: this.buildLink(
        'membership',
        links.membership,
        config,
        branding?.membershipDisplayName || 'Membership'
      ),
      rewards: this.buildLink(
        'rewards',
        links.rewards || { purchaseUrl: null },
        config,
        branding?.rewardsDisplayName || 'Rewards Program'
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
        return `Call us${phoneText} to join our membership program`;
      case 'rewards':
        return 'Ask about our rewards program during your next visit';
      default:
        return `Contact us${phoneText} for more information`;
    }
  }

  validateConfig(config: SalonConfig): ValidationResult {
    const errors = [];
    const warnings = [];

    // Validate required fields
    if (!config.platform) {
      errors.push({
        field: 'platform',
        message: 'Platform is required',
        code: 'MISSING_PLATFORM',
      });
    }

    // Validate links
    if (!config.links) {
      errors.push({
        field: 'links',
        message: 'Links configuration is required',
        code: 'MISSING_LINKS',
      });
    } else {
      // Validate gift cards
      if (!config.links.giftCards) {
        errors.push({
          field: 'links.giftCards',
          message: 'Gift cards configuration is required',
          code: 'MISSING_GIFT_CARDS',
        });
      }

      // Validate membership
      if (!config.links.membership) {
        errors.push({
          field: 'links.membership',
          message: 'Membership configuration is required',
          code: 'MISSING_MEMBERSHIP',
        });
      }
    }

    // Validate UTM configuration
    if (!config.utm?.defaults) {
      errors.push({
        field: 'utm.defaults',
        message: 'Default UTM parameters are required',
        code: 'MISSING_UTM_DEFAULTS',
      });
    } else {
      if (!config.utm.defaults.source) {
        warnings.push({
          field: 'utm.defaults.source',
          message: 'UTM source is recommended for tracking',
          suggestion: 'Add utm.defaults.source (e.g., "website")',
        });
      }
      if (!config.utm.defaults.medium) {
        warnings.push({
          field: 'utm.defaults.medium',
          message: 'UTM medium is recommended for tracking',
          suggestion: 'Add utm.defaults.medium (e.g., "referral")',
        });
      }
    }

    // Validate security
    if (!config.security?.allowedDomains || config.security.allowedDomains.length === 0) {
      warnings.push({
        field: 'security.allowedDomains',
        message: 'Domain allowlist is recommended for security',
        suggestion: 'Add security.allowedDomains array with allowed domains',
      });
    }

    // Validate URLs against allowlist if provided
    if (config.security?.allowedDomains && config.security.allowedDomains.length > 0) {
      const allowlist = config.security.allowedDomains;

      if (config.links.giftCards?.purchaseUrl) {
        if (!isUrlAllowed(config.links.giftCards.purchaseUrl, allowlist)) {
          errors.push({
            field: 'links.giftCards.purchaseUrl',
            message: 'Gift cards URL domain is not in allowlist',
            code: 'URL_NOT_ALLOWED',
          });
        }
      }

      if (config.links.membership?.purchaseUrl) {
        if (!isUrlAllowed(config.links.membership.purchaseUrl, allowlist)) {
          errors.push({
            field: 'links.membership.purchaseUrl',
            message: 'Membership URL domain is not in allowlist',
            code: 'URL_NOT_ALLOWED',
          });
        }
      }

      if (config.links.rewards?.purchaseUrl) {
        if (!isUrlAllowed(config.links.rewards.purchaseUrl, allowlist)) {
          errors.push({
            field: 'links.rewards.purchaseUrl',
            message: 'Rewards URL domain is not in allowlist',
            code: 'URL_NOT_ALLOWED',
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  getDefaultDisplayNames(): Record<ProgramType, string> {
    return {
      giftCards: 'Gift Cards',
      membership: 'Membership',
      rewards: 'Rewards Program',
    };
  }
}
