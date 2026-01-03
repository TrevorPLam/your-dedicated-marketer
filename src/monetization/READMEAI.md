# Monetization Module - AI-Assisted Implementation Guide

## Overview

The Monetization Module is a config-driven system that enables salon websites to offer Gift Cards, Loyalty/Rewards Programs, and Paid Memberships through platform link-outs with proper attribution tracking. This module is designed to work with existing salon management platforms (Square, Vagaro, Boulevard, etc.) without replacing their POS systems.

## Core Principles

1. **Config-Driven**: Every salon site can be configured without code changes
2. **Platform-Agnostic**: Support multiple salon management platforms through adapters
3. **Attribution First**: Track conversions and revenue through UTM parameters
4. **No POS Replacement**: Link to platform-hosted checkout flows, don't rebuild them
5. **Progressive Enhancement**: Graceful fallbacks when features aren't configured

## Architecture

```
src/monetization/
├── README.md                 # This file
├── READMEAI.md              # AI implementation guide
├── contracts.ts             # TypeScript interfaces and types
├── platformRegistry.ts      # Platform adapter registry
├── attribution.ts           # UTM builder and URL utilities
├── index.ts                 # Main entry point
└── adapters/
    ├── square.ts           # Square platform adapter
    ├── vagaro.ts           # Vagaro platform adapter
    ├── boulevard.ts        # Boulevard platform adapter
    └── genericLinkOut.ts   # Generic fallback adapter
```

## Module Flow

### 1. Configuration
Each salon provides a config file (e.g., `salon.config.json`) with:
- Platform type (square, vagaro, boulevard, other)
- Purchase URLs for gift cards and memberships
- UTM tracking parameters
- Security settings (allowed domains)

### 2. Adapter Selection
The module selects the appropriate platform adapter based on the config:
```typescript
const adapter = getPlatformAdapter(config.platform);
const links = adapter.getMonetizationLinks(config);
```

### 3. Link Generation
Each adapter generates properly formatted URLs with attribution:
```typescript
{
  giftCards: {
    purchaseUrl: "https://square.site/book/XYZ/gift-cards?utm_source=website...",
    displayName: "Buy Gift Card"
  },
  membership: {
    purchaseUrl: "https://square.site/book/XYZ/membership?utm_source=website...",
    displayName: "Join Membership"
  },
  rewards: {
    purchaseUrl: null, // Tracked at checkout
    displayName: "Join Rewards Program",
    callToAction: "Ask about our rewards program at checkout"
  }
}
```

### 4. Landing Pages
Marketing pages (e.g., `/gift-cards`, `/rewards`, `/membership`) use these links to render CTAs:
- If URL exists: Render button linking to platform checkout
- If URL is null: Show alternative CTA (call, visit in-store, book appointment)

### 5. Optional Attribution Endpoint
For advanced tracking, an optional redirect endpoint logs clicks before redirecting:
```
/api/redirect?to=encoded_url&program=giftCards&utm_source=...
```

## Key Components

### contracts.ts
Defines TypeScript interfaces for:
- `SalonConfig`: Complete configuration schema
- `MonetizationLinks`: Link structure returned by adapters
- `PlatformAdapter`: Interface all adapters must implement
- `AttributionParams`: UTM and tracking parameters

### platformRegistry.ts
Maps platform names to their adapters:
```typescript
const PLATFORM_REGISTRY = {
  'square': SquareAdapter,
  'vagaro': VagaroAdapter,
  'boulevard': BoulevardAdapter,
  'other': GenericLinkOutAdapter
};
```

### attribution.ts
Utilities for:
- Building URLs with UTM parameters
- Merging default and override UTM values
- Validating domains against allowlist
- Encoding/decoding redirect URLs

### Platform Adapters
Each adapter implements:
```typescript
interface PlatformAdapter {
  getMonetizationLinks(config: SalonConfig): MonetizationLinks;
  validateConfig(config: SalonConfig): ValidationResult;
}
```

## Configuration Schema

```json
{
  "platform": "square",
  "links": {
    "giftCards": {
      "purchaseUrl": "https://square.site/book/ABC123/gift-cards"
    },
    "membership": {
      "purchaseUrl": "https://square.site/book/ABC123/membership"
    },
    "rewards": {
      "purchaseUrl": null,
      "trackAtCheckout": true
    }
  },
  "utm": {
    "defaults": {
      "source": "website",
      "medium": "referral",
      "campaign": "monetization"
    }
  },
  "security": {
    "allowedDomains": [
      "square.site",
      "squareup.com",
      "vagaro.com",
      "joinblvd.com"
    ]
  },
  "branding": {
    "giftCardDisplayName": "Gift Cards",
    "membershipDisplayName": "Membership",
    "rewardsDisplayName": "Rewards Program"
  }
}
```

## Usage Examples

### Basic Usage in a Component
```typescript
import { getMonetizationLinks } from '@/src/monetization';

export default function GiftCardsPage() {
  const config = getSalonConfig(); // From your config system
  const links = getMonetizationLinks(config);
  
  return (
    <div>
      <h1>Gift Cards</h1>
      {links.giftCards.purchaseUrl ? (
        <a href={links.giftCards.purchaseUrl}>
          {links.giftCards.displayName}
        </a>
      ) : (
        <p>Call us to purchase: (555) 123-4567</p>
      )}
    </div>
  );
}
```

### With Attribution Redirect
```typescript
import { buildRedirectUrl } from '@/src/monetization/attribution';

const redirectUrl = buildRedirectUrl({
  destination: links.giftCards.purchaseUrl,
  program: 'giftCards',
  utm: config.utm.defaults,
  allowlist: config.security.allowedDomains
});

<a href={redirectUrl}>Buy Gift Card</a>
```

## Platform-Specific Notes

### Square
- **Gift Cards**: Link to `/gift-cards` on Square Online site
- **Membership**: May use Square Subscriptions or custom membership page
- **Rewards**: Typically tracked at POS, no direct URL
- **Domain**: `square.site` or `squareup.com`

### Vagaro
- **Gift Cards**: Link to `/gift-certificate` page
- **Membership**: Link to membership packages page
- **Rewards**: Built into Vagaro system, tracked at checkout
- **Domain**: `vagaro.com`

### Boulevard
- **Gift Cards**: Link to gift card purchase flow
- **Membership**: Link to membership signup
- **Rewards**: Part of Boulevard's loyalty system
- **Domain**: `joinblvd.com`

### Generic/Other
- **All Links**: Provided as-is from config
- **Validation**: Domain allowlist enforced
- **Fallback**: If no URL provided, show alternative CTA

## Security Considerations

1. **Domain Allowlist**: Only allow redirects to configured domains
2. **URL Validation**: Validate all URLs before use
3. **Safe Redirects**: Use POST or signed tokens for sensitive redirects
4. **Input Sanitization**: Clean all user inputs before URL building
5. **Rate Limiting**: Apply rate limits to redirect endpoint

## Testing Strategy

### Unit Tests
- UTM parameter building and merging
- Domain validation against allowlist
- Each adapter's URL generation
- Config validation and error handling

### Integration Tests
- End-to-end link generation flow
- Redirect endpoint functionality
- Navigation integration
- Missing config fallbacks

### QA Checklist
- [ ] All three programs (gift cards, rewards, membership) render correctly
- [ ] Links include proper UTM parameters
- [ ] Redirect endpoint blocks invalid domains
- [ ] Missing URLs show appropriate fallback CTAs
- [ ] Navigation links are visible and functional
- [ ] Config validation fails fast with clear errors
- [ ] Dev mode admin panel shows current config

## Implementation Phases

### Phase 1: Core Functionality (P0)
✓ Module structure
✓ Configuration schema
✓ Platform adapters (link-out only)
✓ Attribution utilities
✓ Redirect endpoint (optional)
✓ Landing pages with CTAs
✓ Navigation integration

### Phase 2: Hardening (P1)
- Domain allowlist enforcement
- Analytics event hooks
- Comprehensive tests
- Unknown/not configured states
- Dev mode admin panel

### Phase 3: Advanced (P2)
- Square API integration placeholder
- Compliance page stubs
- Advanced attribution features

## Maintenance & Updates

### Adding a New Platform
1. Create adapter in `adapters/[platform].ts`
2. Implement `PlatformAdapter` interface
3. Add to `platformRegistry.ts`
4. Update config schema documentation
5. Add platform-specific tests

### Updating an Existing Platform
1. Modify adapter implementation
2. Update tests
3. Document breaking changes
4. Update client configs if needed

### Configuration Changes
1. Update `contracts.ts` types
2. Update example config
3. Update validation logic
4. Document migration path for existing configs

## Support & Troubleshooting

### Common Issues

**Links not working:**
- Check config URLs are correct
- Verify platform adapter is registered
- Confirm domains are in allowlist

**Attribution not tracking:**
- Verify UTM parameters in config
- Check redirect endpoint is working
- Review analytics integration

**Missing CTA buttons:**
- Check config has required URLs
- Verify fallback UI is implemented
- Review console for validation errors

### Debug Mode
Set `DEBUG_MONETIZATION=true` in environment to see:
- Loaded config
- Selected adapter
- Generated URLs
- Validation results

## Contributing

When contributing to this module:
1. Follow existing patterns in adapters
2. Add tests for new functionality
3. Update documentation
4. Keep backward compatibility
5. Use TypeScript strictly

## License

Proprietary - Part of Your Dedicated Marketer platform.

---

**Last Updated**: January 2026
**Module Version**: 1.0.0
**Status**: Active Development
