const Showtime = require("../models/showtime")

const createShowtime = async (req, res, next) => {
  const showtime = new Showtime(req.body)
  try {
    await showtime.save()
    res.status(201).send(showtime)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const getAllShowtime = async (req, res, next) => {
  try {
    const showtimes = await Showtime.find({})
    res.send(showtimes)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const getShowtime = async (req, res, next) => {
  const _id = req.params.id
  try {
    const showtime = await Showtime.findById(_id)
    if (!showtime) return res.sendStatus(404)
    return res.send(showtime)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const updateShowtime = async (req, res, next) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    "startAt",
    "startDate",
    "endDate",
    "movieId",
    "cinemaId",
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" })

  try {
    const showtime = await Showtime.findById(_id)
    updates.forEach((update) => (showtime[update] = req.body[update]))
    await showtime.save()
    return !showtime ? res.sendStatus(404) : res.send(showtime)
  } catch (err) {
    return res.status(400).send(err)
  }
}

const deleteShowtime = async (req, res, next) => {
  const _id = req.params.id
  try {
    const showtime = await Showtime.findByIdAndDelete(_id)
    if (!showtime) return res.sendStatus(404)
    return res.send(showtime)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

module.exports = {
  createShowtime,
  getAllShowtime,
  getShowtime,
  updateShowtime,
  deleteShowtime,
}
