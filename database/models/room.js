const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    // name: { type: String, lowercase: true, unique: true },
    // topic: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    other_user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // last_message_timestamp: { type: Date },
    last_message: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
    number_of_unread_messages: { type: Number, min: 0, default: 0 },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
  },
  { timestamps: true }
);

RoomSchema.index(
  {
    user: 1,
    other_user: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("rooms", RoomSchema);

// 6034d64039006a3c8bf1ac71
// 6034d5e539006a3c8bf1ac70
