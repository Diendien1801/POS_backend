const jwt = require('jsonwebtoken');

// Middleware xác minh token và kiểm tra vai trò
function authorizeRole(...allowedRoles) 
{
    return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient role' });
      }

      req.user = decoded; // Gắn thông tin user vào req
      next();
    } catch (err) {
      console.error("❌ Authorization error:", err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
  };
}

module.exports = {
  authorizeRole
};
