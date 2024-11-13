const mongoose = require("mongoose");

const reviewBlogSchema = new mongoose.Schema(
  {
    review: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      rquried: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
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
const reviewBlog = mongoose.model("reviewBlog", reviewBlogSchema);

module.exports = reviewBlog;
