//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");

const productDetails = async (_, { offset, limit }) => {
  const products = await db.Product.find().populate("user");
  const totalCount = products.length;
  const details =
    limit === undefined
      ? products.slice(offset)
      : products.slice(offset, offset + limit);

  if (products) {
    console.log(details), console.log(totalCount);
    return {
      pagination: {
        totalItem:totalCount,
        offset, limit
      },
      products:details,
    };
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { productDetails };
