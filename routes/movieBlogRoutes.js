const express = require("express");

const movieBlogController = require("../controllers/movieBlogController");

const router = express.Router();

router.route("/createBlog").post(movieBlogController.createBlog);

router.route("/getAllBlog").get(movieBlogController.getAllBlog);

router.route("/getBlog/:id").get(movieBlogController.getBlog);

router.route("/updateBlog/:id").put(movieBlogController.updateBlog);

router.route("/deleteBlog/:id").delete(movieBlogController.deleteBlog);

module.exports = router;
