const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    usernameId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admins", AdminSchema);
