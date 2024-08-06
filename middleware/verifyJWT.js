const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
  const Authorization = req.header("authorization")

  if (!Authorization) {
    //Error: Unauthorized
    const error = new Error("Unauthorized")
    error.statusCode = 401
    return next(error)
  }

  //Get token
  const token = Authorization.replace("Bearer ", "")

  //Verify token
  const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  //Assign req
  req.user = { userId }

  next()
}
module.exports = verifyJWT
