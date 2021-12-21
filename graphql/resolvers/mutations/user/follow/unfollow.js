const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const unfollow = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const followee = await User.findOneAndUpdate(
    {
      _id: args._id,
    },
    {
      $pull: {
        followers: user.id,
      },
    }
  );
  try {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $pull: {
          following: followee._id,
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

module.exports = { unfollow };
