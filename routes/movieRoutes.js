const express = require("express");

const movieController = require("../controllers/movieController");

const router = express.Router();

const checkCurrentUser = require("../middleware/checkCurrentUser");

router
  .route("/createMovie")
  .post(checkCurrentUser, movieController.createMovie);

router.route("/getMovie/:id").get(movieController.getMovie);

router.route("/getAllMovie").get(movieController.getAllMovie);

router
  .route("/updateMovie/:id")
  .put(checkCurrentUser, movieController.updateMovie);

router
  .route("/deleteMovie/:id")
  .delete(checkCurrentUser, movieController.deleteMovie);

router.route("/voteMovie/:id").post(movieController.voteMovie);

router
  .route("/updateMovieRating")
  .post(checkCurrentUser, movieController.updateMovieRating);

module.exports = router;
