const jwt = require("jsonwebtoken")

const verifyUser = async (req, res, next) => {
  try {
    const token = req.get("authorization")
    if (!token) return res.status(401).send("There is no token")
    const jwtSecret = req.originalUrl.includes("refresh")
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token.split(" ")[1], jwtSecret, (err, user) => {
      if (err && err?.message === "TokenExpiredError")
        return res.status(403).send("Token expired")
      if (err) return res.status(401).send("Invalid token")
      req.user = user
      next()
    })
  } catch (err) {
    return res.status(401).send("Unauthorized")
  }
}

module.exports = verifyUser
