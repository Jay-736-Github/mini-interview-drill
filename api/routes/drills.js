const express = require("express");
const router = express.Router();
const redisClient = require("../config/redis");
const Drill = require("../models/Drills");

router.get("/", async (req, res) => {
  const cacheKey = "allDrills";

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Serving from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }
    console.log("Serving from database");
    const drills = await Drill.find({}, { title: 1, difficulty: 1, tags: 1 });

    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(drills)
    );

    res.status(200).json(drills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Server Error" } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) {
      return res.status(404).json({ error: { message: "Drill not found" } });
    }
    res.json(drill);
  } catch (err) {
    res.status(500).json({ error: { message: "Server Error" } });
  }
});

module.exports = router;
