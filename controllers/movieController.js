const movieModel = require("../models/Movie")

const getAllMovie = async (req, res, next) => {
  try {
    await movieModel.find().then((movies) => res.json(movies))
  } catch (err) {
    next(err)
  }
}

const getMovie = async (req, res, next) => {
  try {
    const id = req.params.id
    await movieModel.findById(id).then((movies) => res.json(movies))
  } catch (err) {
    next(err)
  }
}

const createMovie = async (req, res, next) => {
  try {
    const {
      movieName,
      movieImg,
      genres,
      directors,
      casts,
      description,
      movieRating,
      producers,
      ageLimit,
      movieBanner,
      duration,
      votes,
      nation,
      releaseDate,
      endDate,
    } = req.body
    const oldMovie = await movieModel.findOne({ movieName })
    if (oldMovie) {
      return res.status(400).json({ message: "Movie already exists" })
    } else {
      const directorArray =
        typeof directors === "string"
          ? directors.split(",").map((d) => d.trim())
          : []
      const castArray =
        typeof casts === "string" ? casts.split(",").map((c) => c.trim()) : []
      const producerArray =
        typeof producers === "string"
          ? producers.split(",").map((p) => p.trim())
          : []
      const newMovie = new movieModel({
        movieName,
        movieImg,
        genres,
        directors: directorArray,
        casts: castArray,
        description,
        producers: producerArray,
        movieRating,
        ageLimit,
        movieBanner,
        duration,
        votes,
        nation,
        releaseDate,
        endDate,
      })
      await newMovie.save()
      res.status(201).json(newMovie)
    }
  } catch (err) {
    next(err)
  }
}

const updateMovie = async (req, res, next) => {
  try {
    const id = req.params.id
    await movieModel
      .findByIdAndUpdate({ _id: id }, req.body)
      .then((movies) => res.json(movies))
  } catch (err) {
    next(err)
  }
}

const deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id
    await movieModel
      .findByIdAndDelete({ _id: id })
      .then((movies) => res.json(movies))
  } catch (err) {
    next(err)
  }
}

const voteMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id)
    if (!movie) return res.status(404).json({ error: "Movie not found" })
    movie.votes += req.body.votes
    await movie.save()
    res.json({ success: true, votes: movie.votes })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getMovie,
  getAllMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  voteMovie,
}
