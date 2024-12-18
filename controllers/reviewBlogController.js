const reviewBlog = require("../models/reviewBlog");

const createReview = async (req, res, next) => {
  const review = new reviewBlog(req.body);
  try {
    await review.save();
    res.status(201).send(review);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getAllReview = async (req, res, next) => {
  try {
    const reviews = await reviewBlog.find({});
    res.send(reviews);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getReivew = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const review = await reviewBlog.findById(_id);
    if (!review) return res.sendStatus(404);
    return res.send(review);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["review", "title", "descrition", "photo"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });
  try {
    const reiew = await reviewBlog.findById(_id);
    updates.forEach((update) => (reiew[update] = req.body[update]));
    await reiew.save();
    return !reiew ? res.sendStatus(404) : res.send(reiew);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const review = await reviewBlog.findByIdAndDelete(_id);
    if (!review) return res.sendStatus(404);
    return res.send(review);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

module.exports = {
  createReview,
  getAllReview,
  getReivew,
  updateReview,
  deleteReview,
};
