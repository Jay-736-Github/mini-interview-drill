const mongoose = require("mongoose");
const AttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    drillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drill", 
      required: true,
    },
    answers: [
      {
        qid: String, 
        text: String, 
      },
    ],
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);
module.exports = mongoose.model("Attempt", AttemptSchema);
