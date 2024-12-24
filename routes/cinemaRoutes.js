const express = require("express");

const cinemaController = require("../controllers/cinemaController");
const checkCurrentUser = require("../middleware/checkCurrentUser");

const router = express.Router();

router.route("/createCinema").post(checkCurrentUser,cinemaController.createCinema);

router.route("/getCinema/:id").get(cinemaController.getCinema);

router.route("/getAllCinema").get(cinemaController.getAllCinema);

router.route("/updateCinema/:id").put(checkCurrentUser,cinemaController.updateCinema);

router.route("/deleteCinema/:id").delete(checkCurrentUser,cinemaController.deleteCinema);

module.exports = router;
