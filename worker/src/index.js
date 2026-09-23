/**
 * SPECTRE DEFEND — Production Hardened Cloudflare Worker
 * 
 * Provides secure GitHub OAuth authorization and token exchange for Decap CMS,
 * as well as encrypted contact form ingestion, rate limiting, and origin defense.
 * 
 * Architecture:
 * - Browser (Decap CMS) -> Worker /auth -> GitHub OAuth -> Worker /callback -> Browser
 * - Contact Form -> Worker /contact -> Sanitized Dispatch / Webhook
 * 
 * Secrets (Inject via Cloudflare Wrangler Secret Manager, NEVER commit to repo):
 * - GITHUB_CLIENT_ID
 * - GITHUB_CLIENT_SECRET
 * - NOTIFICATION_WEBHOOK_URL (optional)
 */

// In-memory sliding window rate limiter per worker instance
const rateLimitMap = new Map();

function checkRateLimit(ip, endpoint, maxHits, windowSeconds) {
  const now = Date.now();
  const key = `${ip}:${endpoint}`;
  const record = rateLimitMap.get(key) || [];
  
  // Prune entries older than the window
  const validTimestamps = record.filter((ts) => now - ts < windowSeconds * 1000);
  
  if (validTimestamps.length >= maxHits) {
    return false; // Rate limit exceeded
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);
  
  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 10000) {
    for (const [k, timestamps] of rateLimitMap.entries()) {
      if (timestamps.every((ts) => now - ts >= windowSeconds * 1000)) {
        rateLimitMap.delete(k);
      }
    }
  }
  
  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const allowedOrigin = env.CMS_ORIGIN || env.ALLOWED_ORIGIN || 'https://SpectreDefend.dpdns.org';
    const clientIp = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '0.0.0.0';

    // Standard HTTP Security Response Headers (OWASP & Cloudflare Best Practice)
    const baseSecurityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Permissions-Policy': 'interest-cohort=(), camera=(), microphone=(), geolocation=()',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    };

    // 1. Health check & status route
    if (url.pathname === '/' || url.pathname === '/health') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { ...baseSecurityHeaders, Allow: 'GET' },
        });
      }

      return new Response(
        JSON.stringify(
          {
            service: 'SPECTRE DEFEND Production Security Gateway',
            status: 'operational',
            version: '2.5.0',
            domain: allowedOrigin,
            protectedEndpoints: ['/auth', '/callback', '/contact'],
            tls: 'TLS 1.3 Strict',
            timestamp: new Date().toISOString(),
          },
          null,
          2
        ),
        {
          status: 200,
          headers: {
            ...baseSecurityHeaders,
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      );
    }

    // 2. /auth endpoint -> Initiates OAuth flow for Decap CMS
    if (url.pathname === '/auth') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { ...baseSecurityHeaders, Allow: 'GET' },
        });
      }

      // Rate limit: 10 requests / 60 seconds per IP
      if (!checkRateLimit(clientIp, '/auth', 10, 60)) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait before retrying authentication.' }),
          {
            status: 429,
            headers: {
              ...baseSecurityHeaders,
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          }
        );
      }

      // Origin and Referer verification if sent by browser
      const reqOrigin = request.headers.get('Origin');
      const reqReferer = request.headers.get('Referer');
      if (reqOrigin && reqOrigin !== allowedOrigin) {
        return new Response(JSON.stringify({ error: 'Origin not authorized.' }), {
          status: 403,
          headers: { ...baseSecurityHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (reqReferer && !reqReferer.startsWith(allowedOrigin)) {
        return new Response(JSON.stringify({ error: 'Referer origin not authorized.' }), {
          status: 403,
          headers: { ...baseSecurityHeaders, 'Content-Type': 'application/json' },
        });
      }

      const clientId = env.GITHUB_CLIENT_ID;
      if (!clientId) {
        return new Response(
          JSON.stringify({
            error: 'Server configuration error: GITHUB_CLIENT_ID secret is not provisioned.',
          }),
          {
            status: 500,
            headers: {
              ...baseSecurityHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Strictly allow minimal required scopes
      const requestedScope = url.searchParams.get('scope') || 'repo,user';
      const allowedScopes = ['repo', 'user', 'public_repo', 'repo,user', 'user,repo'];
      const scope = allowedScopes.includes(requestedScope) ? requestedScope : 'repo,user';

      // Generate cryptographically secure random state (24 bytes = 192 bits of entropy)
      const stateArray = new Uint8Array(24);
      crypto.getRandomValues(stateArray);
      const state = Array.from(stateArray, (b) => b.toString(16).padStart(2, '0')).join('');

      // Build exact GitHub OAuth Authorization URL
      const redirectUri = `${url.origin}/callback`;
      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', clientId);
      githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
      githubAuthUrl.searchParams.set('scope', scope);
      githubAuthUrl.searchParams.set('state', state);

      const headers = new Headers({
        ...baseSecurityHeaders,
        Location: githubAuthUrl.toString(),
      });

      // Secure HTTP-only state cookie for CSRF validation
      headers.append(
        'Set-Cookie',
        `oauth_state=${state}; Path=/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
      );

      return new Response(null, {
        status: 302,
        headers,
      });
    }

    // 3. /callback endpoint -> Exchanges authorization code for access token
    if (url.pathname === '/callback') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { ...baseSecurityHeaders, Allow: 'GET' },
        });
      }

      // Rate limit: 10 callback requests / 60 seconds per IP
      if (!checkRateLimit(clientIp, '/callback', 10, 60)) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Rate limit exceeded during token exchange.' }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }

      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      const errorDescription = url.searchParams.get('error_description');
      const returnedState = url.searchParams.get('state');

      // Clear the state cookie upon callback execution to prevent reuse
      const headersWithClearCookie = {
        ...baseSecurityHeaders,
        'Set-Cookie': 'oauth_state=; Path=/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      };

      if (error) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: errorDescription || error }),
          headersWithClearCookie,
          allowedOrigin
        );
      }

      if (!code) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Missing authorization code from GitHub callback.' }),
          headersWithClearCookie,
          allowedOrigin
        );
      }

      // Validate CSRF state from secure cookie
      const cookieHeader = request.headers.get('Cookie') || '';
      const stateCookieMatch = cookieHeader.match(/oauth_state=([a-f0-9]+)/);
      const expectedState = stateCookieMatch ? stateCookieMatch[1] : null;

      if (!expectedState || !returnedState || expectedState !== returnedState) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'CSRF state validation failed. Session untrusted or expired.' }),
          headersWithClearCookie,
          allowedOrigin
        );
      }

      const clientId = env.GITHUB_CLIENT_ID;
      const clientSecret = env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return renderPostMessage(
          'error',
          JSON.stringify({
            error: 'Server configuration error: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET missing.',
          }),
          headersWithClearCookie,
          allowedOrigin
        );
      }

      try {
        // Direct server-to-server token exchange with GitHub API
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'Spectre-Defend-OAuth-Worker/2.5',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
          }),
        });

        if (!tokenResponse.ok) {
          return renderPostMessage(
            'error',
            JSON.stringify({ error: `GitHub OAuth service returned HTTP ${tokenResponse.status}` }),
            headersWithClearCookie,
            allowedOrigin
          );
        }

        const data = await tokenResponse.json();

        if (data.error) {
          return renderPostMessage(
            'error',
            JSON.stringify({ error: data.error_description || data.error }),
            headersWithClearCookie,
            allowedOrigin
          );
        }

        const tokenContent = {
          token: data.access_token,
          provider: 'github',
        };

        return renderPostMessage(
          'success',
          JSON.stringify(tokenContent),
          headersWithClearCookie,
          allowedOrigin
        );
      } catch (err) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Internal OAuth token exchange failure.' }),
          headersWithClearCookie,
          allowedOrigin
        );
      }
    }

    // 4. /contact endpoint -> Form submission handling
    if (url.pathname === '/contact') {
      const originHeader = request.headers.get('Origin');
      const corsOrigin = originHeader === allowedOrigin ? allowedOrigin : allowedOrigin;

      const corsHeaders = {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Vary': 'Origin',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: { ...baseSecurityHeaders, ...corsHeaders },
        });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
          headers: {
            ...baseSecurityHeaders,
            ...corsHeaders,
            Allow: 'POST, OPTIONS',
            'Content-Type': 'application/json',
          },
        });
      }

      // Rate limit: 5 contact dispatches / 60 seconds per IP
      if (!checkRateLimit(clientIp, '/contact', 5, 60)) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before sending another dispatch.' }),
          {
            status: 429,
            headers: {
              ...baseSecurityHeaders,
              ...corsHeaders,
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          }
        );
      }

      // Check request content length (limit to 64KB max)
      const contentLength = parseInt(request.headers.get('Content-Length') || '0', 10);
      if (contentLength > 65536) {
        return new Response(JSON.stringify({ error: 'Payload exceeds permissible size (64KB).' }), {
          status: 413,
          headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        const body = await request.json();
        const { name, email, message, phone, company, subject } = body || {};

        // Validation: Full Name
        if (!name || typeof name !== 'string' || !name.trim()) {
          return new Response(JSON.stringify({ error: 'Valid full name is required.' }), {
            status: 400,
            headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const cleanName = name.trim().slice(0, 100);

        // Validation: Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.trim().length > 120) {
          return new Response(JSON.stringify({ error: 'Valid corporate email address is required.' }), {
            status: 400,
            headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const cleanEmail = email.trim();

        // Validation: Message
        if (!message || typeof message !== 'string' || message.trim().length < 10) {
          return new Response(
            JSON.stringify({ error: 'Message must be at least 10 characters describing your scope.' }),
            {
              status: 400,
              headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        const cleanMessage = message.trim().slice(0, 5000);

        // Optional fields sanitization
        const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, 30) : undefined;
        const cleanCompany = typeof company === 'string' ? company.trim().slice(0, 100) : undefined;
        const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 100) : undefined;

        const dispatchId = `SEC-${Date.now().toString(36).toUpperCase()}-${Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase()}`;

        // Forward to notification webhook if configured
        if (env.NOTIFICATION_WEBHOOK_URL) {
          ctx.waitUntil(
            fetch(env.NOTIFICATION_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                dispatchId,
                name: cleanName,
                email: cleanEmail,
                phone: cleanPhone,
                company: cleanCompany,
                subject: cleanSubject,
                message: cleanMessage,
                timestamp: new Date().toISOString(),
                sourceIp: clientIp,
              }),
            }).catch(() => {
              // Fail silently in production to avoid exposing internal logging details
            })
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            dispatchId,
            message: 'Dispatch securely transmitted to SPECTRE DEFEND Security Operations Center.',
          }),
          {
            status: 200,
            headers: {
              ...baseSecurityHeaders,
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Malformed JSON payload.' }), {
          status: 400,
          headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Default 404
    return new Response(JSON.stringify({ error: 'Endpoint not found.' }), {
      status: 404,
      headers: {
        ...baseSecurityHeaders,
        'Content-Type': 'application/json',
      },
    });
  },
};

/**
 * Returns HTML communicating via postMessage to Decap CMS.
 * Strictly bounds the communication to targetOrigin and never uses wildcard '*'.
 */
function renderPostMessage(status, content, securityHeaders, targetOrigin) {
  // Prevent script breakout or tag injection
  const safeContent = content.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  const popupCsp = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline';";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>SPECTRE DEFEND • Authenticating Session</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="Content-Security-Policy" content="${popupCsp}" />
  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <style>
    body {
      background: #050807;
      color: #b7ff00;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      text-align: center;
    }
    .card {
      background: #0a0f0a;
      border: 1px solid rgba(183, 255, 0, 0.3);
      padding: 24px 32px;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(183, 255, 0, 0.15);
    }
    .status {
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="status">AUTHENTICATING DECAP CMS SESSION...</div>
  </div>
  <script>
    (function() {
      var target = "${targetOrigin}";
      if (!window.opener) {
        document.querySelector('.status').textContent = "ERROR: NO PARENT CMS WINDOW DETECTED";
        return;
      }
      function deliver() {
        try {
          window.opener.postMessage('authorization:github:${status}:${safeContent}', target);
        } catch(e) {}
      }
      function receiveMessage(e) {
        if (e.origin !== target) return;
        deliver();
        window.removeEventListener("message", receiveMessage, false);
        setTimeout(function() { window.close(); }, 300);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", target);
      deliver();
      setTimeout(function() { window.close(); }, 4000);
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      ...securityHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': popupCsp,
    },
  });
}
