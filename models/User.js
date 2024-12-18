const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      reqired: [true, "Please enter your email"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    roles: [
      {
        type: String,
        default: "User",
        enum: ["User", "Admin"],
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
