const movieModel = require("../models/Movie");

const getAllMovie = async (req, res, next) => {
  try {
    await movieModel.find().then((movies) => res.json(movies));
  } catch (err) {
    next(err);
  }
};

const getMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    await movieModel.findById(id).then((movies) => res.json(movies));
  } catch (err) {
    next(err);
  }
};

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
    } = req.body;
    const oldMovie = await movieModel.findOne({ movieName });
    if (oldMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    } else {
      const directorArray =
        typeof directors === "string"
          ? directors.split(",").map((d) => d.trim())
          : [];
      const castArray =
        typeof casts === "string" ? casts.split(",").map((c) => c.trim()) : [];
      const producerArray =
        typeof producers === "string"
          ? producers.split(",").map((p) => p.trim())
          : [];
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
      });
      await newMovie.save();
      res.status(201).json(newMovie);
    }
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Retrieve the current movie data
    const currentMovie = await movieModel.findById(id);
    if (!currentMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Merge new data with existing data
    const updatedData = {
      movieName: req.body.movieName || currentMovie.movieName,
      movieImg: req.body.movieImg || currentMovie.movieImg,
      genres: req.body.genres || currentMovie.genres,
      directors: req.body.directors
        ? typeof req.body.directors === "string"
          ? req.body.directors.split(",").map((d) => d.trim())
          : req.body.directors
        : currentMovie.directors,
      casts: req.body.casts
        ? typeof req.body.casts === "string"
          ? req.body.casts.split(",").map((c) => c.trim())
          : req.body.casts
        : currentMovie.casts,
      description: req.body.description || currentMovie.description,
      producers: req.body.producers
        ? typeof req.body.producers === "string"
          ? req.body.producers.split(",").map((p) => p.trim())
          : req.body.producers
        : currentMovie.producers,
      movieRating: req.body.movieRating || currentMovie.movieRating,
      ageLimit: req.body.ageLimit || currentMovie.ageLimit,
      movieBanner: req.body.movieBanner || currentMovie.movieBanner,
      duration: req.body.duration || currentMovie.duration,
      votes: req.body.votes || currentMovie.votes,
      nation: req.body.nation || currentMovie.nation,
      releaseDate: req.body.releaseDate || currentMovie.releaseDate,
      endDate: req.body.endDate || currentMovie.endDate,
    };

    // Update the movie with the merged data
    const updatedMovie = await movieModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    await movieModel
      .findByIdAndDelete({ _id: id })
      .then((movies) => res.json(movies));
  } catch (err) {
    next(err);
  }
};

const voteMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    movie.votes += req.body.votes;
    await movie.save();
    res.json({ success: true, votes: movie.votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovieRating = async (req, res) => {
  const { movieId, rating } = req.body;

  try {
    const movie = await movieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update movie rating and votes
    const totalVotes = movie.votes + 1;
    const newRating =
      Math.round(
        ((movie.movieRating * movie.votes + rating) / totalVotes) * 10
      ) / 10;

    movie.movieRating = newRating;
    movie.votes = totalVotes;

    // Save updated movie
    await movie.save();

    // Return updated movie with rating and votes
    res.status(200).json({
      message: "Rating updated successfully",
      movie: {
        movieRating: newRating,
        votes: totalVotes,
      },
    });
  } catch (err) {
    console.error("Error updating movie rating:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getMovie,
  getAllMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  voteMovie,
  updateMovieRating,
};
