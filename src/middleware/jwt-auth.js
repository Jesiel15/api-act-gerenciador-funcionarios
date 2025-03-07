const jwt = require("jsonwebtoken");

const secretKeyToken = process.env.SECRET_KEY_TOKEN;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ login: false, message: `Token não autorizado` });

  jwt.verify(token, secretKeyToken, (err, user) => {
    if (err) return res.status(403).json({ login: false, message: `Token expirou` });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
