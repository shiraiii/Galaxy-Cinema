const mongoose = require("mongoose");

const { Schema } = mongoose;
const seatSchema = new Schema({
  rowLetter: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
});

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
      validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // "HH:mm" format
        },
        message: (props) => `${props.value} is not a valid start time format!`,
      },
    },
    seats: {
      type: [seatSchema],
      required: true,
      validate: {
        validator: function (v) {
          const uniqueSeats = new Set(
            v.map((seat) => `${seat.rowLetter}-${seat.seatNumber}`)
          );
          return uniqueSeats.size === v.length;
        },
        message: "Duplicate seats are not allowed.",
      },
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
      // validate: {
      //   validator: function (v) {
      //     return /^[0-9]{10,15}$/.test(v); // Adjust regex as needed
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    },
    checkin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate total price
reservationSchema.pre("save", function (next) {
  this.total = this.ticketPrice * this.seats.length;
  next();
});

// Virtual to get seat count
reservationSchema.virtual("seatCount").get(function () {
  return this.seats.length;
});

// Index for performance
reservationSchema.index({ movieId: 1, cinemaId: 1, date: 1 });

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
