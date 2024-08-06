const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")
const checkCurrentUser = require("../middleware/checkCurrentUser")

router.route("/getUser/:id").get(usersController.getUser)

router.route("/getAllUser").get(usersController.getAllUser)

router.route("/createUser").post(checkCurrentUser, usersController.createUser)

router
  .route("/updateUser/:id")
  .put(checkCurrentUser, usersController.updateUser)

router
  .route("/deleteUser/:id")
  .delete(checkCurrentUser, usersController.deleteUser)

module.exports = router
