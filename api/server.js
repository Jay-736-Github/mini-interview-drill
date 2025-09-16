const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
require("./config/passport")(passport);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true,}));
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/", require("./routes/auth"));
app.use("/api", require("./routes/users"));
app.use("/api/drills", require("./routes/drills"));
app.use("/api/attempts", require("./routes/attempts"));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// DB Connection
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
