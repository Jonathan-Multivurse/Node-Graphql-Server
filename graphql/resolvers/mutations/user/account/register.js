const { CustomError } = require("../../../../../error/error");
const { User, Notification } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const registerUser = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const notify = await Notification.create({
      user: user.id,
      message: "Welcome to Deepy!",
    });
    const duplicate = await User.findOne({
      usernameId: args.usernameId,
    });

    if (duplicate) {
      new CustomError("Error", "Mutation Failed", "duplicate ID");
      return false;
    }

    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          usernameId: args.usernameId,
          password: args.password,
          notifications: notify,
        },
      }
    );
    res.save();
    return true;
  } else {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { registerUser };
