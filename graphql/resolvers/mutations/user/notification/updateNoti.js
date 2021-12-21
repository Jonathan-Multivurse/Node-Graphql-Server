const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const updateNotification = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          notification: args.pushNoti,
          directMessage: args.directMessage,
          marketing: args.marketing,
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
module.exports = { updateNotification };
