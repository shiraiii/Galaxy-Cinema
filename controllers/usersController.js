const userModel = require("../models/User");

const getAllUser = async (req, res, next) => {
  try {
    userModel.find().then((users) => res.json(users));
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    userModel.findById(id).then((users) => res.json(users));
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    await userModel.create(req.body).then((users) => res.json(users));
    res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    userModel
      .findByIdAndUpdate(
        { _id: id },
        {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          roles: req.body.roles,
        }
      )
      .then((users) => res.json(users));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    userModel.findByIdAndDelete({ _id: id }).then((users) => res.json(users));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
