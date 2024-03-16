const Users = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await Users.find({ _id: { $ne: userId } }).select(
      "-hashPass"
    );
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(404).json({
      message: "something went wrong",
    });
  }
};

module.exports = getAllUsers;
