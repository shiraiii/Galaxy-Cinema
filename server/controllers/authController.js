const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const userModel = require("../models/User")

// const login = asyncHandler(async (req, res) => {
//     const {email, password} = req.body

//     if(!email || !password){
//         return res.status(400).json({message: 'All fields are required'})
//     }

//     const foundUser = await User.findOne({email}).exec()

//     if(!foundUser || !foundUser.active){
//         return res.status(401).json({message: 'Unauthorized'})
//     }

//     const match = await bcrypt.compare(password, foundUser.password)

//     if(!match) return res.status(401).json({message:'Unauthorized'})

//     const accessToken = jwt.sign(
//         {
//             "UserInfo": {
//                 "email": foundUser.email,
//                 "roles": foundUser.roles
//             }
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {expiresIn: '1m'}
//     )

//     const refreshToken = jwt.sign(
//         {"email": foundUser.email},
//         process.env.REFRESH_TOKEN_SECRET,
//         {expiresIn: '1d'}
//     )

//     res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 7 * 24 * 60 * 1000})

//     res.json({accessToken})

// })

const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      //Error: Email is not correct
      const err = new Error("Email is not correct")
      err.statusCode = 400
      return next(err)
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      )
      res.status(200).json({
        status: "success",
        data: {
          token,
          userName: user.name,
          roles: user.roles,
        },
      })
    } else {
      const err = new Error("Password is not correct")
      err.statusCode = 400
      return next(err)
    }
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body)
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    )
    res.status(200).json({
      status: "success",
      data: { token, userName: user.name },
    })
  } catch (err) {
    next(err)
  }
}

const refresh = (req, res) => {
  const cookies = req.body

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" })

      const foundUser = await User.findOne({ email: decoded.email }).exec()

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" })

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      )

      res.json({ accessToken })
    })
  )
}

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })

  res.json({ message: "Cookie cleared" })
}

const getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null }
    if (req.user) {
      const user = await userModel.findOne({ _id: req.user.userId })
      data.user = { email: user.email, name: user.name }
    }
    res.status(200).json({
      status: "success",
      data: data,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login,
  refresh,
  logout,
  register,
  getCurrentUser,
}
