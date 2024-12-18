const express = require("express");

const reviewBlogController = require("../controllers/reviewBlogController");

const router = express.Router();

router.route("/createReview").post(reviewBlogController.createReview);

router.route("/getAllReview").get(reviewBlogController.getAllReview);

router.route("/getReview/:id").get(reviewBlogController.getReivew);

router.route("/updateReview/:id").put(reviewBlogController.updateReview);

router.route("/deleteReview/:id").delete(reviewBlogController.deleteReview);

module.exports = router;
