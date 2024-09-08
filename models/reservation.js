const mongoose = require("mongoose")

const { Schema } = mongoose
const seatSchema = new Schema({
  rowLetter: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
})
const reservationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
      trim: true,
    },
    seats: {
      type: [seatSchema],
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    checkin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Reservation = mongoose.model("Reservation", reservationSchema)

module.exports = Reservation
