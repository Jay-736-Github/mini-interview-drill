const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.cookie) {
    
    token = req.headers.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${process.env.SESSION_COOKIE_NAME}=`));

    if (token) {
      token = token.split("=")[1];
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({
        error: { code: "UNAUTHORIZED", message: "Not authorized, no token" },
      });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-providers"); 

    if (!req.user) {
      return res
        .status(401)
        .json({ error: { code: "UNAUTHORIZED", message: "User not found" } });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        error: {
          code: "UNAUTHORIZED",
          message: "Not authorized, token failed",
        },
      });
  }
};
module.exports = { protect };
