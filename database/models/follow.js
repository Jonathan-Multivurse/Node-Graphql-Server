const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserFollow = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { UserFollow };
