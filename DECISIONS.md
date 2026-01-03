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

## ADR-004: Use Dual MDX Approach for Content

**Status**: Accepted  
**Date**: 2026-01-03 (Documented)

### Context
The site needs to process MDX content in two different ways:
1. Static MDX pages that are part of the app structure (compiled at build time)
2. Dynamic blog content stored in `/content` directory (processed at runtime)

### Decision
Use both @next/mdx and next-mdx-remote in parallel for their respective use cases.

### Alternatives Considered
1. **Only @next/mdx**: Would require all content to be in app directory, limiting content management flexibility
2. **Only next-mdx-remote**: Would work but less performant for static pages that could be compiled at build time
3. **Custom MDX processing**: More control but requires significant maintenance overhead

### Consequences

#### Positive
- Optimal performance: build-time compilation for static pages
- Content flexibility: runtime processing for dynamic blog posts
- Best of both worlds: each tool used for its strengths
- Standard tooling: both are official/well-maintained solutions

#### Negative
- Two MDX dependencies to maintain
- Slightly larger bundle size
- Need to remember which approach to use for different content types

### Implementation Notes
- @next/mdx configured in next.config.mjs for app-level MDX files
- next-mdx-remote used in blog/[slug]/page.tsx for dynamic content
- Both share the same rehype/remark plugins for consistency

---

## ADR-005: Use clsx + tailwind-merge Utility Pattern

**Status**: Accepted  
**Date**: 2026-01-03 (Documented)

### Context
Need utility for managing conditional CSS classes and handling Tailwind CSS class conflicts.

### Decision
Implement `cn()` utility function combining clsx and tailwind-merge.

### Alternatives Considered
1. **Only clsx**: Handles conditionals but doesn't resolve Tailwind conflicts
2. **Only tailwind-merge**: Resolves conflicts but less elegant conditional syntax
3. **Custom implementation**: Reinventing the wheel

### Consequences

#### Positive
- Clean conditional class syntax from clsx
- Automatic Tailwind class conflict resolution from tailwind-merge
- Industry-standard pattern used across many projects
- Small bundle size for both libraries

#### Negative
- Two dependencies instead of one
- Developers need to understand both libraries

### Implementation Notes
Defined in lib/utils.ts as `cn()` helper function. Used throughout components for className management.

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
| 004 | Use Dual MDX Approach | Accepted | 2026-01-03 |
| 005 | Use clsx + tailwind-merge Utility | Accepted | 2026-01-03 |
