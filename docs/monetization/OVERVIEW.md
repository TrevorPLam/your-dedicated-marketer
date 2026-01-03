# Monetization Module Overview

## Purpose

The Monetization Module enables salon websites to offer Gift Cards, Loyalty/Rewards Programs, and Paid Memberships through platform link-outs with attribution tracking. This module is designed to integrate with existing salon management platforms (Square, Vagaro, Boulevard, etc.) without replacing their POS systems.

## Architecture

### Core Components

1. **Platform Adapters** (`src/monetization/adapters/`)
   - Square adapter for Square Online integration
   - Vagaro adapter for Vagaro platform
   - Boulevard adapter for Boulevard platform
   - Generic adapter for custom platforms

2. **Attribution System** (`src/monetization/attribution.ts`)
   - UTM parameter building and merging
   - URL validation and sanitization
   - Domain allowlist enforcement

3. **Configuration System** (`salon.config.json`)
   - Per-salon configuration without code changes
   - Platform selection and URLs
   - UTM tracking parameters
   - Security allowlist

4. **Landing Pages** (`app/gift-cards/`, `app/membership/`, `app/rewards/`)
   - Marketing pages with CTAs
   - Graceful fallbacks for missing URLs
   - Mobile-responsive design

5. **Redirect Endpoint** (`app/api/redirect/route.ts`)
   - Optional attribution tracking
   - Click logging
   - Domain validation

## How It Works

### 1. Configuration Setup

Each salon creates a `salon.config.json` file:

```json
{
  "platform": "square",
  "links": {
    "giftCards": {
      "purchaseUrl": "https://square.site/book/ABC123/gift-cards"
    },
    "membership": {
      "purchaseUrl": "https://square.site/book/ABC123/membership"
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
    "allowedDomains": ["square.site", "squareup.com"]
  }
}
```

### 2. Link Generation

The module generates properly formatted URLs with attribution:

```typescript
import { getMonetizationLinks } from '@/src/monetization';

const config = getSalonConfig();
const links = getMonetizationLinks(config);

// links.giftCards.url: "https://square.site/book/ABC123/gift-cards?utm_source=website&utm_medium=referral..."
// links.membership.url: "https://square.site/book/ABC123/membership?utm_source=website&utm_medium=referral..."
// links.rewards.url: null (tracked at checkout)
```

### 3. Landing Page Integration

Landing pages use the generated links:

```tsx
export default function GiftCardsPage() {
  const config = getSalonConfig();
  const links = getMonetizationLinks(config);
  
  return (
    <div>
      {links.giftCards.url ? (
        <a href={links.giftCards.url}>Buy Gift Card</a>
      ) : (
        <p>Call us to purchase: {config.metadata.contactPhone}</p>
      )}
    </div>
  );
}
```

### 4. Attribution Tracking

Optional redirect endpoint logs clicks before redirecting:

```
/api/redirect?to=encoded_url&program=giftCards
```

This logs:
- Timestamp
- Program type (giftCards, membership, rewards)
- Destination URL
- UTM parameters
- Source page
- User agent

## Supported Platforms

### Square
- **Gift Cards**: Links to Square Online gift card page
- **Membership**: Links to Square subscriptions or membership page
- **Rewards**: Tracked at POS (Square Loyalty)
- **Domains**: square.site, squareup.com

### Vagaro
- **Gift Cards**: Links to Vagaro gift certificate page
- **Membership**: Links to Vagaro membership packages
- **Rewards**: Tracked at checkout
- **Domain**: vagaro.com

### Boulevard
- **Gift Cards**: Links to Boulevard gift card purchase
- **Membership**: Links to Boulevard membership signup
- **Rewards**: May have direct link or tracked at checkout
- **Domain**: joinblvd.com

### Other/Generic
- **All Programs**: Uses URLs provided in config
- **Validation**: Domain allowlist enforced
- **Fallback**: Shows alternative CTAs when URLs missing

## Security Features

1. **Domain Allowlist**: Only allow redirects to configured domains
2. **URL Sanitization**: Prevent XSS attacks
3. **Protocol Validation**: Only HTTP/HTTPS allowed
4. **Input Validation**: All parameters validated before use

## Attribution & Analytics

### UTM Parameters

Default structure:
- `utm_source`: "website"
- `utm_medium`: "referral"
- `utm_campaign`: "monetization"
- `utm_content`: Program type (giftCards, membership, rewards)

Can be overridden per program:
```json
{
  "utm": {
    "defaults": { ... },
    "overrides": {
      "giftCards": {
        "campaign": "holiday-gift-cards-2026"
      }
    }
  }
}
```

### Click Logging

The redirect endpoint logs:
- When: Timestamp
- What: Program and destination
- Where: Source page (referer)
- Who: User agent
- How: UTM parameters

## Deployment Considerations

### Configuration Management

**Development:**
- Use example config with test URLs
- Enable debug mode

**Production:**
- Validate config on deployment
- Use production URLs
- Secure redirect endpoint
- Enable proper logging/monitoring

### Environment Variables

```env
# Optional: If storing config in DB or external service
SALON_CONFIG_URL=https://config.example.com/salon-123.json

# Optional: Analytics integration
ANALYTICS_API_KEY=...
```

### Monitoring

Monitor these metrics:
- Click-through rates per program
- Conversion tracking (via UTM parameters in analytics)
- Error rates on redirect endpoint
- Missing URL fallback usage

## Maintenance

### Adding a New Salon

1. Create `salon.config.json` for the salon
2. Update URLs with their platform-specific links
3. Configure UTM parameters
4. Add their domains to allowlist
5. Validate configuration
6. Deploy

### Updating URLs

1. Edit `salon.config.json`
2. Update specific URLs
3. Re-validate configuration
4. Deploy changes

### Platform Updates

If a platform changes their URL structure:
1. Update the appropriate adapter in `src/monetization/adapters/`
2. Update validation logic if needed
3. Test thoroughly
4. Update documentation
5. Communicate changes to clients

## Troubleshooting

### Links Not Working

**Check:**
- Config file exists and is valid JSON
- URLs are correct and accessible
- Domains are in allowlist
- Platform adapter is correctly selected

**Debug:**
```typescript
const validation = validateConfiguration(config);
console.log(validation.errors);
console.log(validation.warnings);
```

### Attribution Not Tracking

**Check:**
- UTM parameters are in config
- Redirect endpoint is accessible
- Analytics is configured to track UTM parameters
- Console logs show click events

### Fallback CTAs Showing

**Reason:**
- URL is null in configuration (intentional for rewards)
- URL is missing or invalid
- Platform doesn't support that program

**Solution:**
- Add URL to config if available
- Accept fallback for programs without direct URLs
- Contact support for the platform

## Best Practices

1. **Always validate** configuration before deployment
2. **Use meaningful UTM campaigns** for different initiatives
3. **Monitor click-through rates** to optimize CTAs
4. **Test links regularly** to ensure they're not broken
5. **Keep domains allowlist updated** when changing platforms
6. **Document custom configurations** for each salon
7. **Regular security audits** of redirect endpoint

## Future Enhancements

Potential improvements (not currently implemented):

1. **API Integration**: Direct API calls instead of link-outs
2. **A/B Testing**: Test different CTAs and messaging
3. **Advanced Analytics**: Conversion tracking, revenue attribution
4. **Gift Card Balance**: Check balance functionality
5. **Membership Portal**: Self-service membership management
6. **Rewards Dashboard**: Points balance and history

## Support

For issues or questions:
1. Check this documentation
2. Review [READMEAI.md](../../src/monetization/READMEAI.md)
3. Consult intake and QA checklists
4. Contact development team

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Status**: Production Ready
