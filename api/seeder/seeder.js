const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config(); 

const Drill = require("../models/Drills.js"); 

mongoose.connect(process.env.MONGO_URI);

const drills = JSON.parse(fs.readFileSync(`${__dirname}/drills.json`, "utf-8"));

const importData = async () => {
  try {
    await Drill.create(drills);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
const deleteData = async () => {
  try {
    await Drill.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
