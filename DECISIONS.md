# Architecture Decision Records

This document tracks significant architectural decisions for the Your Dedicated Marketer marketing site.

## Format

Each decision follows this structure:
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Date**: When the decision was made
- **Context**: The situation requiring a decision
- **Decision**: What was decided
- **Consequences**: Results of the decision

---

## ADR-001: Use Next.js 14 App Router for Static Site

**Status**: Accepted  
**Date**: 2024-12-26

### Context
Need modern framework for marketing site with excellent performance, SEO, and developer experience. Options include Next.js, Astro, Remix, or plain React with Vite.

### Decision
Use Next.js 14 with App Router and static site generation.

### Alternatives Considered
1. **Astro**: Great for content sites but less flexible for interactive components
2. **Remix**: Excellent framework but overkill for static marketing site
3. **Vite + React**: More manual setup, less optimized for static generation

### Consequences

#### Positive
- Excellent performance with static generation
- Built-in image optimization
- Great SEO support
- Large ecosystem and community
- Easy deployment to Cloudflare Pages

#### Negative
- Larger framework than necessary for simple site
- App Router still evolving
- Some third-party libraries not optimized for App Router yet

### Implementation Notes
Use static generation for all pages, Server Actions for contact form.

---

## ADR-002: Deploy to Cloudflare Pages

**Status**: Accepted  
**Date**: 2024-12-26

### Context
Marketing site needs reliable hosting with global CDN, automatic HTTPS, and zero cost for startup phase.

### Decision
Deploy to Cloudflare Pages (free tier).

### Alternatives Considered
1. **Vercel**: Excellent Next.js integration but costs money at scale
2. **Netlify**: Similar to Cloudflare but slightly worse performance
3. **GitHub Pages**: Free but less features and slower

### Consequences

#### Positive
- Free hosting with unlimited bandwidth
- Global CDN with excellent performance
- Automatic HTTPS
- Git-based deployments
- Preview deployments for PRs

#### Negative
- Vendor lock-in (but static site is portable)
- Build time limits on free tier
- Limited to static sites

### Implementation Notes
Use GitHub integration for automatic deployments on push to main.

---

## ADR-003: Use Tailwind CSS for Styling

**Status**: Accepted  
**Date**: 2024-12-26

### Context
Need efficient, maintainable styling solution for marketing site with responsive design.

### Decision
Use Tailwind CSS with custom configuration.

### Alternatives Considered
1. **CSS Modules**: More verbose, harder to maintain consistency
2. **Styled Components**: Runtime overhead, larger bundle size
3. **Vanilla CSS**: Too much manual work for responsive design

### Consequences

#### Positive
- Rapid development with utility classes
- Small production bundle (unused classes purged)
- Consistent design system
- Excellent responsive design utilities
- No runtime overhead

#### Negative
- HTML can look cluttered with many classes
- Learning curve for team members unfamiliar with utility-first CSS
- Requires build step for optimization

### Implementation Notes
Use custom theme extending Tailwind defaults for brand colors and spacing.

---

## Template for New ADRs

```markdown
## ADR-XXX: Title

**Status**: Proposed  
**Date**: YYYY-MM-DD

### Context
Problem statement and constraints

### Decision
What we're doing

### Alternatives Considered
1. Option with rejection rationale

### Consequences

#### Positive
- Benefits

#### Negative
- Trade-offs

### Implementation Notes
Technical details
```

---

## Index of Decisions

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| 001 | Use Next.js 14 App Router | Accepted | 2024-12-26 |
| 002 | Deploy to Cloudflare Pages | Accepted | 2024-12-26 |
| 003 | Use Tailwind CSS | Accepted | 2024-12-26 |
