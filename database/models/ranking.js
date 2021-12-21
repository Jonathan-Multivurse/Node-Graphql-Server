const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankingSchema = new Schema(
  {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("rankings", RankingSchema);
