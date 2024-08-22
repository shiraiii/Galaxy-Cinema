const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const userModel = require("../models/User")

const TOKEN_EXPIRE = "6h"

const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      //Error: Email is not correct
      const err = new Error("Email is not found")
      err.statusCode = 400
      return next(err)
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRE }
      )
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      )
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      res.status(200).json({
        status: "success",
        data: {
          token,
          userName: user.name,
          roles: user.roles,
          phone: user.phone,
          id: user._id,
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
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRE }
    )
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({
      status: "success",
      data: {
        token,
        userName: user.name,
        status: "success",
        roles: user.roles,
        phone: user.phone,
        id: user._id,
      },
    })
  } catch (err) {
    next(err)
  }
}

const refresh = async (req, res) => {
  const refreshToken = req.cookies.jwt
  // if (!refreshToken) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await userModel.findById(decoded.userId)

    // if (!user) return res.status(401).json({ message: "Unauthorized" })

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    )
    res.json({ accessToken: newAccessToken })
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" })
  }
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
      data.user = { name: user.name }
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
