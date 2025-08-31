const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  youtubeLink: String,
  leetCodeLink: String,
  articleLink: String,
  level: { type: String, enum: ["Easy", "Medium", "Hard"] },
  chapter: String
});

module.exports = mongoose.model("Problem", ProblemSchema);
