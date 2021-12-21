const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");


const updatePassword = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          password: args.newPass
        },
      },
      { new: true, omitUndefined: true, useFindAndModify: false }
    );
    res.save();
    return true;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};
module.exports = { updatePassword };