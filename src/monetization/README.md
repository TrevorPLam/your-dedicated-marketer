# Monetization Module

A config-driven system for adding gift cards, loyalty/rewards, and membership programs to salon websites through platform link-outs with attribution tracking.

## Quick Start

```typescript
import { getMonetizationLinks } from '@/src/monetization';

// 1. Define your salon configuration
const config = {
  platform: 'square',
  links: {
    giftCards: { 
      purchaseUrl: 'https://square.site/book/SALON123/gift-cards' 
    },
    membership: { 
      purchaseUrl: 'https://square.site/book/SALON123/membership' 
    }
  },
  utm: {
    defaults: { 
      source: 'website', 
      medium: 'referral', 
      campaign: 'monetization' 
    }
  },
  security: {
    allowedDomains: ['square.site', 'squareup.com']
  }
};

// 2. Get monetization links
const links = getMonetizationLinks(config);

// 3. Use the links in your UI
<a href={links.giftCards.url}>
  {links.giftCards.displayName}
</a>
```

## Supported Platforms

- **Square** - Square Online and Square POS
- **Vagaro** - Vagaro salon/spa management
- **Boulevard** - Boulevard client experience platform
- **Other** - Generic platform with custom URLs

## Features

- ✅ **Config-driven**: No code changes per client
- ✅ **Platform-agnostic**: Works with any salon management system
- ✅ **Attribution tracking**: UTM parameters for analytics
- ✅ **Security**: Domain allowlist validation
- ✅ **Fallbacks**: Graceful handling of missing URLs
- ✅ **TypeScript**: Full type safety

## Documentation

- [AI Implementation Guide](./READMEAI.md) - Comprehensive implementation details
- [Configuration Schema](#configuration)
- [API Reference](#api)

## Configuration

Create a `salon.config.json` file:

```json
{
  "platform": "square",
  "links": {
    "giftCards": {
      "purchaseUrl": "https://square.site/book/ABC123/gift-cards",
      "displayName": "Buy Gift Card"
    },
    "membership": {
      "purchaseUrl": "https://square.site/book/ABC123/membership",
      "displayName": "Join Membership"
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
    },
    "overrides": {
      "giftCards": {
        "campaign": "gift-cards-2025"
      }
    }
  },
  "security": {
    "allowedDomains": [
      "square.site",
      "squareup.com"
    ]
  },
  "branding": {
    "giftCardDisplayName": "Gift Cards",
    "membershipDisplayName": "VIP Membership",
    "rewardsDisplayName": "Rewards Program"
  },
  "metadata": {
    "salonName": "Beautiful Salon & Spa",
    "contactPhone": "(555) 123-4567",
    "contactEmail": "info@beautifulsalon.com"
  }
}
```

## API

### `getMonetizationLinks(config)`

Main entry point. Returns monetization links for all programs.

**Parameters:**
- `config: SalonConfig` - Complete salon configuration

**Returns:** `MonetizationLinks`

**Throws:** Error if configuration is invalid

### `validateConfiguration(config)`

Validates configuration and returns errors/warnings.

**Parameters:**
- `config: SalonConfig` - Configuration to validate

**Returns:** `ValidationResult`

### Types

See [contracts.ts](./contracts.ts) for all TypeScript type definitions.

## Example Usage

### React Component

```typescript
import { getMonetizationLinks } from '@/src/monetization';
import salonConfig from '@/config/salon.config.json';

export default function GiftCardsPage() {
  const links = getMonetizationLinks(salonConfig);
  
  return (
    <div>
      <h1>{links.giftCards.displayName}</h1>
      
      {links.giftCards.url ? (
        <a 
          href={links.giftCards.url}
          className="btn-primary"
        >
          {links.giftCards.displayName}
        </a>
      ) : (
        <div>
          <p>{links.giftCards.fallbackCta}</p>
          <a href="tel:+15551234567">Call Us</a>
        </div>
      )}
    </div>
  );
}
```

### Server Action

```typescript
'use server';

import { getMonetizationLinks, validateConfiguration } from '@/src/monetization';
import { getSalonConfig } from '@/lib/config';

export async function getMonetizationData() {
  const config = await getSalonConfig();
  
  // Validate first
  const validation = validateConfiguration(config);
  
  if (!validation.valid) {
    throw new Error('Invalid configuration');
  }
  
  // Get links
  const links = getMonetizationLinks(config);
  
  return {
    links,
    warnings: validation.warnings,
  };
}
```

## File Structure

```
src/monetization/
├── index.ts                 # Main entry point
├── README.md               # This file
├── READMEAI.md             # Detailed implementation guide
├── contracts.ts            # TypeScript type definitions
├── platformRegistry.ts     # Platform adapter registry
├── attribution.ts          # UTM and URL utilities
└── adapters/
    ├── square.ts          # Square platform adapter
    ├── vagaro.ts          # Vagaro platform adapter
    ├── boulevard.ts       # Boulevard platform adapter
    └── genericLinkOut.ts  # Generic fallback adapter
```

## Testing

```bash
# Run unit tests
pnpm test src/monetization

# Run with coverage
pnpm test:coverage src/monetization
```

## Contributing

See [READMEAI.md](./READMEAI.md) for detailed contribution guidelines.

## License

Proprietary - Part of Your Dedicated Marketer platform.
