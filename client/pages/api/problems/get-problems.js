import { forwardCookies } from '@/lib/forwardCookies';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const url = `${process.env.NODE_HOST}/api/problems/get-problems`;

    const upstream = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Pass through Authorization if present (Bearer token)
        Authorization: req.headers.authorization || '',
        // Or, if your backend expects x-auth-token, uncomment below:
        // 'x-auth-token': req.headers['x-auth-token'] || '',
        cookie: req.headers.cookie || '' // forward cookies for session-based auth
      },
      credentials: 'include'
    });

    forwardCookies(upstream, res);
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Proxy error', error: err.message });
  }
}
