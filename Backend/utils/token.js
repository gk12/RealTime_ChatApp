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

module.exports = {
  createToken,
};
