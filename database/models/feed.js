const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedSchema = new Schema(
  {
    followedSellers: [{ type: Schema.ObjectId, ref: "sellers" }],
    products: [{ type: Schema.ObjectId, ref: "products" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("feeds", FeedSchema);
