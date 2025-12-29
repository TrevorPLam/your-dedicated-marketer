# Security Policy

## Supported Versions

Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: security@ydFirms.com

### What to Include
- Type of vulnerability
- Full paths of affected source files
- Location of affected code (tag/branch/commit)
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if possible)
- Impact assessment

### Response Timeline
- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity

### Process
1. You report the vulnerability
2. We confirm receipt within 48 hours
3. We assess severity and impact
4. We develop and test a fix
5. We release a patch
6. We publicly disclose (with your consent)

## Security Best Practices

When contributing:
- [ ] Never commit secrets or API keys
- [ ] Use environment variables for sensitive config
- [ ] Keep dependencies up to date
- [ ] Validate and sanitize all user input
- [ ] Run security linters before submitting PRs

## Automated Security

This project uses:
- Dependabot for dependency updates
- ESLint security plugin for static analysis
- Pre-commit hooks for secret detection
