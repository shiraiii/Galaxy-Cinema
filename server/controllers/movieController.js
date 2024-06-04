const Movie = require("../models/Movie")

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate("category")
    res.status(200).json({
      status: "success",
      results: movies.length,
      data: { movies },
    })
  } catch (err) {
    next(err)
  }
}

const createOneMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body)
    res.status(201).json({
      status: "success",
      data: { movie },
    })
  } catch (err) {
    next(err)
  }
}

const updateOneMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true },
      { runValidators: true },
      {
        new: true,
        runValidators: true,
      }
    )
    res.status(200).json({
      status: "success",
      data: { movie },
    })
  } catch (err) {
    next(err)
  }
}

const deleteOneMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
      message: "Movie has been deleted",
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllMovies,
  createOneMovie,
  updateOneMovie,
  deleteOneMovie,
}
