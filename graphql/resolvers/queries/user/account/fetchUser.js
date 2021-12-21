const { CustomError } = require("../../../../../error/error");
const { User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const fetchUser = async (_, args, context) => {
  const user = await verifyUser(context.auth);

  if (user) {
    const res = await await User.findOne({ _id: user.id })
      .populate({
        path: "myProducts",
        populate: [{ path: "user" }],
        options: { sort: { createdAt: -1 } },
      })
      .populate("followers")
      .populate("following")
      .populate({
        path: "myCart",
        populate: [{ path: "user" }],
        options: { sort: { createdAt: -1 } },
      })
      .populate("notifications")
      .populate("rooms");
    return res;
  } else if (!user) {
    return new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { fetchUser };
