import jwt from "jsonwebtoken";

const JWT_SECRET = "QUIZ_SECRET_KEY"; 


export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({ message: "Token missing" });
  }

  // Format should be: "Bearer <token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(403).send({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { admin_id, role, iat}
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
}


export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send({ message: "Admin access required" });
  }
  next();
}
