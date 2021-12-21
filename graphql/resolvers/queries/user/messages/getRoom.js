const { CustomError } = require("../../../../../error/error");
const { Message, Room } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getRoom = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const room = await Room.findByIdAndUpdate(args._id, {
      number_of_unread_messages: 0,
    })
      .populate({
        path: "messages",
        options: { sort: { createdAt: 1 } },
        populate: [{ path: "sender" }, { path: "receiver" }],
      })
      .populate("last_message")
      .populate("user")
      .populate("other_user");

    if (!room) {
      return new CustomError(
        "Error",
        "Mutation Failed",
        "Something went wrong!"
      );
    }

    return room;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { getRoom };
