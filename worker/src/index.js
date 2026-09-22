/**
 * SPECTRE DEFEND — Decap CMS GitHub OAuth Authentication Worker
 * 
 * Production-ready Cloudflare Worker providing secure GitHub OAuth authorization
 * and token exchange for Decap CMS / TKCMS, preventing exposure of the client secret.
 *
 * Requirements in Cloudflare Environment:
 * - env.GITHUB_CLIENT_ID (Secret: wrangler secret put GITHUB_CLIENT_ID)
 * - env.GITHUB_CLIENT_SECRET (Secret: wrangler secret put GITHUB_CLIENT_SECRET)
 * - env.CMS_ORIGIN or env.ALLOWED_ORIGIN (Optional var: defaults to "https://SpectreDefend.dpdns.org")
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const allowedOrigin = env.CMS_ORIGIN || env.ALLOWED_ORIGIN || 'https://SpectreDefend.dpdns.org';

    // Common security response headers
    const baseSecurityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Permissions-Policy': 'interest-cohort=()',
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
            service: 'SPECTRE DEFEND GitHub OAuth Proxy',
            status: 'operational',
            version: '2.1.0',
            cmsOrigin: allowedOrigin,
            endpoints: ['/auth', '/callback', '/contact'],
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
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    // 2. /auth endpoint -> Initiates OAuth flow
    if (url.pathname === '/auth') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { ...baseSecurityHeaders, Allow: 'GET' },
        });
      }

      // Security: Validate origin if present
      const reqOrigin = request.headers.get('Origin');
      if (reqOrigin && reqOrigin !== allowedOrigin) {
        return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
          status: 403,
          headers: { ...baseSecurityHeaders, 'Content-Type': 'application/json' },
        });
      }

      const clientId = env.GITHUB_CLIENT_ID;
      if (!clientId) {
        return new Response(
          JSON.stringify({
            error: 'Server misconfiguration: GITHUB_CLIENT_ID secret is not configured.',
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

      // Security: Validate requested scopes (allow repo, user, or workflow only)
      const requestedScope = url.searchParams.get('scope') || 'repo,user';
      const allowedScopes = ['repo', 'user', 'public_repo', 'repo,user', 'user,repo'];
      const scope = allowedScopes.includes(requestedScope) ? requestedScope : 'repo,user';

      // Security: Generate cryptographically secure random state (CSRF mitigation)
      const stateArray = new Uint8Array(24);
      crypto.getRandomValues(stateArray);
      const state = Array.from(stateArray, (b) => b.toString(16).padStart(2, '0')).join('');

      // Build GitHub OAuth Authorization URL
      const redirectUri = `${url.origin}/callback`;
      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', clientId);
      githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
      githubAuthUrl.searchParams.set('scope', scope);
      githubAuthUrl.searchParams.set('state', state);

      // Return 302 redirect to GitHub with state cookie
      const headers = new Headers({
        ...baseSecurityHeaders,
        Location: githubAuthUrl.toString(),
      });

      // Secure HTTP-only cookie for state verification
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

      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      const errorDescription = url.searchParams.get('error_description');
      const returnedState = url.searchParams.get('state');

      // Check for authorization denial from GitHub
      if (error) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: errorDescription || error }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }

      // Validate presence of authorization code
      if (!code) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Missing authorization code from GitHub callback.' }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }

      // CSRF State validation from cookie if available
      const cookieHeader = request.headers.get('Cookie') || '';
      const stateCookieMatch = cookieHeader.match(/oauth_state=([a-f0-9]+)/);
      const expectedState = stateCookieMatch ? stateCookieMatch[1] : null;

      if (expectedState && returnedState && expectedState !== returnedState) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'CSRF state verification failed. Session expired or untrusted.' }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }

      const clientId = env.GITHUB_CLIENT_ID;
      const clientSecret = env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return renderPostMessage(
          'error',
          JSON.stringify({
            error: 'Server misconfiguration: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET missing in Worker.',
          }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }

      try {
        // Secure server-to-server token exchange with GitHub API
        const tokenResponse = await fetch(
          'https://github.com/login/oauth/access_token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'User-Agent': 'Spectre-Defend-Cloudflare-OAuth-Worker/2.1',
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code: code,
            }),
          }
        );

        if (!tokenResponse.ok) {
          return renderPostMessage(
            'error',
            JSON.stringify({ error: `GitHub API returned HTTP ${tokenResponse.status}` }),
            baseSecurityHeaders,
            allowedOrigin
          );
        }

        const data = await tokenResponse.json();

        if (data.error) {
          return renderPostMessage(
            'error',
            JSON.stringify({ error: data.error_description || data.error }),
            baseSecurityHeaders,
            allowedOrigin
          );
        }

        // Return token payload in the format expected by Decap CMS
        const tokenContent = {
          token: data.access_token,
          provider: 'github',
        };

        return renderPostMessage('success', JSON.stringify(tokenContent), baseSecurityHeaders, allowedOrigin);
      } catch (err) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Internal OAuth exchange failure.' }),
          baseSecurityHeaders,
          allowedOrigin
        );
      }
    }

    // 4. /contact endpoint -> Form submission handling
    if (url.pathname === '/contact') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: { ...baseSecurityHeaders, ...corsHeaders },
        });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: {
            ...baseSecurityHeaders,
            ...corsHeaders,
            Allow: 'POST, OPTIONS',
            'Content-Type': 'application/json',
          },
        });
      }

      try {
        const body = await request.json();
        const { name, email, message, phone, company, subject } = body || {};

        if (!name || typeof name !== 'string' || !name.trim()) {
          return new Response(JSON.stringify({ error: 'Valid name is required.' }), {
            status: 400,
            headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
          return new Response(JSON.stringify({ error: 'Valid business email is required.' }), {
            status: 400,
            headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        if (!message || typeof message !== 'string' || message.trim().length < 10) {
          return new Response(JSON.stringify({ error: 'Message must be at least 10 characters.' }), {
            status: 400,
            headers: { ...baseSecurityHeaders, ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

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
                name: name.trim(),
                email: email.trim(),
                phone: phone?.trim(),
                company: company?.trim(),
                subject: subject?.trim(),
                message: message.trim(),
                timestamp: new Date().toISOString(),
              }),
            }).catch((e) => console.error('Dispatch error:', e))
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
    return new Response(JSON.stringify({ error: 'Route not found.' }), {
      status: 404,
      headers: {
        ...baseSecurityHeaders,
        'Content-Type': 'application/json',
      },
    });
  },
};

/**
 * Returns clean HTML with postMessage communication protocol for Decap CMS,
 * strictly bounded to the authorized CMS origin.
 */
function renderPostMessage(status, content, securityHeaders, targetOrigin) {
  // Sanitize content against script injection
  const safeContent = content.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>SPECTRE DEFEND • Authenticating Session</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline';" />
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
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
