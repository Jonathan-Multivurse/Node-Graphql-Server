const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recommendations", RecommendationSchema);
