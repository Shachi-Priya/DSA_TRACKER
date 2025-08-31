const express = require("express");
const Problem = require("../models/Problem");
const User = require("../models/User");
const auth = require("../middlewares/auth"); 
const mongoose = require("mongoose");

const router = express.Router();

// GET /api/problems/get-problems
router.get("/get-problems", auth, async (req, res) => {
  const problems = await Problem.find().lean();

  const user = await User.findById(req.user.id).lean();
  const progressList = user?.progress || [];

  // Build a quick lookup map: problemId -> completed
  const progressMap = new Map(
    progressList.map((p) => [String(p.problemId), !!p.completed])
  );

  const withProgress = problems.map((p) => ({
    ...p,
    completed: progressMap.get(String(p._id)) || false,
  }));

  return res.json(withProgress);
});

// POST /api/problems/progress
router.post("/progress", auth, async (req, res) => {
  const { problemId, completed } = req.body;

  if (!problemId || !mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({ msg: "Invalid problemId" });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!Array.isArray(user.progress)) user.progress = [];

  const existing = user.progress.find(
    (p) => String(p.problemId) === String(problemId)
  );

  if (existing) {
    existing.completed = !!completed;
  } else {
    user.progress.push({ problemId, completed: !!completed });
  }

  await user.save();
  return res.json({ success: true });
});

module.exports = router;
