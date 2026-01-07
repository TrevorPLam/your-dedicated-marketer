# DEPLOYMENT.md

Last Updated: 2026-01-02

This repo is a template. Fill this in for real projects.

## Target environments
- Local development: `npm run dev`
- Staging: Cloudflare Pages (Preview Deployments)
- Production: Cloudflare Pages (Production via main branch)

## Cloudflare Pages Configuration
To deploy this project on Cloudflare Pages (GitHub integration):

1. **Framework Preset**: select "Next.js" (if available) or "None".
2. **Build command**: `npx @cloudflare/next-on-pages@1`
3. **Build output directory**: `.vercel/output/static`
4. **Environment Variables**:
   - `NODE_VERSION`: `20` (or compatible version)
   - Add any other secrets from `.env` as needed.

## Node.js Compatibility
This project uses Next.js 16. The `@cloudflare/next-on-pages` adapter interprets the build output.
If you encounter runtime issues, ensure the Cloudflare project compatibility date is set to `2024-09-23` or later, and compatibility flags include `nodejs_compat`.

## Deployment method
- CI/CD: Cloudflare Pages automatic builds on git push.
- Infrastructure: Cloudflare Edge Network.
- Secrets management: Cloudflare Pages dashboard > Settings > Environment variables.

## Rollback plan
- How to rollback: specific deployment can be rolled back via Cloudflare Pages dashboard ("Manage deployment" > "Rollback" or just redeploy previous commit).
- Data migration rollback (if applicable): N/A for static site; database schema changes require manual SQL rollback.
