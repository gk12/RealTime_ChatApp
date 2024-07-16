const Users = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const pageNo = parseInt(req.query.pageNo);
    const search = req.query.search;
    const usersPerPage = 5;
    let query = { _id: { $ne: userId } };
    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };;
    }

    // optimise way of above code
    const [totalUsers, users] = await Promise.all([
      Users.find(query),
      Users.find(query)
        .select("-hashPass")
        .skip((pageNo - 1) * usersPerPage)
        .limit(usersPerPage),
    ]);
    res.status(200).json({
      users,
      noOfPages: Math.ceil(totalUsers.length / 5),
    });
  } catch (error) {
    res.status(404).json({
      message: "something went wrong",
    });
  }
};

module.exports = getAllUsers;
