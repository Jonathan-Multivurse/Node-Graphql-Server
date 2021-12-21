const { CustomError } = require("../../../../../error/error");
const { Message, Room } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const sendMessage = async (_, args, context) => {
  console.log(args);
  const user = await verifyUser(context.auth);
  if (user) {
    if (user._id === args.receiverId) {
      return CustomError(
        "Error",
        "Mutation Failed",
        "You can not send a message to yourself!"
      );
    }
    let room = await Room.findOne({
      user: user.id,
      other_user: args.receiverId,
    });

    const otherUserRoom = await Room.findOne({
      user: args.receiverId,
      other_user: user.id,
    });

    if (!room || !otherUserRoom) {
      return CustomError("Error", "Mutation Failed", "Something went wrong!");
    }

    const message = await Message.create({
      text: args.text,
      sender: user.id,
      receiver: args.receiverId,
    });

    room = await Room.findOneAndUpdate(
      {
        _id: room._id,
      },
      {
        last_message: message.id,
        $addToSet: {
          messages: message.id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "messages",
      populate: [{ path: "sender" }, { path: "receiver" }],
    });
    await Room.findOneAndUpdate(
      {
        _id: otherUserRoom._id,
      },
      {
        last_message: message.id,
        $inc: { number_of_unread_messages: 1 },
        $addToSet: {
          messages: message.id,
        },
      }
    );

    return room.messages;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { sendMessage };
