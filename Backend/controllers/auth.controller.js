const hashPassword = require("../middlewares/hash");
const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/token");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    const hashed = await bcrypt.compare(password, user.hashPass);
    if (!hashed) {
      return res.end("Invalid username or password");
    }
    const userDetails = {
      id: user._id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
    };
    console.log();
    await createToken(user._id, res),
      res.status(200).json({
        userDetails,
        message: "user logged in successfully",
      });
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, username, gender, password } = req.body;
    const duplicate = await Users.findOne({ username: username });
    if (duplicate) {
      res.json({ message: "Duplicate username" });
    }
    await Users.create({
      name: name,
      username: username,
      gender: gender,
      profilePicture:
        gender == "male"
          ? "https://avatar.iran.liara.run/public/2"
          : "https://avatar.iran.liara.run/public/80",
      hashPass: await hashPassword(password),
    });
    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (error) {
    console.log(error, "error");
    res.json({
      message: "Error registering",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(404).json({
      message: "Error logging out",
    });
  }
};
module.exports = {
  login,
  register,
  logout,
};
