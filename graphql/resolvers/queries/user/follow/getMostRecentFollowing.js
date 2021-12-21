const { User } = require("../../../../../database/index");
const { CustomError } = require("../../../../../error/error");
const { verifyUser } = require("../../../../../auth/authentication");

const getMostRecentFollowing = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const userRecord = await User.findById(user.id).populate({
      path: "following",
      options: { limit: 10, sort: { createdAt: -1 } },
    });

    return userRecord.following;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getMostRecentFollowing };
