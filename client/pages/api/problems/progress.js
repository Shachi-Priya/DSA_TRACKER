// pages/api/problems/progress.js
import { forwardCookies } from '@/lib/forwardCookies';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const url = `${process.env.NODE_HOST}/api/problems/progress`;

    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization || '',
        // 'x-auth-token': req.headers['x-auth-token'] || '',
        cookie: req.headers.cookie || ''
      },
      credentials: 'include',
      body: JSON.stringify(req.body) // IMPORTANT: forward body
    });

    forwardCookies(upstream, res);
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Proxy error', error: err.message });
  }
}
