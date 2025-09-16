const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { protect } = require("../middleware/auth");
const Attempt = require("../models/Attempt");
const Drill = require("../models/Drills");

const attemptSchema = z.object({
  drillId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid Drill ID",
  }),
  answers: z.array(
    z.object({
      qid: z.string(),
      text: z.string(),
    })
  ).min(1),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', issues: e.issues } });
  }
};

router.post("/", protect, async (req, res) => {
  const { drillId, answers } = req.body;

  try {
    const drill = await Drill.findById(drillId);
    if (!drill) {
      return res.status(404).json({ error: { message: "Drill not found" } });
    }

    let totalKeywords = 0;
    let matchedKeywords = 0;

    drill.questions.forEach((question) => {
      totalKeywords += question.keywords.length;
      const userAnswer = answers.find((a) => a.qid === question.id)?.text || "";

      question.keywords.forEach((keyword) => {
        if (userAnswer.toLowerCase().includes(keyword.toLowerCase())) {
          matchedKeywords++;
        }
      });
    });

    const score =
      totalKeywords > 0 ? (matchedKeywords / totalKeywords) * 100 : 0;

    const newAttempt = new Attempt({
      userId: req.user.id,
      drillId,
      answers,
      score: Math.round(score),
    });

    const savedAttempt = await newAttempt.save();
    res.status(201).json(savedAttempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Server Error" } });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) 
      .limit(5); 

    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: { message: "Server Error" } });
  }
});
module.exports = router;
