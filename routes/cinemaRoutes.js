const express = require("express");

const cinemaController = require("../controllers/cinemaController");

const router = express.Router();

router.route("/createCinema").post(cinemaController.createCinema);

router.route("/getCinema/:id").get(cinemaController.getCinema);

router.route("/getAllCinema").get(cinemaController.getAllCinema);

router.route("/updateCinema/:id").put(cinemaController.updateCinema);

router.route("/deleteCinema/:id").delete(cinemaController.deleteCinema);

module.exports = router;
