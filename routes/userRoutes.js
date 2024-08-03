const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.route("/getUser/:id").get(usersController.getUser)

router.route("/getAllUser").get(usersController.getAllUser)

router.route("/createUser").post(usersController.createUser)

router.route("/updateUser/:id").put(usersController.updateUser)

router.route("/deleteUser/:id").delete(usersController.deleteUser)

module.exports = router
