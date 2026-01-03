# Monetization Module - Client Intake Checklist

Use this checklist when onboarding a new salon client to ensure proper configuration of the monetization module.

## Pre-Intake Preparation

- [ ] Confirm client has an active salon management platform
- [ ] Verify platform is supported (Square, Vagaro, Boulevard, or Other)
- [ ] Review client's current gift card, membership, and rewards offerings
- [ ] Determine if they want all three programs or a subset

## Platform Information

### Platform Details
- [ ] **Platform Name**: ________________ (Square / Vagaro / Boulevard / Other)
- [ ] **Account ID/Username**: ________________
- [ ] **Account Status**: Active / Trial / New

### Platform Access
- [ ] Obtain login credentials (if needed for setup)
- [ ] Verify client has admin access to their platform
- [ ] Check platform subscription level (may affect available features)

## Program URLs

### Gift Cards
- [ ] **Does platform support gift cards?**: Yes / No
- [ ] **Gift card purchase URL**: ________________________________
- [ ] **Test gift card URL** (verify it works)
- [ ] **Custom display name** (optional): ________________
- [ ] **Fallback action if URL unavailable**: Phone / Email / In-store

### Membership
- [ ] **Does platform support memberships?**: Yes / No
- [ ] **Membership signup URL**: ________________________________
- [ ] **Test membership URL** (verify it works)
- [ ] **Custom display name** (optional): ________________
- [ ] **Membership types** (Basic / Premium / VIP): ________________
- [ ] **Fallback action if URL unavailable**: Phone / Email / In-store

### Rewards/Loyalty
- [ ] **Does platform support rewards?**: Yes / No
- [ ] **Rewards enrollment URL** (if available): ________________________________
- [ ] **How rewards work**: Tracked at checkout / Direct signup / Other
- [ ] **Custom display name** (optional): ________________
- [ ] **Fallback action**: Ask in-store / Call / Book appointment

## Branding & Display

- [ ] **Salon Name**: ________________________________
- [ ] **Contact Phone**: ________________________________
- [ ] **Contact Email**: ________________________________
- [ ] **Preferred terminology**:
  - Gift cards: Gift Cards / Gift Certificates / E-Cards
  - Membership: Membership / VIP Program / Subscription
  - Rewards: Rewards / Loyalty / Points Program

## Analytics Configuration

### UTM Parameters
- [ ] **UTM Source**: ________________ (default: "website")
- [ ] **UTM Medium**: ________________ (default: "referral")
- [ ] **UTM Campaign**: ________________ (default: "monetization")

### Program-Specific UTM Overrides
- [ ] **Gift Cards Campaign**: ________________ (optional)
- [ ] **Membership Campaign**: ________________ (optional)
- [ ] **Rewards Campaign**: ________________ (optional)

### Analytics Integration
- [ ] **Google Analytics tracking**: Yes / No
- [ ] **GA Tracking ID**: ________________
- [ ] **Other analytics platform**: ________________

## Security Configuration

### Domain Allowlist
- [ ] Add platform domain(s):
  - Square: square.site, squareup.com
  - Vagaro: vagaro.com
  - Boulevard: joinblvd.com
  - Other: ________________

- [ ] **Custom domains** (if applicable): ________________________________

### Redirect Endpoint
- [ ] **Use redirect endpoint for tracking**: Yes / No
- [ ] **Reason if not using**: Direct links preferred / Security concern / Other

## Testing & Verification

### URL Testing
- [ ] Test gift card URL in browser
- [ ] Test membership URL in browser
- [ ] Test rewards URL (if available) in browser
- [ ] Verify URLs work on mobile devices
- [ ] Test with UTM parameters appended

### Configuration Validation
- [ ] Run `validateConfiguration()` on config
- [ ] No validation errors
- [ ] Review and address any warnings
- [ ] Confirm all required fields present

### Test Transactions
- [ ] Complete test gift card purchase (if possible)
- [ ] Complete test membership signup (if possible)
- [ ] Verify purchase shows in platform
- [ ] Verify UTM tracking in analytics

## Content & Messaging

### Landing Page Content
- [ ] **Gift Cards Page**:
  - Custom benefits/features
  - Special promotions
  - Custom FAQs
  - Pricing tiers

- [ ] **Membership Page**:
  - Tier names and pricing
  - Benefits for each tier
  - Custom FAQs
  - Special terms

- [ ] **Rewards Page**:
  - How rewards work
  - Points earning structure
  - Redemption options
  - Tier structure

### Navigation Labels
- [ ] Confirm labels in navigation/footer
- [ ] Request custom CTA button text
- [ ] Approve color scheme for CTAs

## Legal & Compliance

- [ ] **Gift card terms & conditions**: Platform default / Custom
- [ ] **Membership terms**: Platform default / Custom
- [ ] **Rewards program terms**: Platform default / Custom
- [ ] **Privacy policy updated**: Yes / No / N/A
- [ ] **State-specific requirements**: Checked / N/A

## Documentation

- [ ] Create client-specific config file: `salon-[name].config.json`
- [ ] Document any custom requirements
- [ ] Note any platform limitations
- [ ] Record support contact at platform
- [ ] Save platform account credentials securely

## Launch Preparation

- [ ] Configuration file created and validated
- [ ] All URLs tested and working
- [ ] Landing pages reviewed with client
- [ ] Analytics tracking verified
- [ ] Fallback CTAs configured
- [ ] Client training scheduled
- [ ] Go-live date confirmed: ________________

## Post-Launch

- [ ] Monitor analytics for first week
- [ ] Check for any error logs
- [ ] Verify click-through rates
- [ ] Schedule 1-week follow-up with client
- [ ] Collect client feedback

## Client Sign-Off

- [ ] Client has reviewed all landing pages
- [ ] Client has tested all links
- [ ] Client approves configuration
- [ ] Client understands how to update URLs

**Client Name**: ________________________________

**Client Signature**: ________________________________

**Date**: ________________

**Account Manager**: ________________________________

**Technical Contact**: ________________________________

## Notes & Special Requirements

_Use this space for any special requirements, custom configurations, or notes specific to this client:_

---

_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________

---

**Intake Completed By**: ________________

**Date Completed**: ________________

**Time Spent**: ________________

**Next Steps**:
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________
