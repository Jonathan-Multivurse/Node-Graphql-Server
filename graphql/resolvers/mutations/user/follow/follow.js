const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const follow = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const followee = await User.findOneAndUpdate(
    {
      _id: args._id,
    },
    {
      $addToSet: {
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
        $addToSet: {
          following: followee,
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

module.exports = { follow };
