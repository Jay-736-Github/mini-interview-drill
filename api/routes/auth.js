const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const payload = { id: req.user.id, name: req.user.name };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d", 
    });
  
    res.cookie(process.env.SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000, 
    });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);

  }
);

router.get("/auth/logout", (req, res) => {
  res.clearCookie(process.env.SESSION_COOKIE_NAME);
  res.redirect(process.env.FRONTEND_URL);
});

module.exports = router;
