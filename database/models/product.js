const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./user");

const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      trim: true,
    },
    brand: {
      type: String,

      trim: true,
    },
    category: {
      type: String,

      trim: true,
    },
    category_reference: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    condition: {
      type: String,

      trim: true,
    },
    size: {
      type: String,

      trim: true,
    },
    style: {
      type: String,

      trim: true,
    },
    description: {
      type: String,

      trim: true,
    },
    soldOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
ProductSchema.pre(
  "deleteOne",
  { document: true, query: true },
  async function (next) {
    console.log(this._id);
    await UserSchema.updateMany(
      {},
      {
        $pull: {
          myProducts: this._id,
        },
      }
    );
    await UserSchema.updateMany(
      {},
      {
        $pull: {
          myCart: this._id,
        },
      }
    );
    next();
  }
);

module.exports = mongoose.model("products", ProductSchema);
