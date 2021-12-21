const { CustomError } = require("../../../../../error/error");
const { Message, Room } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const getRooms = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const rooms = await Room.find(
      {
        user: user.id,
      },
      {},
      { sort: { last_received_timestamp: -1 } }
    )
      .populate("last_message")
      .populate("user")
      .populate("other_user");

    return rooms;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { getRooms };
