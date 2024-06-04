const jwt = require("jsonwebtoken")

const checkCurrentUser = (req, res, next) => {
  const Authorization = req.header("authorization")

  if (!Authorization) {
    req.user = null
    next()
  } else {
    const token = Authorization.replace("Bearer ", "")

    try {
      const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = { userId }
      next()
    } catch (err) {
      req.user = null
      next()
    }
  }
}

module.exports = checkCurrentUser
