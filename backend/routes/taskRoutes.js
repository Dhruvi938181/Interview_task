const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const verifyToken = require("../middleware/authMiddleware");

router.post("/add", verifyToken, async (req, res) => {
  const task = await Task.create({
    userId: req.user.id,
    title: req.body.title,
  });

  res.json(task);
});

router.get("/", verifyToken, async (req, res) => {
  const tasks = await Task.find({
    userId: req.user.id,
  });

  res.json(tasks);
});

router.put("/:id", verifyToken, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(task);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({ msg: "Deleted" });
});

module.exports = router;
