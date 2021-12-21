const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PopularSchema = new Schema(
  {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("populars", PopularSchema);
