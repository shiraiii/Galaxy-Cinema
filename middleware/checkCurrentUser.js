const jwt = require("jsonwebtoken");

const checkCurrentUser = (req, res, next) => {
  const Authorization = req.header("authorization");

  if (!Authorization) {
    req.user = null;
    return next();
  } else {
    const token = Authorization.replace("Bearer ", "");

    try {
      const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = { userId };
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        console.error("Token verification error: ", err.message);
        return res.status(401).json({ message: "Token verification failed" });
      }
    }
  }
};

module.exports = checkCurrentUser;
