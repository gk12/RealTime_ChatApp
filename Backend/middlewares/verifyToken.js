const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");
async function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return res.status(401).json({ message: "unauthorized access" });
  }
  const user = await Users.findById(decode.userId).select("-hashPass");
  if (!user) {
    return res.status(401).json({ message: "user not found" });
  }
  req.user = user;
  next();
}

module.exports = verifyToken;
