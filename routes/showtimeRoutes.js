const express = require("express");

const showtimeController = require("../controllers/showtimeController");
const checkCurrentUser = require("../middleware/checkCurrentUser");

const router = express.Router();

router
  .route("/createShowtime")
  .post(checkCurrentUser, showtimeController.createShowtime);

router.route("/getAllShowtime").get(showtimeController.getAllShowtime);

router.route("/getShowtime/:movieId").get(showtimeController.getShowtime);

router
  .route("/updateShowtime/:id")
  .put(checkCurrentUser, showtimeController.updateShowtime);

router
  .route("/deleteShowtime/:id")
  .delete(checkCurrentUser, showtimeController.deleteShowtime);

module.exports = router;
