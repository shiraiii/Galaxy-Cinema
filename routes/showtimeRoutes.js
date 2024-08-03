const express = require("express")

const showtimeController = require("../controllers/showtimeController")

const router = express.Router()

router.route("/createShowtime").post(showtimeController.createShowtime)

router.route("/getAllShowtime").get(showtimeController.getAllShowtime)

router.route("/getShowtime/:id").get(showtimeController.getShowtime)

router.route("/updateShowtime/:id").put(showtimeController.updateShowtime)

router.route("/deleteShowtime/:id").delete(showtimeController.deleteShowtime)

module.exports = router
