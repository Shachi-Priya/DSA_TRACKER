// lib/forwardCookies.js
export function forwardCookies(upstreamResponse, res) {
    // Forward Set-Cookie headers from backend to browser
    const setCookie = upstreamResponse.headers.get('set-cookie');
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
  }
  