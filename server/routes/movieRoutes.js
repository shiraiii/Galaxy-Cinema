const express = require("express")

const {
  getAllMovies,
  createOneMovie,
  updateOneMovie,
  deleteOneMovie,
} = require("../controllers/movieController")

const verifyJWT = require("../middleware/verifyJWT")
const Router = express.Router()

Router.route("/").get(getAllMovies).post(verifyJWT, createOneMovie)

Router.route("/:id")
  .put(verifyJWT, updateOneMovie)
  .delete(verifyJWT, deleteOneMovie)

module.exports = Router
