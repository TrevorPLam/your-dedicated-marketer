# Monetization Module - QA Checklist

Use this checklist to ensure quality assurance before launching the monetization module for a client.

## Configuration Validation

### File Structure
- [ ] `salon.config.json` exists in the correct location
- [ ] Config file is valid JSON (no syntax errors)
- [ ] All required fields are present
- [ ] No typos in field names
- [ ] File permissions are correct

### Platform Configuration
- [ ] Platform type is valid: `square`, `vagaro`, `boulevard`, or `other`
- [ ] Platform matches client's actual system
- [ ] Platform-specific validation passes

### URLs Configuration
- [ ] **Gift Cards URL**:
  - [ ] Present and valid URL format
  - [ ] Domain in allowlist
  - [ ] URL is accessible (returns 200 status)
  - [ ] URL points to correct gift card page
  - [ ] No trailing slashes or query params (should be in base URL)

- [ ] **Membership URL**:
  - [ ] Present and valid URL format
  - [ ] Domain in allowlist
  - [ ] URL is accessible
  - [ ] URL points to correct membership page

- [ ] **Rewards URL** (if applicable):
  - [ ] Valid URL format or intentionally null
  - [ ] If null, trackAtCheckout is true
  - [ ] If present, domain in allowlist

### UTM Parameters
- [ ] Default source is set
- [ ] Default medium is set
- [ ] Default campaign is set
- [ ] Program-specific overrides (if any) are valid
- [ ] No conflicting UTM values
- [ ] UTM values are URL-safe (no special characters)

### Security
- [ ] Domain allowlist is present
- [ ] Domain allowlist includes platform domain(s)
- [ ] All configured URLs are in allowlist
- [ ] No suspicious or unrelated domains in allowlist

### Metadata
- [ ] Salon name is present and correct
- [ ] Contact phone is valid format
- [ ] Contact email is valid format
- [ ] Branding names are set (if custom)

## Module Functionality

### Code Validation
- [ ] TypeScript compilation passes: `npm run type-check`
- [ ] No console errors in dev mode
- [ ] Module exports are accessible: `import { getMonetizationLinks } from '@/src/monetization'`
- [ ] Configuration validation function works

### Link Generation
- [ ] Run `getMonetizationLinks(config)` successfully
- [ ] Gift card link includes UTM parameters
- [ ] Membership link includes UTM parameters
- [ ] Rewards link handles null case correctly
- [ ] Display names are correct
- [ ] Fallback CTAs are present when URLs are null

### Attribution System
- [ ] UTM parameters are properly formatted
- [ ] URL encoding works correctly
- [ ] Domain validation blocks invalid domains
- [ ] Sanitization prevents XSS attacks
- [ ] buildAttributionUrl works with and without redirect

## Landing Pages

### Gift Cards Page (`/gift-cards`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] CTA button/fallback displays based on config
- [ ] Benefits section renders
- [ ] FAQs section renders
- [ ] Mobile responsive layout works
- [ ] Images load correctly (if any)
- [ ] All text is readable and properly formatted

### Membership Page (`/membership`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] CTA button/fallback displays based on config
- [ ] Membership tiers render correctly
- [ ] Benefits section displays
- [ ] FAQs section renders
- [ ] Mobile responsive layout works
- [ ] All text is readable

### Rewards Page (`/rewards`)
- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] CTA/fallback displays correctly
- [ ] "How it works" section renders
- [ ] Rewards tiers display correctly
- [ ] Benefits section renders
- [ ] FAQs section renders
- [ ] Mobile responsive layout works

## Navigation Integration

### Header/Navigation
- [ ] Gift Cards link present in navigation (if configured)
- [ ] Membership link present in navigation (if configured)
- [ ] Rewards link present in navigation (if configured)
- [ ] Links work when clicked
- [ ] Active state works correctly (if implemented)

### Footer
- [ ] Programs section displays
- [ ] Gift Cards link works
- [ ] Membership link works
- [ ] Rewards link works
- [ ] Links have correct hover states

## Redirect Endpoint

### Basic Functionality
- [ ] Endpoint accessible at `/api/redirect`
- [ ] Returns 400 for missing `to` parameter
- [ ] Returns 400 for missing `program` parameter
- [ ] Returns 400 for invalid program value
- [ ] Returns 400 for invalid URL encoding

### Security
- [ ] Blocks URLs not in allowlist (returns 403)
- [ ] Sanitizes URLs (prevents javascript: protocol)
- [ ] Handles malformed URLs gracefully
- [ ] Validates query parameters

### Redirect Logic
- [ ] Successfully redirects to valid URL
- [ ] Adds correct status code (302)
- [ ] Preserves UTM parameters in destination
- [ ] Logs click event to console
- [ ] Tracks referer header
- [ ] Tracks user agent

### Logging (Dev Mode)
- [ ] POST endpoint returns logs in development
- [ ] POST endpoint blocked in production
- [ ] Log format is correct
- [ ] Logs contain all required fields

## Cross-Browser Testing

### Desktop Browsers
- [ ] Chrome - Latest version
- [ ] Firefox - Latest version
- [ ] Safari - Latest version
- [ ] Edge - Latest version

### Mobile Browsers
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet (if applicable)

### Test on Each Browser
- [ ] All pages load correctly
- [ ] Links work
- [ ] CTAs are clickable
- [ ] Forms display correctly (if any)
- [ ] No JavaScript errors in console

## Responsive Testing

### Breakpoints
- [ ] Mobile (320px - 479px)
- [ ] Mobile landscape (480px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1440px+)

### Elements to Check
- [ ] Navigation collapses properly on mobile
- [ ] Hero sections scale correctly
- [ ] CTA buttons are thumb-friendly on mobile
- [ ] Text is readable at all sizes
- [ ] Images scale properly
- [ ] Cards/sections stack correctly on mobile
- [ ] Footer remains organized

## Performance Testing

### Page Load Times
- [ ] Gift Cards page loads < 3 seconds
- [ ] Membership page loads < 3 seconds
- [ ] Rewards page loads < 3 seconds
- [ ] Redirect endpoint responds < 500ms

### Lighthouse Scores (Target: 90+)
- [ ] Performance score
- [ ] Accessibility score
- [ ] Best Practices score
- [ ] SEO score

### Optimization
- [ ] Images optimized/lazy loaded
- [ ] No unnecessary dependencies
- [ ] CSS/JS minified (in production build)
- [ ] No console errors or warnings

## Analytics Testing

### UTM Tracking
- [ ] Click gift card CTA and verify UTM in URL
- [ ] Click membership CTA and verify UTM in URL
- [ ] UTM parameters match configuration
- [ ] Analytics platform receives data (if integrated)

### Click Events
- [ ] Redirect endpoint logs clicks
- [ ] Log includes correct program type
- [ ] Log includes correct destination
- [ ] Log includes UTM parameters
- [ ] Timestamp is accurate

## SEO

### Meta Tags
- [ ] Gift Cards page has proper title
- [ ] Gift Cards page has meta description
- [ ] Membership page has proper title
- [ ] Membership page has meta description
- [ ] Rewards page has proper title
- [ ] Rewards page has meta description

### Sitemap
- [ ] Pages included in sitemap.xml
- [ ] Sitemap accessible at `/sitemap.xml`

### Structured Data
- [ ] Schema markup added (if applicable)
- [ ] Validates with Google's Rich Results Test

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip links work (if present)

### Screen Reader
- [ ] Headings in logical order (h1, h2, h3...)
- [ ] Alt text on images
- [ ] ARIA labels on buttons/links
- [ ] Form labels properly associated

### Color Contrast
- [ ] Text meets 4.5:1 contrast ratio
- [ ] Large text meets 3:1 ratio
- [ ] UI elements meet contrast requirements

### Other
- [ ] No flashing content
- [ ] Media has captions (if applicable)
- [ ] Page is zoomable to 200%

## Error Handling

### Network Errors
- [ ] Graceful handling when platform URL is down
- [ ] User-friendly error message
- [ ] Fallback CTA shows

### Configuration Errors
- [ ] Validation catches invalid config
- [ ] Clear error messages
- [ ] App doesn't crash with bad config

### Edge Cases
- [ ] Missing config file handled
- [ ] Empty URLs handled (show fallback)
- [ ] Invalid platform type handled
- [ ] Malformed JSON handled

## Production Deployment

### Pre-Deployment
- [ ] All QA items above completed
- [ ] No open bugs or issues
- [ ] Staging environment tested
- [ ] Client has approved pages

### Environment Variables
- [ ] Production URLs configured
- [ ] API keys set (if any)
- [ ] Analytics configured
- [ ] Logging configured

### Post-Deployment
- [ ] Production URLs accessible
- [ ] All pages load correctly
- [ ] Links work in production
- [ ] Analytics tracking confirmed
- [ ] No errors in production logs

## Client Acceptance

- [ ] Client has tested gift cards page
- [ ] Client has tested membership page
- [ ] Client has tested rewards page
- [ ] Client has tested all links
- [ ] Client approves content and layout
- [ ] Client understands how to update config

## Sign-Off

**QA Completed By**: ________________________________

**Date**: ________________

**Build Version**: ________________

**Environment Tested**: Dev / Staging / Production

**Issues Found**: ________ (Number)

**Issues Resolved**: ________ (Number)

**Outstanding Issues**: 
- _______________________________________________
- _______________________________________________

**Approved for Launch**: Yes / No / With Conditions

**Conditions** (if any):
_____________________________________________________________________

_____________________________________________________________________

**Launched By**: ________________________________

**Launch Date**: ________________

**Post-Launch Monitoring Period**: ________ days

---

**Notes**:
_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________
