const movieBlog = require("../models/movieBlog");

const createBlog = async (req, res, next) => {
  const blog = new movieBlog(req.body);
  try {
    await blog.save();
    res.status(201).send(blog);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await movieBlog.find({});
    res.send(blogs);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const blog = await movieBlog.findById(_id);
    if (!blog) return res.sendStatus(404);
    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "photo"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) return res.status(400).send("Invalid updates!");
  try {
    const blog = await movieBlog.findById(_id);
    updates.forEach((update) => (blog[update] = req.body[update]));
    await blog.save();
    if (!blog) return res.sendStatus(404);
    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const blog = await movieBlog.findByIdAndDelete(_id);
    if (!blog) return res.sendStatus(404);
    return res.send(blog);
  } catch (err) {
    res.status(400).send(err);
    next(err);
  }
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
