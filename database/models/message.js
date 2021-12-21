const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    // name: { type: String, lowercase: true, unique: true },
    // topic: String,
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    text: String,
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms" }],
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    read: { type: Boolean, default: false },
    // created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", MessageSchema);
