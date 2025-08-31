// pages/api/auth/logout.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    try {
      const url = `${process.env.NODE_HOST}/api/auth/logout`;
  
      const upstream = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: req.headers.cookie || "",
        },
        credentials: "include",
      });
  
      // forward the cookie clearing from backend
      res.setHeader("Set-Cookie", upstream.headers.get("set-cookie") || "");
  
      const data = await upstream.json();
      return res.status(upstream.status).json(data);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Proxy error", error: err.message });
    }
  }
  