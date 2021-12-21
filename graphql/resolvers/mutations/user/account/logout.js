const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const logoutUser = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $unset: {
          accessToken: "",
          refreshToken: "",
        },
      }
    );
    res.save();
    return true;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { logoutUser };
