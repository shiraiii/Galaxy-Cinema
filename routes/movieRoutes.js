const express = require("express")

const movieController = require("../controllers/movieController")

const router = express.Router()

router.route("/createMovie").post(movieController.createMovie)

router.route("/getMovie/:id").get(movieController.getMovie)

router.route("/getAllMovie").get(movieController.getAllMovie)

router.route("/updateMovie/:id").put(movieController.updateMovie)

router.route("/deleteMovie/:id").delete(movieController.deleteMovie)

router.route("/voteMovie/:id").post(movieController.voteMovie)

module.exports = router
