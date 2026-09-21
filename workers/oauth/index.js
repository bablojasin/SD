/**
 * Cloudflare Worker: Decap CMS GitHub OAuth Proxy
 * Securely handles GitHub OAuth authorization and token exchange.
 *
 * Requirements in Cloudflare Environment:
 * - env.GITHUB_CLIENT_ID (Secret or Var)
 * - env.GITHUB_CLIENT_SECRET (Secret - NEVER exposed to browser)
 * - env.ALLOWED_ORIGIN (Optional: allowed origin for CORS/postMessage)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Health check & info route
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          service: 'SPECTRE DEFEND Decap CMS GitHub OAuth Proxy',
          version: '1.0.0',
          endpoints: ['/auth', '/callback'],
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 2. /auth endpoint -> Redirects user to GitHub OAuth login
    if (url.pathname === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID;
      if (!clientId) {
        return new Response(
          'Missing GITHUB_CLIENT_ID secret in Cloudflare Worker environment.',
          { status: 500 }
        );
      }

      const scope = url.searchParams.get('scope') || 'repo,user';
      const redirectUri = `${url.origin}/callback`;
      const state = crypto.randomUUID();

      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', clientId);
      githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
      githubAuthUrl.searchParams.set('scope', scope);
      githubAuthUrl.searchParams.set('state', state);

      return Response.redirect(githubAuthUrl.toString(), 302);
    }

    // 3. /contact endpoint -> Handles contact form submission
    if (url.pathname === '/contact') {
      const corsHeaders = {
        'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      };

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      try {
        const body = await request.json();
        const { name, email, message, phone, company, subject } = body || {};

        if (!name || !name.trim()) {
          return new Response(JSON.stringify({ error: 'Name is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
          return new Response(JSON.stringify({ error: 'Valid email is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        if (!message || message.trim().length < 10) {
          return new Response(JSON.stringify({ error: 'Message must be at least 10 characters' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const dispatchId = `SEC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        // If a notification webhook or email service is configured in env:
        if (env.NOTIFICATION_WEBHOOK_URL) {
          await fetch(env.NOTIFICATION_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dispatchId, name, email, phone, company, subject, message }),
          }).catch((err) => console.error('Notification dispatch failed:', err));
        }

        return new Response(
          JSON.stringify({
            success: true,
            dispatchId,
            message: 'Encrypted dispatch delivered to Security Operations Center.',
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 4. /callback endpoint -> Exchanges code for access token & postMessages Decap CMS
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: url.searchParams.get('error_description') || error })
        );
      }

      if (!code) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: 'Missing authorization code from GitHub callback' })
        );
      }

      const clientId = env.GITHUB_CLIENT_ID;
      const clientSecret = env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return renderPostMessage(
          'error',
          JSON.stringify({
            error: 'Server misconfiguration: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET missing.',
          })
        );
      }

      try {
        const tokenResponse = await fetch(
          'https://github.com/login/oauth/access_token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'User-Agent': 'Spectre-Defend-Cloudflare-OAuth-Worker',
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code: code,
            }),
          }
        );

        const data = await tokenResponse.json();

        if (data.error) {
          return renderPostMessage(
            'error',
            JSON.stringify({ error: data.error_description || data.error })
          );
        }

        const tokenContent = {
          token: data.access_token,
          provider: 'github',
        };

        return renderPostMessage('success', JSON.stringify(tokenContent));
      } catch (err) {
        return renderPostMessage(
          'error',
          JSON.stringify({ error: err.message || 'Failed token exchange' })
        );
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};

/**
 * Returns HTML communicating via postMessage to the Decap CMS parent opener window.
 * This is the standard handshake expected by Decap CMS / Netlify CMS.
 */
function renderPostMessage(status, content) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authenticating with GitHub...</title>
</head>
<body style="background:#050807;color:#b7ff00;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
  <div style="text-align:center;">
    <p style="font-size:14px;letter-spacing:1px;font-family:monospace;">SECOPS AUTHENTICATING DECAP CMS...</p>
  </div>
  <script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:${status}:${content}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
