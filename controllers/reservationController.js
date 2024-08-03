const Reservation = require("../models/reservation")
const generateQR = require("../utils/generateQRCode")

const createReservation = async (req, res, next) => {
  const reservation = new Reservation(req.body)

  const QRCode = await generateQR()

  try {
    await reservation.save()
    res.status(201).send({ reservation, QRCode })
  } catch (err) {
    next(err)
  }
}

const getAllReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({})
    res.send(reservation)
  } catch (err) {
    next(err)
  }
}

const getReservation = async (req, res, next) => {
  const _id = req.params.id
  try {
    const reservation = await Reservation.findById(_id)
    if (!reservation) return res.sendStatus(404)
    return res.send(reservation)
  } catch (err) {
    res.status(400).send(err)
    next(err)
  }
}

const updateReservation = async (req, res, next) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = [
    "date",
    "startAt",
    "seats",
    "ticketPrice",
    "total",
    "username",
    "phone",
    "checkin",
  ]
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" })

  try {
    const reservation = await Reservation.findById(_id)
    updates.forEach((update) => (reservation[update] = req.body[update]))
  } catch (err) {
    return res.status(400).send(err)
    next(err)
  }
}

const deleteReservation = async (req, res, next) => {
  const _id = req.params.id
  try {
    const reservation = await Reservation.findByIdAndDelete(_id)
    if (!reservation) return res.sendStatus(404)
    return res.send(reservation)
  } catch (err) {
    return res.sendStatus(400)
    next(err)
  }
}

module.exports = {
  createReservation,
  getAllReservation,
  getReservation,
  updateReservation,
  deleteReservation,
}
