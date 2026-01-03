/**
 * Redirect API Endpoint
 * 
 * Provides attribution tracking and click logging for monetization links.
 * Validates destination URLs against allowlist before redirecting.
 */

import { NextRequest, NextResponse } from 'next';
import { safeDecodeUrl, isUrlAllowed, sanitizeUrl } from '@/src/monetization/attribution';
import type { ProgramType } from '@/src/monetization/contracts';

/**
 * Click event log structure
 */
interface ClickEvent {
  timestamp: number;
  program: ProgramType;
  destination: string;
  utmParams: Record<string, string>;
  sourcePage?: string;
  userAgent?: string;
}

/**
 * In-memory click log (in production, use a database or logging service)
 */
const clickLog: ClickEvent[] = [];

/**
 * Default domain allowlist (should be overridden by config)
 */
const DEFAULT_ALLOWLIST = [
  'square.site',
  'squareup.com',
  'vagaro.com',
  'joinblvd.com',
];

/**
 * GET /api/redirect
 * 
 * Query parameters:
 * - to: URL-encoded destination URL (required)
 * - program: Program type (giftCards, membership, rewards) (required)
 * - utm_*: Optional UTM parameters to log
 * 
 * @param request Next.js request object
 * @returns Redirect response or error
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get required parameters
    const encodedDestination = searchParams.get('to');
    const program = searchParams.get('program') as ProgramType | null;

    // Validate required parameters
    if (!encodedDestination) {
      return NextResponse.json(
        { error: 'Missing required parameter: to' },
        { status: 400 }
      );
    }

    if (!program || !['giftCards', 'membership', 'rewards'].includes(program)) {
      return NextResponse.json(
        { error: 'Missing or invalid parameter: program' },
        { status: 400 }
      );
    }

    // Decode destination URL
    const destination = safeDecodeUrl(encodedDestination);
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Invalid destination URL' },
        { status: 400 }
      );
    }

    // Sanitize URL (prevent XSS)
    const sanitizedDestination = sanitizeUrl(destination);
    
    if (!sanitizedDestination) {
      return NextResponse.json(
        { error: 'Invalid or unsafe destination URL' },
        { status: 400 }
      );
    }

    // Validate against allowlist
    // TODO: Load allowlist from salon config instead of using default
    const allowlist = DEFAULT_ALLOWLIST;
    
    if (!isUrlAllowed(sanitizedDestination, allowlist)) {
      return NextResponse.json(
        { error: 'Destination domain not in allowlist' },
        { status: 403 }
      );
    }

    // Extract UTM parameters for logging
    const utmParams: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams[key] = value;
      }
    }

    // Log the click event
    const clickEvent: ClickEvent = {
      timestamp: Date.now(),
      program,
      destination: sanitizedDestination,
      utmParams,
      sourcePage: request.headers.get('referer') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Store in log (in production, persist to database)
    clickLog.push(clickEvent);
    
    // Log to console (in production, use proper logging service)
    console.log('[Monetization Redirect]', JSON.stringify(clickEvent));

    // Keep log size manageable (last 1000 entries)
    if (clickLog.length > 1000) {
      clickLog.shift();
    }

    // Redirect to destination
    return NextResponse.redirect(sanitizedDestination, {
      status: 302,
    });

  } catch (error) {
    console.error('[Monetization Redirect Error]', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/redirect/logs
 * 
 * Development endpoint to view recent click logs.
 * Should be protected or disabled in production.
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  try {
    const { limit = 50 } = await request.json();
    
    const recentLogs = clickLog.slice(-limit).reverse();
    
    return NextResponse.json({
      count: clickLog.length,
      logs: recentLogs,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
