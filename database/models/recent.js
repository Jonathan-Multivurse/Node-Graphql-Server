const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecentSchema = new Schema(
  {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recents", RecentSchema);
