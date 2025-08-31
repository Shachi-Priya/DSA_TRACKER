const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  progress: [
    {
      problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
      completed: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
