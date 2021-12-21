const { CustomError } = require("../../../../../error/error");
const { Message, Room, User } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const createRoom = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  if (user) {
    const roomData = {
      user: user.id,
      other_user: args.otherUserId,
    };
    let room = await Room.findOne(roomData)
      .populate("user")
      .populate("other_user");

    if (!room) {
      room = await (await Room.create(roomData))
        .populate("user")
        .populate("other_user")
        .execPopulate();
      // room = await room.populate("user").populate("other_user").execPopulate();

      await User.findOneAndUpdate(
        {
          _id: user.id,
        },
        {
          $addToSet: {
            rooms: room,
          },
        }
      );
    }

    const otherRoomData = {
      user: args.otherUserId,
      other_user: user.id,
    };

    let otherRoom = await Room.findOne(otherRoomData);

    if (!otherRoom) {
      otherRoom = await Room.create(otherRoomData);
      await User.findOneAndUpdate(
        {
          _id: args.otherUserId,
        },
        {
          $addToSet: {
            rooms: otherRoom,
          },
        }
      );
    }

    return room;
  } else if (!user) {
    return new CustomError("Error", "Mutation Failed", "Something went wrong!");
  }
};

module.exports = { createRoom };
