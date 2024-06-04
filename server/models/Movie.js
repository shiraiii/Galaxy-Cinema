const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    movieImg: {
      type: String,
      require: true,
    },
    movieRating: {
      type: String,
      require: true,
    },
    ageLimit: {
      type: String,
      require: true,
    },
  },
  {
    collection: "movies",
    timestamps: true,
  }
);
const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;
