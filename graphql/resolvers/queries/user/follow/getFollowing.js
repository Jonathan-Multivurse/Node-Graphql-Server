const { User } = require("../../../../../database/index");
const { CustomError } = require("../../../../../error/error");
const { verifyUser } = require("../../../../../auth/authentication");

const getFollowing = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const following = await User.find({
      _id: user.id,
    }).populate("following", "_id usernameId profilePhoto");

    return following;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getFollowing };
