// middlewares/auth.js (or inline)
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // 1) Prefer httpOnly cookie
  let token = req.cookies?.token;

  // 2) Fallback: x-auth-token header
  if (!token) token = req.header("x-auth-token");

  // 3) Fallback: Authorization: Bearer <token>
  if (!token) {
    const authHeader = req.header("authorization") || "";
    const [scheme, value] = authHeader.split(" ");
    if (scheme === "Bearer" && value) token = value;
  }

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach BOTH id and email if you signed them
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = auth;
