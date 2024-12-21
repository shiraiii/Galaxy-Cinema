const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const checkCurrentUser = require("../middleware/checkCurrentUser");

router.route("/").get(checkCurrentUser, authController.getCurrentUser);

router.route("/login").post(authController.login);

router.route("/register").post(authController.register);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

router.route("/admin").post(checkCurrentUser, authController.adminLogin);

module.exports = router;
