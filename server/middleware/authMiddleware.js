const jwt = require("jsonwebtoken");
const protectUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Support both Normal User tokens ({ user: {id} }) and Admin tokens ({ id, role })
    req.user = decoded.user || { id: decoded.id, role: decoded.role }; 
    if (!req.user || !req.user.id) throw new Error("Invalid payload format");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protectUser;
