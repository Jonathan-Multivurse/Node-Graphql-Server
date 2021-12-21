const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const fetchUserById = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const userRecord = await User.findById(args._id)
      .populate({
        path: "myProducts",
        populate: [{ path: "user" }],
        options: { sort: { createdAt: -1 } },
      })
      .populate("followers")
      .populate("following");

    if (!userRecord) {
      return new CustomError("Error", "Query Failed", "Something went wrong!");
    } else {
      return userRecord;
    }
  } else if (!user) {
    console.log("auth");
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { fetchUserById };
