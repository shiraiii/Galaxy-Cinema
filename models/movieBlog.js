const mongoose = require("mongoose");

const movieBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    views: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  { timestamps: true }
);
const movieBlog = mongoose.model("movieBlog", movieBlogSchema);
module.exports = movieBlog;
