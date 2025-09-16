const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  id: String, 
  prompt: String, 
  keywords: [String], 
});
const DrillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: [String], 
  questions: [QuestionSchema], 
});
module.exports = mongoose.model("Drill", DrillSchema);
