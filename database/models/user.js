const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { ProductSchema } = require("./product");
//const { CartSchema } = require("./cart");
const { NotificationsSchema } = require("./notification");

const UserSchema = new Schema(
  {
    usernameId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: false, trim: true },
    profilePhoto: { type: String, required: false, trim: true },
    introduction: { type: String, trim: true, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "users" }],
    myProducts: [{ type: Schema.Types.ObjectId, ref: "products" }],
    myCart: [{ type: Schema.Types.ObjectId, ref: "products" }],
    notifications: [{ type: Schema.Types.ObjectId, ref: "notifications" }],
    rooms: [{ type: Schema.Types.ObjectId, ref: "rooms" }],
    notification: { type: Boolean, default: true },
    directMessage: { type: Boolean, default: true },
    marketing: { type: Boolean, default: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
