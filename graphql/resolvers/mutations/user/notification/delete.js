const { CustomError } = require("../../../../../error/error");
const { User, Notification } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const removeNoti = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const notifcn = await Notification.findOne({
    _id: args._id,
  });
  try {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $pull: {
          notifications: notifcn._id,
        },
      }
    );
    res.save();
    return true;
  } catch (error) {
    console.log(`Error : ${error}`);
    return false;
  }
};

module.exports = { removeNoti };
