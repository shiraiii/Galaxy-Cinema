const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  movieImg: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
  },
  directors: {
    type: [String],
    lowercase: true,
    trim: true,
  },
  casts: {
    type: [String],
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
  },
  producers: {
    type: [String],
    trim: true,
  },
  movieRating: {
    type: String,
    required: true,
  },
  ageLimit: {
    type: String,
  },
  movieBanner: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  nation: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
})
const movieModel = mongoose.model("Movie", movieSchema)
module.exports = movieModel
