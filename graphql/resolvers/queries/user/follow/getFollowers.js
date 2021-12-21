const { User } = require("../../../../../database/index");
const { CustomError } = require("../../../../../error/error");
const { verifyUser } = require("../../../../../auth/authentication");

const getFollowers = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const followers = await User.find({
      _id: user.id,
    }).populate("followers", "_id usernameId profilePhoto");
    return followers;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getFollowers };
