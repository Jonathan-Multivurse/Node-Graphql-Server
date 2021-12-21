//DB Model
const { CustomError } = require("../../../../../error/error");
const db = require("../../../../../database/index");

const getAllProducts = async (_, args, context) => {
  const products = await db.Product.find(
    {},
    {},
    { sort: { createdAt: -1 } }
  ).populate("user");

  if (products) {
    return products;
  } else {
    throw new CustomError("Error", "Query Failed", "Something went wrong!");
  }
};

module.exports = { getAllProducts };
