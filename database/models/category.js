const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, trim: true },
    image: { type: String, trim: true },
    base_category: { type: Schema.ObjectId, ref: "categories" },
    sub_categories: [{ type: Schema.ObjectId, ref: "categories" }],
    products: [{ type: Schema.ObjectId, ref: "products" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("categories", CategorySchema);
