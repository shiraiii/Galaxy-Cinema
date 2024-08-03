const Cinema = require("../models/cinema")

const createCinema = async (req, res, next) => {
  const cinema = new Cinema(req.body)
  try {
    await cinema.save()
    res.status(201).send(cinema)
  } catch (err) {
    next(err)
  }
}

const getAllCinema = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find({})
    res.send(cinemas)
  } catch (err) {
    res.status(400).send(e)
    next(e)
  }
}

const getCinema = async (req, res, next) => {
  const _id = req.params.id
  try {
    const cinema = await Cinema.findById(_id)
    if (!cinema) return res.sendStatus(404)
    return res.send(cinema)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const updateCinema = async (req, res, next) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    "name",
    "ticketPrice",
    "city",
    "seats",
    "seatsAvailable",
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) return res.status(400).send("Invalid updates!")

  try {
    const cinema = await Cinema.findById(_id)
    updates.forEach((update) => (cinema[update] = req.body[update]))
    await cinema.save()
    if (!cinema) return res.sendStatus(404)
    return res.send(cinema)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const deleteCinema = async (req, res, next) => {
  const _id = req.params.id
  try {
    const cinema = await Cinema.findByIdAndDelete(_id)
    if (!cinema) return res.sendStatus(404)
    return res.send(cinema)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

module.exports = {
  getAllCinema,
  getCinema,
  createCinema,
  updateCinema,
  deleteCinema,
}
