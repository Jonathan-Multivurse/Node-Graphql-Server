const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema(
  {
    followedSellers: [{ type: Schema.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellers", SellerSchema);
