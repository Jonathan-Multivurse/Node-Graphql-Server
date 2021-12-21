const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const deleteUser = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const res = await User.findByIdAndRemove({
      _id: user.id,
    });
    res;
    return true
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { deleteUser };
