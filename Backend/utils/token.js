const jwt = require("jsonwebtoken");

// payload,secretKey and callback
async function createToken(userId, res) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // we can set token in cookie here also
  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true, //prevent from cross site script attack
    sameSite: "strict", // prevent from cross site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });
  // return token;
}

async function verifyToken() {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.json({
        message: err,
      });
    }
    next();
  });
}

module.exports = {
  createToken,
  verifyToken,
};
